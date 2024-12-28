
export async function logout(): Promise<any> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
}