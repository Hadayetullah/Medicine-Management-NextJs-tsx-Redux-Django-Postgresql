// import { WebSocket } from "ws";

import { getTokens } from "../actions/serverActions";

const websocketConnections: Map<string, WebSocket> = new Map();

export const connectWebSocket = async (connectionKey: string) => {
  
  if (websocketConnections.has(connectionKey)) {
    throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
  }

  const {accessToken} = await getTokens()

  const url = process.env.BACKEND_SOCKET_BASE_URL + "/ws/product/medicine/";
  const connectionUrl = `${url}?token=${accessToken}`;
  const socket = new WebSocket(connectionUrl);
  
  return new Promise((resolve) => {
    socket.onopen = (event:any) => {
      websocketConnections.set(connectionKey, socket);
      resolve({ success: true, connectionKey, message: "Connected successfully", data: event.target.readyState });
    };

    socket.onmessage = (event: any) => {
      console.log("Websocket On message : ", event.data);
      // resolve({ success: true, connectionKey, message: "Message received", data: data});
    };

    socket.onerror = (error:any) => {
      console.log("Websocket On error : ", error);
      // resolve({ success: false, connectionKey, message: "WebSocket error occurred", error: error });
    };

    socket.onclose = () => {
      websocketConnections.delete(connectionKey);
      // resolve({ success: false, connectionKey, message: "WebSocket error occurred", error: error });
    };
  });
};

export const sendMessageWebSocket = async (connectionKey: string, message: any) => {
  const socket = websocketConnections.get(connectionKey);
  console.log("Send websocket message : ", websocketConnections);
  if (!socket) {
    console.log("Send websocket message error : ", websocketConnections);
    throw new Error(`No WebSocket connection for ${connectionKey}`);
  }

  console.log("Send websocket socket : ", socket);
  console.log("Send websocket socket status : ", socket.readyState);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    return { connectionKey, message: "Message sent successfully" };
  }

  console.log("Send websocket message error : ", websocketConnections);
  throw new Error(`WebSocket is not open for ${connectionKey}`);
};

export const disconnectWebSocket = async (connectionKey: string) => {
  const socket = websocketConnections.get(connectionKey);
  console.log("Disconnect websocket socket : ", socket);
  if (socket) {
    socket.close();
    websocketConnections.delete(connectionKey);
    return { connectionKey, message: "Disconnected successfully" };
  } else {
    return { connectionKey, message: "No WebSocket connection found" };
  }
};
