import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname; // Fixed: Use nextUrl, not nextrole

    // 1. Prevent Donors from seeing NGO pages
    if (path.startsWith("/organisation") && token?.role !== "ngo") {
      return NextResponse.redirect(new URL("/donor", req.url));
    }

    // 2. Prevent NGOs from seeing Donor pages
    if (path.startsWith("/donor") && token?.role !== "donor") {
      return NextResponse.redirect(new URL("/organisation", req.url));
    }
  },
  {
    callbacks: {
      // The middleware only runs if authorized returns true
      authorized: ({ token }) => !!token,
    },
  }
);

// CRITICAL: This config determines where the middleware runs
export const config = { 
  matcher: [
    /*
     * Match only the dashboard routes. 
     * Do NOT match /log-in, /register, or /api routes.
     */
    "/donor/:path*", 
    "/organisation/:path*"
  ] 
};