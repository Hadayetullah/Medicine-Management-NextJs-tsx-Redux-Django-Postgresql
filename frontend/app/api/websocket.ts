import { NextResponse } from "next/server";
import { getTokens } from "../actions/serverActions";
import { connectWebSocket, disconnectWebSocket, sendMessageWebSocket } from "../utils/websocketMiddlewareUtil";


export default async function handler(req:any) {

  try {
    const body = await req.json();
    const { action, connectionKey, message } = body;

    // Fetch access tokens
    const { accessToken } = await getTokens();
    if (!accessToken) {
        const data = { success: false, connectionKey:null, error: "Invalid access token", data: "invalid_token" };
      return NextResponse.json({ success: false, data: data});
    }

    // Define WebSocket API base URL
    const apiBaseUrl = process.env.BACKEND_SOCKET_BASE_URL + "/ws/product/medicine/";


    switch (action) {
      case "connect":
        const connectResponse = await connectWebSocket(connectionKey, apiBaseUrl);
        return NextResponse.json({ success: true, data: connectResponse });

      case "sendMessage":
        const sendResponse = sendMessageWebSocket(connectionKey, message);
        return NextResponse.json({ success: true, data: sendResponse });

      case "disconnect":
        const disconnectResponse = disconnectWebSocket(connectionKey);
        return NextResponse.json({ success: true, data: disconnectResponse });

      default:
        const data = { success: false, connectionKey:null, error: "Invalid action", data: "invalid_action" };
      return NextResponse.json({ success: false, data: data});
      
    }
  } catch (error) {
    const data = { success: false, connectionKey:null, error: "An error occured", data: error };
    return NextResponse.json({ success: false, data: data});
  }
}
