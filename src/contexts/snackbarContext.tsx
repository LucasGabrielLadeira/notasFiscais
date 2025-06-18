// contexts/SnackbarContext.tsx
"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import Snackbar from "@/components/snackbar/snackbar";

type SnackbarContextType = {
  showSnackbar: (message: string, variant?: string, delay?: number) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    variant: "success",
    delay: 3000,
  });

  const showSnackbar = (
    message: string,
    variant: string = "success",
    delay: number = 3000
  ) => {
    setSnackbar({ show: true, message, variant, delay });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        variant={snackbar.variant}
        delay={snackbar.delay}
        onClose={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar deve ser usado dentro de um SnackbarProvider");
  }
  return context;
};
