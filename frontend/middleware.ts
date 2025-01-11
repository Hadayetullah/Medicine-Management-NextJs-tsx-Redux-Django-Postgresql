import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";


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


export async function middleware(req: NextRequest) {

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login?expired=true", req.url));
  }


  const decodedRefreshToken = decodeToken(accessToken);
  if (decodedRefreshToken && decodedRefreshToken.exp) {
    const { exp } = decodedRefreshToken;
    const currentTime = Math.floor(Date.now() / 1000);

    if (exp && currentTime < exp) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login?expired=true", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }
}

export const config = {
  matcher: ["/", "/protected/:path*"], // Adjust as needed
};
