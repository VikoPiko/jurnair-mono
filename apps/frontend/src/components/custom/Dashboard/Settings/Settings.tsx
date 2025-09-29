"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const defaultSettings = {
  theme: "system",
  language: "eng",
};

const Settings = () => {
  const [preference, setPreference] =
    useState<typeof defaultSettings>(defaultSettings);

  useEffect(() => {
    try {
      const prefs = localStorage.getItem("userPrefs");
      if (prefs) {
        setPreference(JSON.parse(prefs));
      } else {
        localStorage.setItem("userPrefs", JSON.stringify(defaultSettings));
      }
    } catch (error) {
      console.error("Error loading prefs:", error);
    }
  }, []);

  const updatePreference = <K extends keyof typeof defaultSettings>(
    key: K,
    value: (typeof defaultSettings)[K]
  ) => {
    setPreference((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem("userPrefs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="text-white">
      <p>Theme: {preference.theme}</p>
      <p>Language: {preference.language}</p>

      <div className="flex gap-4 mt-2">
        <Button onClick={() => updatePreference("theme", "light")}>
          Set Light Theme
        </Button>
        <Button onClick={() => updatePreference("theme", "dark")}>
          Set Dark Theme
        </Button>
        <Button onClick={() => updatePreference("language", "bg")}>
          Set Language BG
        </Button>
        <Button onClick={() => updatePreference("language", "eng")}>
          Set Language ENG
        </Button>
      </div>
    </div>
  );
};

export default Settings;
