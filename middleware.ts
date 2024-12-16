import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes } from "@/routes";

export async function middleware(req: any) {
  const { pathname, searchParams, origin } = req.nextUrl;

  // Retrieve the JWT token from the request
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  // Check if the path is exactly "/"
  if (pathname === "/" && !searchParams.toString()) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
    }
    return NextResponse.redirect(new URL("/Auth", origin));
  }

  // Allow API authentication routes without restrictions
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    if (!pathname.startsWith("/Auth")) {
      return NextResponse.redirect(new URL("/Auth", origin));
    }
    return NextResponse.next();
  }

  // Allow authenticated users to access all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/((?!.*\\..*|_next).*)", 
    "/(api|trpc)(.*)", 
  ],
};
