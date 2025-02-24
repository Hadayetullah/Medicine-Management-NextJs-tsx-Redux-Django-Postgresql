import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
// import { decodeToken } from "./app/actions/serverActions";


export async function middleware(req: NextRequest) {
  console.log("Middleware called");
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  // const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login?expired=true", req.url));
  }

  return NextResponse.next();


  // const decodedRefreshToken = await decodeToken(refreshToken);
  // if (decodedRefreshToken.exp) {
  //   const { exp } = decodedRefreshToken;
  //   const currentTime = Math.floor(Date.now() / 1000);

  //   if (exp && currentTime < exp) {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/login?expired=true", req.url));
  //   }
  // } else {
  //   return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  // }
}

export const config = {
  matcher: ["/update-and-detail", "/add-medicine", "/protected/:path*"], // Adjust as needed
};
