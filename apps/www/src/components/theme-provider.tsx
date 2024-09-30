"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";
import * as React from "react";

const defined_forced_themes = {
  "/": "light",
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      forcedTheme={defined_forced_themes[pathname as keyof typeof defined_forced_themes]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
