import { websocketEvents } from "@/app/utils/websocketMiddlewareUtil";
import { NextResponse } from "next/server";

// Track active controllers by connection key
const activeControllers = new Map<string, ReadableStreamDefaultController>();

// Function to close the stream for a specific user
function closeStreamForUser(connectionKey: string) {
    const controller = activeControllers.get(connectionKey);
    if (controller) {
        controller.close(); // Gracefully close the stream
        activeControllers.delete(connectionKey); // Cleanup
    }
}

export async function POST(req: Request) {
    const res = await req.json();

    const connectionKey = res.connectionKey;
    if (!connectionKey) {
        return NextResponse.json({ error: "Provide a connection key" }, { status: 400 });
    }

    if (res.action === "connect") {
        // Prevent duplicate connections
        if (activeControllers.has(connectionKey)) {
            return NextResponse.json({ error: "Connection already exists for this key" }, { status: 400 });
        }

        const stream = new ReadableStream({
            start(controller) {
                const handler = (event: any) => {
                    controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
                };

                websocketEvents.on("message", handler);
                activeControllers.set(connectionKey, controller);
            },
        });

        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                "Access-Control-Allow-Origin": "*", // Adjust as needed
            },
        });
    } else if (res.action === "disconnect") {
        closeStreamForUser(connectionKey);
        return NextResponse.json({ message: "Disconnected successfully" });
    } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
}
