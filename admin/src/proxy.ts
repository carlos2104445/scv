import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Role-based route access control
const ROLE_PERMISSIONS: Record<string, string[]> = {
  // SUPER_ADMIN & ADMIN: full access (no restrictions needed)
  EDITOR: ["/", "/content", "/media", "/site"],
  AUTHOR: ["/", "/content/news", "/content/events", "/media"],
  FUNDRAISER: ["/", "/donations", "/inbox/contacts", "/inbox/subscribers"],
  HR: ["/", "/content/people", "/content/jobs", "/inbox/volunteers", "/inbox/job-applications"],
  VIEWER: ["/"],
};

// Routes restricted to SUPER_ADMIN and ADMIN only
const ADMIN_ONLY_ROUTES = ["/users"];

function hasAccess(role: string, pathname: string): boolean {
  if (role === "SUPER_ADMIN" || role === "ADMIN") return true;
  if (ADMIN_ONLY_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) return false;
  const allowed = ROLE_PERMISSIONS[role];
  if (!allowed) return false;
  return allowed.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
}

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET! });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access check
  const role = token.role as string | undefined;
  if (role && !hasAccess(role, request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/?access_denied=1", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|api/auth|api/v1|api/uploads|_next|favicon.ico|images).*)",
  ],
};
