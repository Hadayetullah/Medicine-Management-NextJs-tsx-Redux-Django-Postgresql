import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";


async function fetchNewAccessToken(refreshToken: string) {
  const apiBaseUrl = process.env.BACKEND_API_BASE_URL;
  const apiUrl = new URL("/api/auth/refresh-token/", apiBaseUrl).toString();
  console.log("apiUrl : ", apiUrl)
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
    console.log("Middleware api data : ", data)
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}



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
    const oldAccessTokenPayload = decodeToken(accessToken);
    if (oldAccessTokenPayload && oldAccessTokenPayload.exp) {
      const { exp } = oldAccessTokenPayload;
      const currentTime = Math.floor(Date.now() / 1000);

      if (exp && currentTime < exp) {
        console.log("first")
        return NextResponse.next();
      }
    }


    // Access token is either absent or expired, fetch a new one
    const newAccessToken = await fetchNewAccessToken(refreshToken);
    console.log("newAccessToken : ", newAccessToken)

    if (newAccessToken) {

      const newAccessTokenPayload = decodeToken(newAccessToken);

      const response = NextResponse.next();
  
      const maxAge = newAccessTokenPayload.exp - Math.floor(Date.now() / 1000) - 30; // Convert to seconds and subtract 30

      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: maxAge > 0 ? maxAge : 0, // Ensure maxAge is not negative
      });
      
      return response;

    } else {
      return NextResponse.redirect(new URL("/?error=ECONNABORTED", req.url));
    }
  } catch (error) {
    console.log("Error : ", error)
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }
}

export const config = {
  matcher: ["/", "/protected/:path*"], // Adjust as needed
};
