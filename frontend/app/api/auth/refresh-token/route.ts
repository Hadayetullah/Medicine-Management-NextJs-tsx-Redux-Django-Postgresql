import { NextResponse } from "next/server";
import { getRefreshToken } from "@/app/actions/serverActions";

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
      return NextResponse.json({ success: true, data: responseData });
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
