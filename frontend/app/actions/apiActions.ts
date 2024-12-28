
export async function handleConnectWebSocket(connectionKey: string): Promise<any> {
    const response = await fetch("/api/websocket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "connect", connectionKey }),
    });
  
    return response.json();
}

export async function logout(): Promise<any> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
}