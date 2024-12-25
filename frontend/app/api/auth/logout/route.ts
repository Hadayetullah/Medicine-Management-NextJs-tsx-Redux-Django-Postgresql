import { NextResponse } from "next/server";
import { getTokens, resetAuthCookies } from "@/app/actions/serverActions";

export async function POST() {
    const {accessToken} = await getTokens();

    if (!accessToken) {
        await resetAuthCookies();
        return NextResponse.json({ success: false, redirectTo: "/login", error: "Invalid token" });
    }
  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

  try {

    const response = await fetch(`${apiBaseUrl}/api/product/medicine/`, {
      method: "POST",
      headers: { 
        'Accept': 'Application/json',
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
      const responseData = await response.json();
    //   const { message, data } = responseData;
      await resetAuthCookies();
      return NextResponse.json({ success: true, redirectTo: "/login", data: responseData });
    }
    
  } catch (error) {
    await resetAuthCookies();
    return NextResponse.json({ success: false, redirectTo: "/login", error: error });
  }
}
