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
    
      return NextResponse.json({ success: true, data: responseData });
    }
    
  } catch (error) {
   return NextResponse.json({ success: false, error: error });
  }
}
