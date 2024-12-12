import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req: Request) {
  console.log("Middleware triggered");

  const cookieHeader = req.headers.get("cookie") || "";
  console.log("Cookie header:", cookieHeader);

  const cookies = parse(cookieHeader);
  console.log("Parsed cookies:", cookies);

  const accessToken = cookies.accessToken;

  if (!accessToken) {
    console.log("Access token is missing, redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Access token found, allowing request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/protected/:path*"], // Adjust as needed
};
