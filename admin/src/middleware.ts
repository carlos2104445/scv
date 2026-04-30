import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  // Check for auth session cookie
  const authCookie = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token");

  if (!authCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /login
     * - /api/auth (NextAuth routes)
     * - /api/v1 (public REST API)
     * - /_next (Next.js internals)
     * - /favicon.ico, /images, etc
     */
    "/((?!login|api/auth|api/v1|_next|favicon.ico|images).*)",
  ],
};
