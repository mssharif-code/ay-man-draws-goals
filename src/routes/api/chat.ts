import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMessage[] };
        try {
          body = (await request.json()) as { messages?: ChatMessage[] };
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages : null;
        if (!messages) return new Response("messages required", { status: 400 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        // Fetch latest bookings to give the AI real data context
        let bookingContext = "";
        try {
          const supabaseUrl = process.env.SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data } = await supabase
              .from("bookings")
              .select(
                "customer_name, helper_name, helper_role, service, hours, total, created_at",
              )
              .order("created_at", { ascending: false })
              .limit(10);
            if (data && data.length > 0) {
              bookingContext =
                "\n\nHere are the most recent bookings (newest first):\n" +
                data
                  .map(
                    (b, i) =>
                      `${i + 1}. ${b.helper_name} (${b.helper_role}) — booked by ${b.customer_name} for "${b.service}", ${b.hours}h, ₹${b.total}, on ${new Date(b.created_at).toLocaleString("en-IN")}`,
                  )
                  .join("\n");
            }
          }
        } catch {
          // If DB fetch fails, proceed without context
        }

        const systemPrompt = `You are a friendly assistant for "Household Helpers India", a platform that matches Indian families with verified household helpers (cleaners, cooks, nannies, gardeners, handymen, laundry help, pet-care, elder-care).

You can answer questions about:
- How the AI Match quiz works and how to interpret results
- Which type of helper suits a family (based on family size, kids, pets, apartment/villa, budget in INR, language, cooking, elderly, driver needs)
- Verification & trust (police check, medical, document verification, contract, salary benchmarking, interview scheduling)
- Availability, native languages, and services in different Indian states
- Pricing in INR per hour and how booking / payment works (net banking, bank transfer)
- Which helper was used last, based on the booking data provided

Keep answers short (2-4 sentences), warm, and specific. If asked something outside household help, gently redirect.${bookingContext}`;

        try {
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: systemPrompt }, ...messages],
            }),
          });

          if (res.status === 429) {
            return Response.json(
              { error: "Too many requests. Please try again in a moment." },
              { status: 429 },
            );
          }
          if (res.status === 402) {
            return Response.json(
              { error: "AI credits exhausted. Please add credits to continue." },
              { status: 402 },
            );
          }
          if (!res.ok) {
            const txt = await res.text();
            return new Response(txt || "AI gateway error", { status: res.status });
          }

          const data = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const reply = data.choices?.[0]?.message?.content?.trim() ?? "";
          return Response.json({ reply });
        } catch (err) {
          return new Response(
            `AI request failed: ${err instanceof Error ? err.message : "unknown"}`,
            { status: 500 },
          );
        }
      },
    },
  },
});
