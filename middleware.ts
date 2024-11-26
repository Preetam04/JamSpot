import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_URL,
  });
  const isAuthenticated = token ? true : false;
  const pathSegments = req.nextUrl.pathname.split("/");

  if (
    (!isAuthenticated && pathSegments[1] === "u") ||
    pathSegments[1] === "space" ||
    pathSegments[1] === "dashboard"
  ) {
    const loginPath = "/auth";
    const loginURL = new URL(loginPath, req.nextUrl.origin);

    return NextResponse.redirect(loginURL.toString());
  }

  if (isAuthenticated && pathSegments[1] === "auth") {
    const newURL = new URL("/u", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString());
  }

  return NextResponse.next();
}
