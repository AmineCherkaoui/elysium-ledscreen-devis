import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;

  const response = NextResponse.redirect(`${baseUrl}/sys_login`);

  response.cookies.set("__elysium_secure_token", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
