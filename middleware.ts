import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
} from "@/routes";

export async function middleware(req: any) {
  const { pathname, origin } = req.nextUrl;

  // Retrieve the JWT token from the request
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  
  // Redirect users from "/" to "/accueil" if they are logged in
 
  // Allow API authentication routes without restrictions
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // If the user is already logged in and tries to access the login route, redirect to the acceuil
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
    }
    return NextResponse.next();
  }

  // If the user is not logged in, redirect to /Auth (but avoid redirecting /Auth itself)
  if (!isLoggedIn) {
    if (pathname !== "/Auth") {
      return NextResponse.redirect(new URL("/Auth", origin));
    }
    return NextResponse.next();
  }

  // Allow authenticated users to access all other routes
  return NextResponse.next();
}

// Apply middleware only to certain paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
