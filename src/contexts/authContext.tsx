// contexts/AuthContext.tsx
"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useSnackbar } from "./snackbarContext";
import { FormEvent } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

type User = {
  id: number;
  nome: string;
  matricula: string;
  tipo?: number;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  initAuth: () => void;
}

type SnackbarContextType = {
  showSnackbar: (message: string, variant?: string, delay?: number) => void;
};

export function AuthProvider({ children }: any) {
  const { showSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const initAuth = async () => {
    try {
      await fetchUserData();
    } catch (e) {
      setUser(null);
      // Não redireciona aqui, apenas define o estado
    } finally {
      setLoading(false);
    }
  };

  const login = async ({
    event,
    credentials,
    setValidated,
  }: {
    event: FormEvent<HTMLFormElement>;
    credentials: { matricula: string; senha: string };
    setValidated: (validated: boolean) => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    const isValid =
      credentials?.matricula?.trim() && credentials?.senha?.trim();
    setValidated(true); // Mostra os feedbacks do Bootstrap

    if (!isValid) {
      showSnackbar("Preencha todos os campos!", "danger");
      return;
    }
    try {
      const response = await fetchWrapper("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricula: credentials.matricula,
          senha: credentials.senha,
        }),
        credentials: "include", // Importante para cookies
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // Como os cookies são definidos pelo servidor via HTTP Only,
        // não precisamos mais do setAuthCookies
        await fetchUserData();
        router.push("/home");
      } else {
        throw new Error(data.erro || "Credenciais inválidas");
      }
    } catch (error) {
      showSnackbar("Erro no login: " + error?.message, "danger");
      throw error; // Rejeita a promise para tratamento no componente
    } finally {
      setLoading(false);
    }
  };

  // Atualize a fetchUserData para não precisar do token como parâmetro
  const fetchUserData = async () => {
    try {
      const response = await fetchWrapper("/api/auth/me", {
        credentials: "include", // Importante para enviar cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error("Falha ao carregar dados do usuário");
      }
    } catch (error) {
      showSnackbar("Erro ao buscar dados do usuário:" + error, "danger");
      throw error;
    }
  };

  const logout = async () => {
    await fetchWrapper("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        isAuthenticated: !!user,
        logout,
        initAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
