import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

  try {
    const { email, password } = await request.json();

    const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();

      const accessCookie = serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        // maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY || 3600),
        // maxAge: 60 * 60, // 1 hour
      });

      const refreshCookie = serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        // maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY || 604800),
        // maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      const redirectResponse = NextResponse.redirect(new URL("/", request.url));
      redirectResponse.headers.set("Set-Cookie", accessCookie);
      redirectResponse.headers.append("Set-Cookie", refreshCookie);
      return redirectResponse;

    } else {
      const errorData = await response.json();
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("error", errorData.message || "Login failed");
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("error", "Internal server error");
    return NextResponse.redirect(redirectUrl);
  }
}
