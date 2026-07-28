import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { RoleProvider, useRole } from "../lib/role-context";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Helpers — Trusted Household Help, On Demand" },
      { name: "description", content: "Helpers connects you with verified household professionals: cleaners, cooks, nannies, gardeners and more. See responsibilities, skills, hourly rates, and hiring tips." },
      { property: "og:title", content: "Helpers — Trusted Household Help, On Demand" },
      { property: "og:description", content: "Find verified household helpers near you. Responsibilities, skills, hourly rates, and trusted hiring tips in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <div className="flex items-center gap-1 rounded-full border border-charcoal/10 bg-cream p-1">
      <button
        onClick={() => setRole("customer")}
        className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${
          role === "customer"
            ? "bg-sage text-white"
            : "text-charcoal/60 hover:text-charcoal"
        }`}
      >
        Customer
      </button>
      <button
        onClick={() => setRole("admin")}
        className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${
          role === "admin"
            ? "bg-sage text-white"
            : "text-charcoal/60 hover:text-charcoal"
        }`}
      >
        Super Admin
      </button>
    </div>
  );
}

function GlobalHeader() {
  const { role } = useRole();
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-charcoal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HELPERS
        </Link>
        <div className="flex items-center gap-3">
          {role === "admin" && (
            <Link
              to="/admin"
              className="hidden rounded-md bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-primary md:inline-block"
            >
              Dashboard
            </Link>
          )}
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <GlobalHeader />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </RoleProvider>
    </QueryClientProvider>
  );
}
