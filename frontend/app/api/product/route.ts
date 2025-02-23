import { NextResponse } from "next/server";
import { decodeToken, getAccessToken, getRefreshToken } from "@/app/actions/serverActions";

export async function GET() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

  let authResponse = null;
  let accessToken = await getAccessToken();

  if (!accessToken) {

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      authResponse = NextResponse.json({ success: false, redirectTo: "/login", error: "Invalid refresh token"})
    } else {
      const response: any = await fetch(`${apiBaseUrl}/api/auth/refresh-token/`, {
        method: "POST",
        headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
        body: JSON.stringify({ "refresh_token": refreshToken }),
      });

      if (response.ok) {
        const responseData = await response.json();
    
        const newAccessToken = responseData.accessToken
  
        const payload = await decodeToken(newAccessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const maxAge = payload.exp - currentTime - 30;
  
        const nextResponse = NextResponse.next();
  
        nextResponse.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          // sameSite: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "none" : "lax", 
          // domain: undefined,
          maxAge: maxAge > 0 ? maxAge : 0,
        });
  
        accessToken = newAccessToken;

        return nextResponse;
      } else {
        const errorData = await response.json();
        authResponse = NextResponse.json({ success: false, redirectTo: "/login", error: errorData.error})
      }
    }
  }

  if (authResponse !== null) {
    return authResponse
  }


  try {

    const response = await fetch(`${apiBaseUrl}/api/product/medicine/`, {
      method: "GET",
      headers: { 
        'Accept': 'Application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ success: true, data: responseData });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ success: false, redirectTo: "/login", error: errorData.error || "Failed to fetch products" });
    }
    
    
  } catch (error) {
    return NextResponse.json({ success: false, redirectTo: "/login", error: error });
  }
}
