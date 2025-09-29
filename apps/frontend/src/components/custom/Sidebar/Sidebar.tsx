"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Settings, Search, Book, FileClock } from "lucide-react";
import { useAuth } from "../Auth/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

enum Tabs {
  Home = "Home",
  My_Journal = "My Journal",
  Settings = "Settings",
  History = "History",
  Test = "Test",
}

const tabConfig = [
  { key: Tabs.Home, label: "Home", icon: Home },
  { key: Tabs.My_Journal, label: "My Journal", icon: Book },
  { key: Tabs.Settings, label: "Settings", icon: Settings },
  { key: Tabs.History, label: "History", icon: FileClock },
  { key: Tabs.Test, label: "Test", icon: Settings },
];

const Sidebar = ({
  selectedTab,
  onTabChange,
}: {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const { user, isAuthenticated } = useAuth();

  const MAX_LENGTH = 12;
  const safeEmail = user?.email ?? "";
  const isLong = safeEmail.length > MAX_LENGTH;
  const previewText = isLong
    ? safeEmail.slice(0, MAX_LENGTH) + "..."
    : safeEmail;

  const handleTabSwitch = (tab: Tabs) => {
    onTabChange(tab);
    console.log("Tab is: ", tab);
  };

  return (
    <div className="fixed top-3 left-3 h-[95vh] w-[200px] rounded-lg shadow-xl bg-gray-50 dark:bg-[#242424] dark:text-gray-50">
      {isAuthenticated && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-400">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.firstName
                  ? `${user.firstName[0]?.toUpperCase() ?? ""}${
                      user.lastName?.[0]?.toUpperCase() ?? ""
                    }`
                  : user?.email?.[0]?.toUpperCase() ?? ""}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                {/* fix database and use actual name */}
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                {previewText}
              </div>
            </div>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-1">
                    <Settings className="h-3 w-3 text-gray-400 dark:text-gray-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <h1>Test</h1>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 border-b border-gray-200 dark:border-gray-400">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9 pr-8 h-9 bg-white border-gray-200 dark:border-gray-400 text-sm"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="px-1.5 py-0.5 text-xs text-gray-400 dark:text-gray-300 bg-gray-100 dark:bg-[#606060] rounded border select-none flex items-center justify-center h-5">
              /
            </kbd>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2">
        {tabConfig.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleTabSwitch(key)}
            className={`
              w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm font-medium rounded-md transition-colors duration-150
              ${
                selectedTab === key
                  ? "bg-white dark:bg-[#484848] dark:text-white text-gray-950 shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-[#484848]"
              }
            `}
          >
            <Icon className="h-4 w-4 text-gray-500 dark:text-gray-100" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
