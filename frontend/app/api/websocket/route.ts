import { connectWebSocket, disconnectWebSocket, sendMessageWebSocket } from "@/app/utils/websocketMiddlewareUtil";
import { getTokens } from "@/app/actions/serverActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body: {action:string; connectionKey: string; message: any} = await req.json();
    const { action, connectionKey, message } = body;

    // Fetch access tokens
    const { accessToken } = await getTokens();
    if (!accessToken) {
      return NextResponse.json({ success: false, error: "Invalid access token" });
    }

    // Define WebSocket API base URL
    const apiBaseUrl = process.env.BACKEND_API_BASE_URL + "/ws/product/medicine/";

    // Handle WebSocket actions
    switch (action) {
      case "connect": {
        const connectResponse = await connectWebSocket(connectionKey, apiBaseUrl, accessToken);
        return NextResponse.json(connectResponse);
      }

      case "sendMessage": {
        const sendResponse = sendMessageWebSocket(connectionKey, message);
        return NextResponse.json({ success: true, data: sendResponse });
      }

      case "disconnect": {
        const disconnectResponse = disconnectWebSocket(connectionKey);
        return NextResponse.json({ success: true, data: disconnectResponse });
      }

      default:
        return NextResponse.json({ success: false, error: "Invalid action" });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "An unknown error occurred" });
  }
}
