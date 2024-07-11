"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "~/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggle() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
  return (
    <Button size="icon" variant="secondary" onClick={toggle} className="h-8 w-8">
      {theme === "dark" ? (
        <div>
          <Sun size={16} />
        </div>
      ) : (
        <div>
          <Moon size={16} />
        </div>
      )}
    </Button>
  );
}
