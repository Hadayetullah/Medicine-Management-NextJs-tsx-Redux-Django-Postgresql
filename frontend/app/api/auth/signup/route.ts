import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

  try {
    const body = await request.json();

    const response = await fetch(`${apiBaseUrl}/api/auth/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    
    if (response.ok) {
      const responseData = await response.json();
      const { accessToken, refreshToken } = responseData.token;
    
      const redirectResponse = NextResponse.json({ success: true, redirectTo: "/" });
      redirectResponse.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        // maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY || 3600),
      });
      redirectResponse.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        // maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY || 604800),
      });
    
      return redirectResponse;
    }
    
  } catch (error) {
    const redirectResponse = NextResponse.json({ success: false, redirectTo: "/login", error: error });
    return redirectResponse;
  }
}
