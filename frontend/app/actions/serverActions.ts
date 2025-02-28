'use server'

import { parse } from "cookie";
import { headers, cookies } from "next/headers";


{/* Types declarations */}
export type tokenProps = {
    accessToken: string|null;
    refreshToken: string|null;
}


{/* Functions */}
// A JWT consists of three parts separated by dots (.):
// Header(Base64-encoded JSON): Contains metadata about the token, like the algorithm and type of token.
// Payload(Base64-encoded JSON): Contains the claims (data), such as exp (expiration time), iat (issued at time), and other custom fields.
// Signature: Ensures the token hasn’t been tampered with.
export async function getTokens() {
    const tokens = <tokenProps>{
        accessToken: null,
        refreshToken: null
    };

    const cookieHeader = headers().get("cookie") || "";
    const cookies = parse(cookieHeader);
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    if (!accessToken || !refreshToken) {
        return tokens
    }

    const [, payloadBase64] = accessToken.split(".");
    // const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));

    const decodedBuffer = Buffer.from(payloadBase64, "base64");
    const decodedString = decodedBuffer.toString("utf-8");
    const payload = JSON.parse(decodedString);

    const { exp } = payload; // Extract exp field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!exp || currentTime >= exp) {
        return tokens
    }

    return {...tokens, accessToken: accessToken, refreshToken: refreshToken};
}


export async function getAccessToken() {
    let accessToken = null;

    const cookieHeader = headers().get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.accessToken;

    if (!token) {
        return accessToken
    }

    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));

    const { exp } = payload; // Extract exp field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!exp || currentTime >= exp) {
        return accessToken
    }

    return token;

}

export async function getRefreshToken() {
    let refreshToken = null;

    const cookieHeader = headers().get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.refreshToken;

    if (!token) {
        return refreshToken
    }

    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));

    const { exp } = payload; // Extract exp field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!exp || currentTime >= exp) {
        return refreshToken
    }

    return token;

}


export async function isRefreshTokenValid() {
    let refreshToken = false;

    const cookieHeader = headers().get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.refreshToken;

    if (!token) {
        return refreshToken
    }

    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));

    const { exp } = payload; // Extract exp field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!exp || currentTime >= exp) {
        return refreshToken
    }

    return true;

}


export async function resetAuthCookies() {
    cookies().set('accessToken', '');
    cookies().set('refreshToken', '');
}


export async function decodeToken(token:any) {
    const [, payloadBase64] = token.split(".");
    const decodedBuffer = Buffer.from(payloadBase64, "base64");
    const decodedString = decodedBuffer.toString("utf-8");
    const payload = JSON.parse(decodedString);
    return payload
}

export async function getWSurl() {
    const apiSocketUrl = process.env.NEXT_PUBLIC_BACKEND_SOCKET_BASE_URL;
    return apiSocketUrl;
}


export async function setCredentials(accessToken: string, refreshToken: string) {

    const decodedAccessToken = await decodeToken(accessToken);
    const decodedRefreshToken = await decodeToken(refreshToken);

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const accessTokenExpiry = decodedAccessToken.exp - currentTime - 30;
    const refreshTokenExpiry = decodedRefreshToken.exp - currentTime - 30;
    // cookies().set('session_userid', userId, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     maxAge: 60 * 60 * 24 * 7, // One week
    //     path: '/',
    // })

    cookies().set('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: accessTokenExpiry > 0 ? accessTokenExpiry : 0, // Ensure expiry is non-negative
        path: '/',
    })

    cookies().set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: refreshTokenExpiry > 0 ? refreshTokenExpiry : 0,
        path: '/',
    })
}
