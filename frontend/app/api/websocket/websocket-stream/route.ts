import { websocketEvents } from "@/app/utils/websocketMiddlewareUtil";
import { NextResponse } from "next/server";

const activeControllers = new Map<string, ReadableStreamDefaultController>();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const connectionKey = url.searchParams.get("connectionKey");

  if (!connectionKey) {
    return new NextResponse(JSON.stringify({ error: "Provide a connection key" }), { status: 400 });
  }

  // Prevent duplicate connections
  if (activeControllers.has(connectionKey)) {
    return new NextResponse(JSON.stringify({ error: "Connection already exists for this key" }), { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const handler = (event: any) => {
        controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
      };

      websocketEvents.on("message", handler);
      activeControllers.set(connectionKey, controller);

      const cleanup = () => {
        websocketEvents.off("message", handler);
        activeControllers.delete(connectionKey);
      };

      // Listen for stream cancellation (signal abort)
      const abortSignal = req.signal;
      if (abortSignal) {
        abortSignal.addEventListener("abort", cleanup);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
