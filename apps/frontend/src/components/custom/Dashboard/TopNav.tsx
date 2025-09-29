import React from "react";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleQuestionMarkIcon, Crown, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../mode-toggle";
import { Icon } from "../Icon";
import { useAuthDialog } from "../Auth/auth-dialog-context";
import { useAuth } from "../Auth/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageProvider from "../language-provider";
import HostOptions from "../host-options";
import HostButton from "../Host/host-button";

const TopNav = ({
  onSearch,
  onClear,
  isLoggedIn,
}: {
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoggedIn: boolean;
}) => {
  const { openDialog } = useAuthDialog();
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center p-5">
        <div className="inline-flex gap-x-2 items-center dark:text-white">
          <h1 className="text-3xl font-bold select-none">Jurnair</h1>
          {/* <Image src={"/icon.svg"} width={35} height={35} alt={""} /> */}
          <Icon />
        </div>
        <SearchBar onLocationChange={onSearch} onClear={onClear} />
        <div className="flex items-center gap-x-4">
          <LanguageProvider />
          <ModeToggle />
          {user?.role === "HOST" ? <HostOptions /> : <HostButton />}
          {!isAuthenticated && (
            <Button onClick={() => openDialog("signin")}>Sign In</Button>
          )}
          <Popover>
            <PopoverTrigger asChild>
              {isAuthenticated ? (
                <div className="flex items-center justify-center font-bold text-2xl text-white w-[40px] h-[40px] rounded-full select-none bg-blue-500 hover:bg-blue-600 dark:bg-[#363636] dark:border-[#4B5563] shadow-md dark:hover:bg-[#484848] transition-all duration-300">
                  {/* {user?.firstName && user?.firstName[0]} */}
                  {user?.email && user?.email[0].toUpperCase()}
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-200 w-[40px] h-[40px] rounded-full border border-gray-400 shadow-md hover:bg-gray-300 text-black">
                  <User />
                </div>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-48 mr-6 mt-3 border border-stone-400 flex">
              <div className="flex flex-col items-center gap-y-1">
                <Button
                  variant={"outline"}
                  className="justify-start w-full hover:bg-stone-200 transition-all"
                >
                  <CircleQuestionMarkIcon />
                  <h1>Help Center</h1>
                </Button>
                <Separator />
                <Button
                  variant={"ghost"}
                  className="justify-start w-full hover:bg-stone-200 transition-all"
                >
                  <h1>Refer a host.</h1>
                </Button>
                <Button
                  variant={"ghost"}
                  className="justify-start w-full hover:bg-stone-200 transition-all"
                >
                  <h1>Find a co-host.</h1>
                </Button>
                <Button
                  variant={"ghost"}
                  className="justify-start w-full hover:bg-stone-200 transition-all"
                >
                  <h1>Gift Cards.</h1>
                </Button>
                <Separator />
                <Button
                  variant={"outline"}
                  className="justify-start w-full hover:bg-stone-200 transition-all"
                  onClick={() =>
                    isAuthenticated ? signOut() : openDialog("signin")
                  }
                >
                  {isAuthenticated ? (
                    <h1>Log Out</h1>
                  ) : (
                    <h1>Log in or Sign up.</h1>
                  )}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TopNav;
