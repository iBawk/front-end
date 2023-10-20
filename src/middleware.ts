import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./services/auth/auth";
import Api from "./services/api/api";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value ?? "";
  const type = request.cookies.get("token_type")?.value ?? "";

  if (!type || !token || isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await Api.private.getUserMe({ token, type });
  } catch (e) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/painel/:path*",
};
