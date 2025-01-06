import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";


async function fetchNewAccessToken(refreshToken: string, req: NextRequest) {
  const apiUrl = new URL("/api/auth/refresh-token", req.url).toString();
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}



function decodeToken(token:any) {
  const [, payloadBase64] = token.split(".");
  const decodedBuffer = Buffer.from(payloadBase64, "base64");
  const decodedString = decodedBuffer.toString("utf-8");
  const payload = JSON.parse(decodedString);
  return payload
}


export async function middleware(req: NextRequest) {
  // console.log("Middleware triggered");

  // const url = req.nextUrl;

  // const response = NextResponse.next();

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;


  // Allow these route without token validation
  // if (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup") || url.pathname.startsWith("/api")) {
  //   return NextResponse.next();
  // }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login?expired=true", req.url));
  }


  // if (!accessToken || !refreshToken) {
  //   // console.log("Access token is missing, redirecting...");
  //   return NextResponse.redirect(new URL("/login?expired=true", req.url));
  // }

  // Decode the token manually to check expiration time
  try {
    const payload = decodeToken(accessToken);
    if (payload && payload.exp) {
      const { exp } = payload;
      const currentTime = Math.floor(Date.now() / 1000);

      if (exp && currentTime < exp) {
        return NextResponse.next();
      }
    }

    // Access token is either absent or expired, fetch a new one
    const newAccessToken = await fetchNewAccessToken(refreshToken, req);
    if (newAccessToken) {
      const response = NextResponse.next();
      response.cookies.set('accessToken', newAccessToken, { httpOnly: true, secure: true });
      return response;
    } else {
      return NextResponse.redirect(new URL("/login?expired=true", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }
}

export const config = {
  matcher: ["/", "/protected/:path*"], // Adjust as needed
};
