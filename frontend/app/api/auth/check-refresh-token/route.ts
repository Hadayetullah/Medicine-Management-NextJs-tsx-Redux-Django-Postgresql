import { NextResponse } from "next/server";
import { decodeToken, getAccessToken, getRefreshToken } from "@/app/actions/serverActions";


export async function POST(request: Request) {
    // const { refreshToken } = await request.json();
    const accessToken = await getAccessToken();
    if (accessToken != null) {
      return NextResponse.json({ success: true })
    }

    const refreshToken = await getRefreshToken();
    if (refreshToken === null) {
      return NextResponse.json({ success: false, error: "Invalid refresh token"})
    }

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

  try {

    const response = await fetch(`${apiBaseUrl}/api/auth/refresh-token/`, {
      method: "POST",
      headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
      body: JSON.stringify({ "refresh_token": refreshToken }),
    });

    if (response.ok) {
      const responseData = await response.json();

      //   const { message, data } = responseData; 
      const newAccessToken = responseData.accessToken

      const payload = await decodeToken(newAccessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const maxAge = payload.exp - currentTime;

      const nextResponse = NextResponse.json({ success: true });

      nextResponse.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
        path: "/",
        domain: undefined,
        maxAge: maxAge > 0 ? maxAge : 0,
      });

      return nextResponse;
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
