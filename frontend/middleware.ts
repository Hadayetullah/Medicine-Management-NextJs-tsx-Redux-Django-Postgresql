import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered");

  const url = req.nextUrl;

  const response = NextResponse.next();

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const accessToken = cookies.accessToken;


  // Allow these route without token validation
  if (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }


  if (!accessToken) {
    console.log("Access token is missing, redirecting...");
    return NextResponse.redirect(new URL("/login?expired=true", req.url));
  }

  // Decode the token manually to check expiration time
  try {
    const [, payloadBase64] = accessToken.split(".");
    // const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));

    const decodedBuffer = Buffer.from(payloadBase64, "base64");
    const decodedString = decodedBuffer.toString("utf-8");
    const payload = JSON.parse(decodedString);

    const { exp } = payload; // Extract exp field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!exp || currentTime >= exp) {
      console.log("Access token has expired, redirecting...");
      return NextResponse.redirect(new URL("/login?expired=true", req.url));
    }

    console.log("Access token is valid, allowing request");

    response.headers.set("access-token-status", "valid");
    return response;

  } catch (error) {
    console.error("Invalid token: Redirecting...");
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }
}

export const config = {
  matcher: ["/", "/protected/:path*"], // Adjust as needed
};
