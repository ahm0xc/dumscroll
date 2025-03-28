import React from "react";
import ReactDOM from "react-dom/client";

import "../globals.css";

import { ThemeProvider } from "~/components/theme-provider";

import Options from "./options";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Options />
    </ThemeProvider>
  </React.StrictMode>,
);
