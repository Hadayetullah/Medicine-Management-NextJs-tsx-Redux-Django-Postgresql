import { NextResponse } from "next/server";
import { getTokens } from "@/app/actions/serverActions";

export async function GET() {
    const {accessToken} = await getTokens();

    if (!accessToken) {
        return NextResponse.json({ success: false, redirectTo: "/login", error: "Invalid token" });
    }
  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

  try {

    const response = await fetch(`${apiBaseUrl}/api/product/medicine/`, {
      method: "GET",
      headers: { 
        'Accept': 'Application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
      const responseData = await response.json();
    //   const { message, data } = responseData;
      return NextResponse.json({ success: true, data: responseData });
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, redirectTo: "/login", error: error });
  }
}
