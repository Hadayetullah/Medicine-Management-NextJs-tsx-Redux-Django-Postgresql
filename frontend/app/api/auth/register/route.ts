import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

  try {
    const formData = await request.json();

    const response = await fetch(`${apiBaseUrl}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ success: true, data: responseData });

    } else if(response.status === 409) {
      const errorData = await response.json();
      return NextResponse.json({ success: 409, error: errorData });

    } else {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: errorData });
    }
    
  } catch (error) {
    console.log("Error registering user: ", error);
    // console.error("Error registering user: ", error);
   return NextResponse.json({ success: false, error: error });
  }
}
