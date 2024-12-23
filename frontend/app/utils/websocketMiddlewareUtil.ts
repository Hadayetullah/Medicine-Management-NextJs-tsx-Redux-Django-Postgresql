"use server"
import { WebSocket } from "ws";

const websocketConnections: Map<string, WebSocket> = new Map();

export const connectWebSocket = async (connectionKey: string, url: string, token: string) => {
  if (websocketConnections.has(connectionKey)) {
    throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
  }

  const connectionUrl = `${url}?token=${token}`;
  const socket = new WebSocket(connectionUrl);

  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      websocketConnections.set(connectionKey, socket);
      resolve({ connectionKey, message: "Connected successfully" });
    };

    socket.onerror = (error:any) => {
      reject({ connectionKey, error: "WebSocket error occurred" });
    };

    socket.onclose = () => {
      websocketConnections.delete(connectionKey);
    };
  });
};

export const sendMessageWebSocket = (connectionKey: string, message: any) => {
  const socket = websocketConnections.get(connectionKey);
  if (!socket) {
    throw new Error(`No WebSocket connection for ${connectionKey}`);
  }

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    return { connectionKey, message: "Message sent successfully" };
  }

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
