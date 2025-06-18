// app/api/auth/login/route.ts
import { generateTokens } from "@/lib/jwt";
import { NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";

// Tipos para os resultados do banco
type Usuario = {
  id_usuario: number;
  matricula: string;
  nome: string;
  contratacoes: string;
  senha?: string;
};

type Funcionario = {
  idtbfuncionario: number;
};

export async function POST(request: Request) {
  const { matricula, senha } = await request.json();

  if (!matricula || !senha) {
    return NextResponse.json(
      { erro: "Matrícula e senha são obrigatórias" },
      { status: 400 }
    );
  }

  let conn;
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Consulta o usuário
    const [rows] = await conn.execute<(Usuario & RowDataPacket)[]>(
      `SELECT id_usuario, matricula, nome, contratacoes, senha FROM bdfrota.tbusuario WHERE matricula = ?`,
      [matricula]
    );

    if (rows.length === 0) {
      // Verifica se é primeiro acesso
      const [foundUser] = await conn.execute<(Funcionario & RowDataPacket)[]>(
        `SELECT idtbfuncionario FROM bdaniel.tbfuncionario WHERE matricula = ?`,
        [matricula]
      );

      if (foundUser.length > 0) {
        return NextResponse.json(
          {
            erro: "Primeiro acesso. Usuário precisa ser cadastrado.",
            redirectTo: `/signup?matricula=${matricula}`,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { erro: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const passwordMatch = senha == user.senha;

    if (!passwordMatch) {
      return NextResponse.json(
        { erro: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Gera tokens (agora await)
    const payload = {
      user_id: user.id_usuario,
      matricula: user.matricula,
      nome: user.nome,
      tipo: user.contratacoes,
    };

    const tokens = await generateTokens(payload);

    // Configuração dos cookies
    const response = NextResponse.json(
      { success: true, user: payload },
      { status: 200 }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict" as const,
    };

    response.cookies.set("access_token", tokens.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60, // 15 minutos
    });

    response.cookies.set("refresh_token", tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60, // 1 dia
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 }
    );
  } finally {
    if (conn) await conn.end();
  }
}
