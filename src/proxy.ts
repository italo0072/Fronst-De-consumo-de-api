import { NextRequest, NextResponse } from "next/server";
export function proxy(req: NextRequest) {
  if (!req.cookies.get("token")?.value) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}
export const config = { matcher: ["/checkout/:path*", "/orders/:path*"] };
