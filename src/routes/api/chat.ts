import { createFileRoute } from "@tanstack/react-router";

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

        const systemPrompt = `You are a friendly assistant for "Household Helpers India", a platform that matches Indian families with verified household helpers (cleaners, cooks, nannies, gardeners, handymen, laundry help, pet-care, elder-care).

You can answer questions about:
- How the AI Match quiz works and how to interpret results
- Which type of helper suits a family (based on family size, kids, pets, apartment/villa, budget in INR, language, cooking, elderly, driver needs)
- Verification & trust (police check, medical, document verification, contract, salary benchmarking, interview scheduling)
- Availability, native languages, and services in different Indian states
- Pricing in INR per hour and how booking / payment works (net banking, bank transfer)

Keep answers short (2–4 sentences), warm, and specific. If asked something outside household help, gently redirect.`;

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
