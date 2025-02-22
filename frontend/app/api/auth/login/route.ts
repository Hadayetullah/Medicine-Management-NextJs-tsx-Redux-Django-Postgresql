import { decodeToken } from "@/app/actions/serverActions";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

  try {
    const { email, password } = await request.json();

    const response = await fetch(`${apiBaseUrl}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    // if (response.ok) {
    //   const responseData = await response.json();
    //   const { accessToken, refreshToken } = responseData.token;
    //   console.log("Access: ", accessToken)
    //   console.log("Refresh: ", refreshToken)
    //   const { msg } = responseData.data.msg;

    //   const accessCookie = serialize("accessToken", accessToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     path: "/",
    //     // maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY || 3600),
    //     // maxAge: 60 * 60, // 1 hour
    //   });

    //   const refreshCookie = serialize("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     path: "/",
    //     // maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY || 604800),
    //     // maxAge: 60 * 60 * 24 * 7, // 7 days
    //   });

    //   const redirectResponse = NextResponse.redirect(new URL("/", request.url));
    //   redirectResponse.headers.append("Set-Cookie", accessCookie);
    //   redirectResponse.headers.append("Set-Cookie", refreshCookie);
    //   return redirectResponse;

    // } else {
    //   const errorData = await response.json();
    //   const redirectUrl = new URL("/login", request.url);
    //   redirectUrl.searchParams.set("error", errorData.message || "Login failed");
    //   return NextResponse.redirect(redirectUrl);
    // }

    if (response.ok) {
      const responseData = await response.json();
      const { accessToken, refreshToken } = responseData.token;

      const decodedAccessToken = await decodeToken(accessToken);
      const decodedRefreshToken = await decodeToken(refreshToken);

      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      const accessTokenExpiry = decodedAccessToken.exp - currentTime - 30;
      const refreshTokenExpiry = decodedRefreshToken.exp - currentTime - 30;
    
      const redirectResponse = NextResponse.json({ success: true, redirectTo: "/" });
      redirectResponse.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
        sameSite: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "none" : "lax", 
        domain: undefined,
        maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0, // Ensure expiry is non-negative
      });
      redirectResponse.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
        sameSite: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "none" : "lax", 
        domain: undefined,
        maxAge: refreshTokenExpiry > 0 ? refreshTokenExpiry : 0,
      });
    
      return redirectResponse;
    }
    
  } catch (error) {
    // const redirectUrl = new URL("/login", request.url);
    // redirectUrl.searchParams.set("error", "Internal server error");
    // return NextResponse.redirect(redirectUrl);

    const redirectResponse = NextResponse.json({ success: false, redirectTo: "/login", error: error });
    return redirectResponse;
  }
}
