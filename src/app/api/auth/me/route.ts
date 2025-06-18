// app/api/auth/me/route.ts
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies(); // não é async, pode ser só cookies()
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Não autenticado' },
      { status: 401 }
    );
  }

  try {
    const decoded = await verifyToken(token);

    return NextResponse.json({
      user: {
        id: decoded.user_id,    // use a chave que você tem no payload JWT
        nome: decoded.nome,
        tipo: decoded.tipo,
        matricula: decoded.matricula,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }
}
