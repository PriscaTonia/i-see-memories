// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import Cookies from "js-cookie";

// Middleware to check if the user is authenticated
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Check if token is present
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed if token is valid
}

// Specify paths to apply this middleware
export const config = {
  matcher: ["/account/*", "/profile-settings/*", "/order-history/*"], // Adjust paths as needed
};
