'use server'

import { parse } from "cookie";
import { headers } from "next/headers";


{/* Types declarations */}
export type tokenProps = {
    accessToken: string|null;
    refreshToken: string|null;
}


{/* Functions */}
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
