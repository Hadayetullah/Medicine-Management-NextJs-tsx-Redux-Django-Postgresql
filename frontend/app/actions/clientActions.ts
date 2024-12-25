

export async function handleWebSocket(action:string, payload:any): Promise<any> {
    const response = await fetch("/api/websocket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, ...payload }),
    });
  
    return response.json();
}


export async function logout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
}