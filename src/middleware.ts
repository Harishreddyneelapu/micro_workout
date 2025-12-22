import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next.js internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ✅ If user is logged in, block auth pages
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Allow public routes if NOT logged in
  if (!token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 🔒 Protect ALL other routes
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",                 // home
    "/dashboard/:path*", // dashboard
    "/spin/:path*",      // roulette
    "/workouts/:path*",  // workouts list + details
    "/preferences/:path*",
    "/summary/:path*",
    "/login",
    "/signup",
  ],
};
