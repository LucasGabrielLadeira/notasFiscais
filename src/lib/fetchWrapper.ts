// lib/fetchWrapper.ts
export async function fetchWrapper(
  input: RequestInfo | URL,
  init?: RequestInit,
  skipRedirect?: boolean // Novo parâmetro
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const url = typeof input === "string" ? baseUrl + input : input;

  let response = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });

  // Se token expirou, tenta renovar
  if (response.status === 401 && !url.toString().includes("/auth/refresh")) {
    const refreshResponse = await fetch(baseUrl + "/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      // Tenta a requisição original novamente
      response = await fetch(url, {
        ...init,
        credentials: "include",
        headers: {
          ...init?.headers,
          "Content-Type": "application/json",
        },
      });
    } else {
      if (!skipRedirect && typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return refreshResponse; // Retorna a resposta para tratamento
    }
  }
  return response;
}
