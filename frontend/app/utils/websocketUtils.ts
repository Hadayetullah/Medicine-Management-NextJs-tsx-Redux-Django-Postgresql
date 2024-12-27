"use server";

import { connectWebSocket } from "./websocketMiddlewareUtil";

export const websocketConnection = async (connectionKey: string) => {
  return connectWebSocket(connectionKey);
};
// export const websocketEventEmitter = websocketEvents; // Alias, if needed
