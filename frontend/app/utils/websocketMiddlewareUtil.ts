import { EventEmitter } from "events";
import { getTokens } from "../actions/serverActions";

export const websocketConnections: Map<string, WebSocket> = new Map();

const websocketEvents = new EventEmitter();

export const connectWebSocket = async (connectionKey: string) => {
  if (websocketConnections.has(connectionKey)) {
    websocketEvents.emit("error", {connectionKey, data: "The WebSocket connection already exists."});
    throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
  }

  const {accessToken} = await getTokens();
  const url = `ws://localhost:8000/ws/product/medicine/?token=${accessToken}`;
  const socket = new WebSocket(url);

    socket.onopen = (event: any) => {
      console.log("Connection Established");
      websocketConnections.set(connectionKey, socket);
      websocketEvents.emit("open", {connectionKey, data: event.target.readyState});
    };

    socket.onmessage = (event: any) => {
      console.log("Socket message : ", event.data);
      websocketEvents.emit("message", {connectionKey, data: event.data});
    };

    socket.onerror = (error: any) => {
      console.log("Socket error : ", error)
      websocketEvents.emit("error", {connectionKey, data: error});
    };

    socket.onclose = () => {
      console.log(`Connection closed for ${connectionKey}`)
      websocketEvents.emit("close", {connectionKey, data: "Connection closed"});
      websocketConnections.delete(connectionKey);
    };
};



export const sendMessageWebSocket = async (connectionKey: string, message: any) => {
  const socket = websocketConnections.get(connectionKey);
  if (!socket) {
    throw new Error(`No WebSocket connection for ${connectionKey}`);
  }

  console.log("Send websocket socket : ", socket);
  console.log("Send websocket socket status : ", socket.readyState);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    return { connectionKey, message: "Message sent successfully" };
    // resolve({ success: true, connectionKey: connectionKey, message: "Message sent successfully", data: null });
  }

  throw new Error(`WebSocket is not open for ${connectionKey}`);
};

export const disconnectWebSocket = async (connectionKey: string) => {
  const socket = websocketConnections.get(connectionKey);
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
