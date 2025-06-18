// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Cria a resposta de sucesso
    const response = NextResponse.json(
      { success: true, message: "Logout realizado com sucesso" },
      { status: 200 }
    );

    // Remove os cookies de autenticação
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
