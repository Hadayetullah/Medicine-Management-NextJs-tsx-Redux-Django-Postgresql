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
    const apiSocketUrl = process.env.BACKEND_SOCKET_BASE_URL;
    return apiSocketUrl;
}
