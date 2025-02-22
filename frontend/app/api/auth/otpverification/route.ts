import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

  try {
    const { email, otp } = await request.json();

    const response = await fetch(`${apiBaseUrl}/api/auth/verify-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
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
      const { msg } = responseData;
    
      const redirectResponse = NextResponse.json({ success: true, message: msg, redirectTo: "/" });
      redirectResponse.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
        domain: undefined,
        // maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY || 3600),
      });
      redirectResponse.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
        domain: undefined,
        // maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY || 604800),
      });
    
      return redirectResponse;
    }
    
  } catch (error) {
    // const redirectUrl = new URL("/login", request.url);
    // redirectUrl.searchParams.set("error", "Internal server error");
    // return NextResponse.redirect(redirectUrl);

    return NextResponse.json({ success: false, error: error });
  }
}
