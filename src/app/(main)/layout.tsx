"use client";
import ClientWrapper from "@/components/clientWrapper/clientWrapper";
import "./layout.css";
import AuthGuard from "@/components/authGuard/authGuard";
import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initAuth } = useAuth();

  useEffect(() => {
    initAuth();
  }, []);
  
  return (
    <AuthGuard>
      <ClientWrapper>{children}</ClientWrapper>
    </AuthGuard>
  );
}
