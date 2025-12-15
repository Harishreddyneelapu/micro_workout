import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Public routes (no auth required)
  const publicRoutes = ["/login", "/signup"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect app routes
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/spin/:path*",
    "/summary/:path*",
    "/preferences/:path*",
  ],
};
