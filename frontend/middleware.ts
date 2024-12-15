import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req: Request) {
  console.log("Middleware triggered");

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    console.log("Access token is missing, redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
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
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("Access token is valid, allowing request");
    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/protected/:path*"], // Adjust as needed
};
