// lib/api.ts
import { useAuth } from "@/contexts/authContext";
import { parseCookies } from "nookies";

export async function authFetch(input: RequestInfo, init?: RequestInit) {
  const { refreshAuthToken } = useAuth();
  
  let accessToken = parseCookies()['access_token'];
  let response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Se token expirou, tenta renovar
  if (response.status === 401) {
    const newAccessToken = await refreshAuthToken();
    
    if (newAccessToken) {
      response = await fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    }
  }

  return response;
}