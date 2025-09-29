"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./auth-context";
import { Loader2 } from "lucide-react";
import { useAuthDialog } from "./auth-dialog-context";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "signin" | "signup";
}

// {
//   open,
//   onOpenChange,
//   defaultMode = "signin",
// }: AuthDialogProps

export function AuthDialog() {
  const { open, mode, closeDialog } = useAuthDialog();

  // const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn, signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "signin") {
        await signIn({ email, password });
      } else {
        await signUp({ email, password, confirmPassword });
      }

      // Reset form and close dialog
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      closeDialog();
      // onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  const switchMode = () => {
    // setMode(mode === "signin" ? "signup" : "signin");
    setError("");
  };

  return (
    // <Dialog open={open} onOpenChange={onOpenChange}>
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Welcome back! Please sign in to your account."
              : "Create a new account to start documenting your travels."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "signin" ? "Signing In..." : "Creating Account..."}
                </>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={switchMode}
              disabled={isLoading}
            >
              {mode === "signin"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
