export const dynamic = "force-dynamic";

import { websocketEventEmitter, eventBuffer } from "@/app/utils/websocketMiddlewareUtil"; // Import buffer
import { NextResponse } from "next/server";

export async function GET() {
  console.log("websocket-stream API accessed");

  console.log("Replaying buffered events at stream start:", eventBuffer);

  const stream = new ReadableStream({
    start(controller) {
      console.log("ReadableStream started");

      const handler = (event: any) => {
        console.log("Event received in handler and sending to client:", event);
        controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
      };

      // Replay buffered events
      console.log("Replaying buffered events:", eventBuffer);
      eventBuffer.forEach((event) => handler(event)); // Replay each event in the buffer

      // Register the handler for future events
      websocketEventEmitter.on("message", handler);

      // Cleanup on cancellation
      controller.close = () => {
        websocketEventEmitter.off("message", handler);
      };
    },
    cancel() {
      console.log("Stream canceled");
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
