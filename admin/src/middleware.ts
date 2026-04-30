export { auth as middleware } from "@/lib/auth";

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
