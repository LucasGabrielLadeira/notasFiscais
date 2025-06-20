// app/api/auth/refresh/route.ts
import { generateTokens, verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies(); // Removido o await desnecessário
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token não encontrado" },
      { status: 401 }
    );
  }

  try {
    const decoded = await verifyToken(refreshToken);

    // Gera novos tokens (access e refresh)
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
      user_id: decoded.user_id,
      matricula: decoded.matricula,
      nome: decoded.nome,
      tipo: decoded.tipo,
    });

    // Configurações dos cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict" as const,
    };

    const response = NextResponse.json({ 
      success: true,
      accessToken // Importante: retorna o novo token no corpo da resposta
    });

    // Define o novo access_token (15 minutos de vida)
    response.cookies.set("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 // 15 minutos
    });

    // Opcional: define um novo refresh_token (7 dias de vida)
    if (newRefreshToken) {
      response.cookies.set("refresh_token", newRefreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 // 7 dias
      });
    }

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { error: "Refresh token inválido ou expirado" },
      { status: 401 }
    );
    // Limpa os cookies inválidos
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}