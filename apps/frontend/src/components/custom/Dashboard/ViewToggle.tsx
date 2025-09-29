"use client";

import { useState } from "react";
import { Home, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ViewToggleProps {
  onViewChange: (view: "listings" | "posts") => void;
}

export function ViewToggle({ onViewChange }: ViewToggleProps) {
  const [activeView, setActiveView] = useState<"listings" | "posts">(
    "listings"
  );

  const handleViewChange = (view: "listings" | "posts") => {
    setActiveView(view);
    onViewChange(view);
  };

  return (
    <div className="inline-flex rounded-lg border bg-background p-1">
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button
            onClick={() => handleViewChange("listings")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
              activeView === "listings"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Home className="h-4 w-4" />
            <span>Listings</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Show All Listings</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button
            onClick={() => handleViewChange("posts")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
              activeView === "posts"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Posts</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Show All Posts</TooltipContent>
      </Tooltip>
    </div>
  );
}
