"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";

import { cn } from "~/lib/utils";

const FooterThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-full bg-neutral-50 dark:bg-neutral-950">
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={cn(
          "grid size-7 place-content-center rounded-full",
          theme === "system" && "bg-secondary",
        )}
      >
        <MonitorIcon size={14} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "grid size-7 place-content-center rounded-full",
          theme === "light" && "bg-secondary",
        )}
      >
        <SunIcon size={14} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "grid size-7 place-content-center rounded-full",
          theme === "dark" && "bg-secondary",
        )}
      >
        <MoonIcon size={14} />
      </button>
    </div>
  );
};

export default FooterThemeToggle;
