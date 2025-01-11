import { NextResponse } from "next/server";
import { getRefreshToken } from "@/app/actions/serverActions";


function decodeToken(token:any) {
  if (!token) {
    return null
  }
  const [, payloadBase64] = token.split(".");
  const decodedBuffer = Buffer.from(payloadBase64, "base64");
  const decodedString = decodedBuffer.toString("utf-8");
  const payload = JSON.parse(decodedString);
  return payload
}

export async function POST(request: Request) {
    // const { refreshToken } = await request.json();
    const refreshToken = await getRefreshToken();

  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

  try {

    const response = await fetch(`${apiBaseUrl}/api/auth/refresh-token/`, {
      method: "POST",
      headers: { 'Accept': 'Application/json', "Content-Type": "application/json" },
      body: JSON.stringify({ "refresh_token": refreshToken }),
    });

    if (response.ok) {
      const responseData = await response.json();

      //   const { message, data } = responseData; 
      const newAccessToken = responseData.accessToken

      const payload = decodeToken(newAccessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const maxAge = payload.exp - currentTime;

      const nextResponse = NextResponse.json({ success: true, data: responseData });

      nextResponse.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        maxAge: maxAge > 0 ? maxAge : 0,
      });

      return nextResponse;
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
