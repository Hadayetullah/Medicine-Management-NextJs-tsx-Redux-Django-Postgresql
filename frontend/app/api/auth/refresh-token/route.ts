import { NextResponse } from "next/server";
import { decodeToken, getRefreshToken } from "@/app/actions/serverActions";

export async function POST(request: Request) {
    const apiBaseUrl = process.env.BACKEND_API_BASE_URL;

    try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
            return NextResponse.json({ success: false, error: "No refresh token found" }, { status: 400 });
        }

        const response = await fetch(`${apiBaseUrl}/api/auth/refresh-token/`, {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            return NextResponse.json({ success: false, error: `Backend responded with status ${response.status}` }, { status: response.status });
        }

        const responseData = await response.json();
        const newAccessToken = responseData.accessToken;

        const payload = await decodeToken(newAccessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const maxAge = payload.exp - currentTime - 30;

        const nextResponse = NextResponse.json({ success: true, data: newAccessToken });

        nextResponse.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: maxAge > 0 ? maxAge : 0,
        });

        return nextResponse;
    } catch (error) {
        console.error("Error in /api/auth/refresh-token:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
