import { EventEmitter } from "events";

export const websocketConnections: Map<string, WebSocket> = new Map();

class SingletonEventEmitter extends EventEmitter {}
const instance = new SingletonEventEmitter();
export const websocketEventEmitter = instance;

// Event buffer to store recent events
export const eventBuffer: any[] = []; // <-- Export this buffer

export const connectWebSocket = async (connectionKey: string, url: string) => {
  if (websocketConnections.has(connectionKey)) {
    throw new Error(`WebSocket connection for ${connectionKey} already exists.`);
  }

  const socket = new WebSocket(url);

  const testEvent = { connectionKey: "testKey", data: "Test emit" };
  instance.emit("message", testEvent);
  eventBuffer.push(testEvent);
  console.log("Test emit fired");

  const emitAndBuffer = (event: any) => {
    console.log("Adding event to buffer:", event); // Add this
    instance.emit("message", event);
    eventBuffer.push(event);
    if (eventBuffer.length > 100) eventBuffer.shift(); // Keep buffer size manageable
  };

  console.log("Current buffer size:", eventBuffer.length);
  console.log("Buffer contents:", eventBuffer);


  

  return new Promise((resolve, reject) => {
    socket.onopen = (event: any) => {
      console.log("Connection Established");
      websocketConnections.set(connectionKey, socket);
      resolve({
        success: true,
        connectionKey: connectionKey,
        message: "Connected successfully",
        data: event.target.readyState,
      });
    };

    socket.onmessage = (event: any) => {
      const messageEvent = { connectionKey, data: event.data };
      emitAndBuffer(messageEvent);
    };

    socket.onerror = (error: any) => {
      reject({
        success: false,
        connectionKey: connectionKey,
        error: "WebSocket error occurred",
        data: error,
      });
    };

    socket.onclose = () => {
      instance.emit("close", {
        connectionKey,
        data: { action: "closed" },
      });
      websocketConnections.delete(connectionKey);
    };
  });
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

// console.log("Initializing websocketEventEmitter");

// class SingletonEventEmitter extends EventEmitter {}
// const instance = new SingletonEventEmitter();
// export const websocketEventEmitter = instance;
// export const websocketEventEmitter = websocketEvents;




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
