import { connectWebSocket, disconnectWebSocket, sendMessageWebSocket } from "@/app/utils/websocketMiddlewareUtil";
import { getTokens } from "@/app/actions/serverActions";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
//   const { action, connectionKey, url, token, message } = req.body;
  const { action, connectionKey, message } = req.body;

  const {accessToken} = await getTokens();
  
      if (!accessToken) {
          return NextResponse.json({ success: false, error: "Invalid access token" });
      }
    const apiBaseUrl = process.env.BACKEND_API_BASE_URL + "/ws/product/medicine/";

  try {
    switch (action) {
      case "connect":
        const connectResponse = await connectWebSocket(connectionKey, apiBaseUrl, accessToken);
        // res.status(200).json(connectResponse);
        // break;
        return NextResponse.json({ response: connectResponse });

      case "sendMessage":
        const sendResponse = sendMessageWebSocket(connectionKey, message);
        // res.status(200).json(sendResponse);
        // break;
        return NextResponse.json({ response: sendResponse });

      case "disconnect":
        const disconnectResponse = disconnectWebSocket(connectionKey);
        // res.status(200).json(disconnectResponse);
        // break;
        return NextResponse.json({ response: disconnectResponse });

      default:
        // res.status(400).json({ error: "Invalid action" });
        return NextResponse.json({ error: "Invalid action" });
    }
  } catch (error:any) {
    // res.status(500).json({ error: error.message });
    return NextResponse.json({ error: error });
  }
}
