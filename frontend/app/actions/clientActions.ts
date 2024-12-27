let msg:any = null;

export async function getWebsocketMessage(data: any) {
  console.log("getWebsocketMessage : ", data);
  msg = data;
  return data;
}

export async function getMsg() {
  return msg;
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