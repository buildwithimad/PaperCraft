import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect "/" -> "/en"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/en/:path*",
    "/ur/:path*",
  ],
};