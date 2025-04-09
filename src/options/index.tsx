import React from "react";
import ReactDOM from "react-dom/client";

import "../globals.css";

import ModalProvider from "~/components/modals/modal-provider";
import { ThemeProvider } from "~/components/theme-provider";

import Options from "./options";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider />
      <Options />
    </ThemeProvider>
  </React.StrictMode>,
);
