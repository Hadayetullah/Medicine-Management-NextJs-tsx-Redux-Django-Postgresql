// A JWT consists of three parts separated by dots (.):
// Header(Base64-encoded JSON): Contains metadata about the token, like the algorithm and type of token.
// Payload(Base64-encoded JSON): Contains the claims (data), such as exp (expiration time), iat (issued at time), and other custom fields.
// Signature: Ensures the token hasn’t been tampered with.
import { cookies } from "next/headers";

export default function validateToken(): boolean {
  try {
    // Get cookies from the headers
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      console.error("Access token not found in cookies");
      return false;
    }

    // Decode the JWT to extract payload
    const [, payloadBase64] = accessToken.split(".");
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));

    // Get current time and compare with `exp`
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    const isValid = payload.exp > currentTime;

    return isValid;
  } catch (error) {
    console.error("Error validating access token:", error);
    return false;
  }
}
