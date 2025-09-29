"use client";

import { login } from "@/lib/actions/user-client.actions";
import { signUp } from "@/lib/actions/user.actions";
import { AuthContextType } from "@/lib/dto/auth.dto";
import { SignInDto, SignUpDto, UserDto } from "@/lib/dto/user.dto";
import { apiFetch, EventType, logger } from "@/lib/utils";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react"; // <-- add useContext

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await apiFetch<UserDto>("/user/me", {
        credentials: "include",
      });
      if (!res) {
        setUser(null);
        return;
      }
      setUser(res);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setIsLoading(false));
  }, []);

  const signIn = async (user: SignInDto) => {
    try {
      setIsLoading(true);
      const data = await login(user);
      if (!data) logger("AUTH CONTEXT", EventType.error);
      await fetchUser();
    } catch (error) {
      logger("AUTH CONTEXT ERROR", EventType.error, error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (user: SignUpDto) => {
    try {
      setIsLoading(true);
      const data = await signUp(user);
      if (!data) setUser(null);
      await fetchUser();
    } catch (error) {
      logger("AUTH CONTEXT ERROR", EventType.error, error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await apiFetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp: register,
        signOut,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to consume the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
