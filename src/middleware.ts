import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT, getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret })) as unknown as JWT | null;

  // console.log({ token });

  const PATH_NAME = req.nextUrl.pathname;

  // Redirects user to login page if token does not exist
  if (!token && PATH_NAME.startsWith("/(protected)")) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Hides authentication pages if token does not exist
  if (token && PATH_NAME.startsWith("/auth")) {
    const redirectURL = shouldRedirectToDashboard(token)
      ? "/account/profile-settings"
      : "/auth/sign-in";

    return NextResponse.redirect(new URL(redirectURL, req.url));
  }

  // Redirects to Account setup
  if (
    token &&
    !shouldRedirectToDashboard(token) &&
    PATH_NAME !== "/auth/sign-in"
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // Redirects to Dashboard
  if (
    token &&
    shouldRedirectToDashboard(token) &&
    PATH_NAME === "/auth/sign-in"
  ) {
    return NextResponse.redirect(new URL("/account/profile-settings", req.url));
  }

  return NextResponse.next();
}

function shouldRedirectToDashboard(token: JWT) {
  return token?.jwt;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/auth/:path*", // Auth routes
    "/account/:path*", // Account routes
    "/(protected)/:path*", // Protected routes
  ],
};
