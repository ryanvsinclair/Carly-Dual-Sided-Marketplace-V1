import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, dealerProfile, response } = await updateSession(request);
  const path = request.nextUrl.pathname;

  // Dealer routes: authentication pages (/login, /signup) and protected dealer surface (/dashboard/*)
  // This grouping will expand as dealer features grow (e.g., /listings, /settings)
  const isDealerRoute = path === "/login" || path === "/signup" || path.startsWith("/dashboard");

  // Protect dealer routes: require authentication AND valid dealer profile
  if (isDealerRoute && path !== "/login" && path !== "/signup") {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Enforce role === 'dealer' and status === 'active'
    // Status check enables future admin approval/suspension workflows
    if (!dealerProfile || dealerProfile.role !== "dealer" || dealerProfile.status !== "active") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect logged-in dealers away from login/signup
  if ((path === "/login" || path === "/signup") && user && dealerProfile?.role === "dealer" && dealerProfile?.status === "active") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
