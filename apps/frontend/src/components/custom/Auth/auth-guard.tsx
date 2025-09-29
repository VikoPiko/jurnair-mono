"use client";

import { useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "./auth-context";
import { useAuthDialog } from "./auth-dialog-context";

interface AuthGuardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function AuthGuard({
  children,
  title = "Authentication Required",
  description = "You must be logged in to access this content",
  className = "",
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { openDialog } = useAuthDialog();

  // const openAuthDialog = (mode: "signin" | "signup") => {
  //   setAuthMode(mode);
  //   setAuthDialogOpen(true);
  // };

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div
      className={`flex items-center justify-center min-h-[60vh] ${className}`}
    >
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Lock className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </div>

          <div className="space-y-3">
            {/* <Button className="w-full" onClick={() => openAuthDialog("signin")}> */}
            <Button className="w-full" onClick={() => openDialog("signin")}>
              Sign In
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => openDialog("signup")}
            >
              Sign Up
            </Button>
          </div>

          {/* <AuthDialog
            open={authDialogOpen}
            onOpenChange={setAuthDialogOpen}
            defaultMode={authMode}
          /> */}
        </CardContent>
      </Card>
    </div>
  );
}
