import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {getCurrentUser} from "@/lib/actions/auth";

export async function  middleware(req: NextRequest) {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);

  const url = req.nextUrl.clone();
  const { pathname, search } = url;

  if (pathname === "/sys_login" && isAuthenticated) {
    url.pathname = "/sys_dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/sys_dashboard") && !isAuthenticated) {
    url.pathname = "/sys_login";
    url.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sys_login", "/sys_dashboard/:path*"],
};
