// import { WebSocket } from "ws";

const websocketConnections: Map<string, WebSocket> = new Map();

export const connectWebSocket = async (connectionKey: string, url: string, token: string) => {
  if (websocketConnections.has(connectionKey)) {
    throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
  }

  const connectionUrl = `${url}?token=${token}`;
  const socket = new WebSocket(connectionUrl);

  return new Promise((resolve) => {
    socket.onopen = (data) => {
      websocketConnections.set(connectionKey, socket);
      console.log("On open : ", data);
      resolve({ success: true, connectionKey, message: "Connected successfully", data: data });
    };

    socket.onmessage = (data: any) => {
      console.log("Websocket On message : ", data);
      resolve({ success: true, connectionKey, message: "Message received", data: data});
    };

    socket.onerror = (error:any) => {
      console.log("Websocket On error : ", error);
      resolve({ success: false, connectionKey, message: "WebSocket error occurred", error: error });
    };

    socket.onclose = () => {
      console.log("Websocket On close before : ", websocketConnections);
      websocketConnections.delete(connectionKey);
      console.log("Websocket On close after : ", websocketConnections);
    };
  });
};

export const sendMessageWebSocket = (connectionKey: string, message: any) => {
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

export const disconnectWebSocket = (connectionKey: string) => {
  const socket = websocketConnections.get(connectionKey);
  if (socket) {
    socket.close();
    websocketConnections.delete(connectionKey);
    return { connectionKey, message: "Disconnected successfully" };
  }

  throw new Error(`No WebSocket connection for ${connectionKey}`);
};
