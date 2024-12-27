// "use server"
import { EventEmitter } from "events";
import { WebSocket } from "ws";

import { getTokens } from "../actions/serverActions";

export const websocketConnections: Map<string, WebSocket> = new Map();
export const websocketEvents = new EventEmitter();

export const connectWebSocket = async (connectionKey: string) => {
  websocketEvents.emit("message", { connectionKey: "testKey", data: "testData" });
  if (websocketConnections.has(connectionKey)) {
    throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
  }

  const { accessToken } = await getTokens();
  const url = "ws://127.0.0.1:8000/ws/product/medicine/";
  const connectionUrl = `${url}?token=${accessToken}`;
  const socket = new WebSocket(connectionUrl);

  return new Promise((resolve, reject) => {
    socket.onopen = (event: any) => {
      websocketEvents.emit("open", { connectionKey });
      resolve({ success: true });
    };

    socket.onmessage = (event: any) => {
      websocketEvents.emit("message", { connectionKey, data: event.data });
      console.log("WebSocket On message:", event.data);
    };

    socket.onerror = (error: any) => {
      console.log("WebSocket On error:", error);
      reject({ success: false, connectionKey, error: "WebSocket error occurred" });
    };

    socket.onclose = () => {
      websocketConnections.delete(connectionKey);
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

export const websocketEventEmitter = websocketEvents;



// "use server"
// import { getWebsocketMessage } from "../actions/clientActions";

// import { getTokens } from "../actions/serverActions";

// const websocketConnections: Map<string, WebSocket> = new Map();

// export const connectWebSocket = async (connectionKey: string) => {
  
//   if (websocketConnections.has(connectionKey)) {
//     throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
//   }

//   const {accessToken} = await getTokens()

//   const url = process.env.BACKEND_SOCKET_BASE_URL + "/ws/product/medicine/";
//   const connectionUrl = `${url}?token=${accessToken}`;
//   const socket = new WebSocket(connectionUrl);

  
//   return new Promise((resolve) => {
//     socket.onopen = (event:any) => {
//       websocketConnections.set(connectionKey, socket);
//       resolve({ success: true, connectionKey, message: "Connected successfully", data: event.target.readyState });
//     };

    // socket.onmessage = (event: any) => {
    //   // If it is a server utility, how do I dispatch only event data to store from here wihout exposing socket?
    // };

//     socket.onerror = (error:any) => {
//       console.log("Websocket On error : ", error);
//     };

//     socket.onclose = () => {
//       websocketConnections.delete(connectionKey);
//     };
//   });
// };
