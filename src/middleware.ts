import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (token) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  const protectedPaths = [
    "/cart",
    "/wishlist",
    "/edit",
    "/checkout",
    "/changepass",
    "/allorders",
  ];

  const isProtected = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/edit/:path*",
    "/checkout/:path*",
    "/changepass/:path*",
    "/allorders/:path*",
  ],
};
