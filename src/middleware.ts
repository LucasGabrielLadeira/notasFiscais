// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  console.log("Middleware intercepting:", request.nextUrl.pathname);
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/register"];
  if (!publicRoutes.includes(pathname)) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await verifyToken(accessToken);
    } catch (error) {
      console.error("Token de acesso inválido:", error);
      const refreshToken = request.cookies.get("refresh_token")?.value;

      if (refreshToken) {
        try {
          await verifyToken(refreshToken);
          const response = NextResponse.redirect(request.url);
          // Aqui você poderia renovar o access token e setar o cookie
          return response;
        } catch (refreshError) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }

      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (publicRoutes.includes(pathname) && accessToken) {
    try {
      await verifyToken(accessToken);
      return NextResponse.redirect(new URL("/home", request.url));
    } catch {
      // Token inválido, permite acessar rota pública
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
