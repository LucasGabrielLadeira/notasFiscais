// app/api/auth/refresh/route.ts
import { generateTokens, verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies(); // não é async
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token não encontrado" },
      { status: 401 }
    );
  }

  try {
    const decoded = await verifyToken(refreshToken);

    const tokens = await generateTokens({
      user_id: decoded.user_id,
      matricula: decoded.matricula,
      nome: decoded.nome,
      tipo: decoded.tipo,
    });

    const response = NextResponse.json({ success: true });

    // Atualiza os cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
      sameSite: "strict" as const,
    };

    response.cookies.set("access_token", tokens.accessToken, cookieOptions);

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { error: "Refresh token inválido" },
      { status: 401 }
    );
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}
