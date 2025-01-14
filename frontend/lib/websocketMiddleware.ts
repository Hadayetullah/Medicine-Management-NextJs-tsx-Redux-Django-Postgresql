import { Middleware } from "@reduxjs/toolkit";
import { connectSocket, disconnectSocket, addProduct, setSocketError } from "./features/productSlice";

// let websocketInitialized = false;

let websocketConnections: Map<string, WebSocket> = new Map();

export const createWebSocketMiddleware = (): Middleware => {
  // let socket: WebSocket | null = null;

  return (storeAPI) => (next) => (action: any) => {
    switch (action.type) {
      case "websocket/connect": {
        const { connectionKey, accessToken, url } = action.payload;

        // if (websocketInitialized) {
        //   console.log("WebSocket connection already initialized, skipping dispatch.");
        //   return;
        // }

        if (websocketConnections.has(connectionKey)) {
          console.log(`WebSocket connection for ${connectionKey} already exists, skipping.`);
          return;
        }

        // if (!token) {
        //   console.error("Access token not found in action payload. Cannot establish WebSocket connection.");
        //   return;
        // }

        if (!accessToken) {
          console.log(`Missing token for ${connectionKey}. Cannot establish WebSocket connection.`);
          return;
        }

        if (!url) {
          console.log(`Missing URL for ${connectionKey}. Cannot establish WebSocket connection.`);
          return;
        }

        // websocketInitialized = true;

        // const url = `ws://127.0.0.1:8000/ws/product/medicine/?token=${token}`;
        const connectionUrl = `${url}?token=${accessToken}`;
        const socket = new WebSocket(connectionUrl);

        // Add event listeners
        // socket.onopen = () => {
        //   storeAPI.dispatch(connect());
        // };

        socket.onopen = () => {
          console.log("connection established");
          storeAPI.dispatch(connectSocket({ connectionKey, connected: true }));
        };

        // socket.onmessage = (event: MessageEvent) => {
        //   try {
        //     const data = JSON.parse(event.data);
        //     storeAPI.dispatch(addMessage(data));
        //   } catch (error) {
        //     console.error("Failed to parse WebSocket message: ", error);
        //   }
        // };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            console.log("On message data: ", data);
            // storeAPI.dispatch(addProduct({ connectionKey, data }));
          } catch (error) {
            console.log(`Failed to parse WebSocket message for ${connectionKey}`, error);
          }
        };

        // socket.onerror = (error) => {
        //   console.error("WebSocket error occurred: ", error)
        //   storeAPI.dispatch(setError("WebSocket error occurred"));
        // };

        socket.onerror = (error:any) => {
          console.log("WebSocket error occurred: ", error)
          storeAPI.dispatch(setSocketError({ connectionKey, error: error }));
        };

        // socket.onclose = () => {
        //   storeAPI.dispatch(disconnect());
        // };

        socket.onclose = () => {
          if(connectionKey) {
            console.log("Onclose connectionKey: ", connectionKey)
            storeAPI.dispatch(disconnectSocket({ connectionKey }));
            websocketConnections.delete(connectionKey);
          }
        };

        // Store the connection
        websocketConnections.set(connectionKey, socket);

        break;
      }

      case "websocket/disconnect": {
        const { connectionKey } = action.payload;
        const socket = websocketConnections.get(connectionKey);

        // if (socket) {
        //   socket.close();
        // }
        // socket = null;
        // storeAPI.dispatch(disconnect());

        if (socket) {
          console.log("websocket/disconnect -> connectionKey : ", connectionKey)
          socket.close();
          storeAPI.dispatch(disconnectSocket({ connectionKey }));
          websocketConnections.delete(connectionKey);
        }

        break;
      }

      case "websocket/sendMessage": {
        const { connectionKey, message } = action.payload;
        
        // if (socket && socket.readyState === WebSocket.OPEN) {
        //   socket.send(JSON.stringify(action.payload));
        // }

        const socket = websocketConnections.get(connectionKey);
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(message));
        }

        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
