"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import i18n from "@/lib/i18n/i18n";

const LanguageProvider = () => {
  const [language, setLanguage] = useState<string | null>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "bg", label: "Bulgarian" },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";

    if (i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang).then(() => {
        setLanguage(storedLang);
      });
    } else {
      setLanguage(storedLang);
    }
  }, []);

  if (!language) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageProvider;
