// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/login", "/register"];
  // Se a rota não é pública e não tem access token, redireciona para login
  if (!publicRoutes.includes(pathname)) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      if (!accessToken) throw new Error("Missing access token");
      await verifyToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      if (!refreshToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
      }

      const refreshResponse = await fetch(
        `${request.nextUrl.origin}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            cookie: `refresh_token=${refreshToken}`,
          },
        }
      );

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        const response = NextResponse.next();
        response.cookies.set("access_token", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
        return response;
      }

      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  // Se a rota é pública mas o usuário está autenticado, redireciona para home
  if (publicRoutes.includes(pathname) && accessToken) {
    try {
      // Verifica se o token é válido
      // Se for válido, redireciona para home
      return NextResponse.redirect(new URL("/", request.url));
    } catch {
      // Token inválido, permite acessar rota pública
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
