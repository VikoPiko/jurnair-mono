"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

const HostOptions = () => {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-amber-50 border-amber-200 text-amber-700 dark:text-amber-500"
          >
            <Crown className="w-4 h-4 mr-1" />
            Host
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push("/host/dashboard")}>
            Host Dashboard
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => router.push("/host/listings")}>
            Manage Listings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HostOptions;
