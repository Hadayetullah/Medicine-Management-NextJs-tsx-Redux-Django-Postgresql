import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { parse } from "cookie";

import { resetAuthCookies } from "@/app/actions/serverActions";

export async function POST() {
    const cookieHeader = headers().get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.refreshToken;

    if (!token) {
        await resetAuthCookies();
        return NextResponse.json({ success: false, redirectTo: "/login", error: "Invalid token" });
    }
  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

  try {

    const response = await fetch(`${apiBaseUrl}/api/auth/logout/`, {
      method: "POST",
      headers: { 
        'Accept': 'Application/json',
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ "refresh_token": token })
    });

    if (response.ok) {
      // console.log("Logout response data : ", response)
      // const responseData = await response.json();
    //   const { message, data } = responseData;
      await resetAuthCookies();
      return NextResponse.json({ success: true, redirectTo: "/login", data: "Logout successful" });
    }
    
  } catch (error) {
    console.log("Logout error : ", error)
    await resetAuthCookies();
    return NextResponse.json({ success: false, redirectTo: "/login", error: error });
  }
}
