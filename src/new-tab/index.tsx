import React from "react";
import ReactDOM from "react-dom/client";

import "../globals.css";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";

import NewTab from "./new-tab";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="dumscroll-theme">
      <NewTab />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
);
