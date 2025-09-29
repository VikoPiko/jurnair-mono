"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type AuthMode = "signin" | "signup";

interface AuthDialogContextType {
  open: boolean;
  mode: AuthMode;
  openDialog: (mode?: AuthMode) => void;
  closeDialog: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(
  undefined
);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const openDialog = (mode: AuthMode = "signin") => {
    setMode(mode);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <AuthDialogContext.Provider value={{ open, mode, openDialog, closeDialog }}>
      {children}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog must be used within AuthDialogProvider");
  }
  return context;
}
