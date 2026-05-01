import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /login
     * - /api/auth (NextAuth routes)
     * - /api/v1 (public REST API)
     * - /api/uploads (Uploaded assets)
     * - /_next (Next.js internals)
     * - /favicon.ico, /images, etc
     */
    "/((?!login|api/auth|api/v1|api/uploads|_next|favicon.ico|images).*)",
  ],
};
