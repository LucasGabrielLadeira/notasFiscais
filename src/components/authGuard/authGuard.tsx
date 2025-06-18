// Exemplo de AuthGuard no Next.js (como componente)
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=' + encodeURIComponent(router.asPath));
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return;
  }

  return <>{children}</>;
}