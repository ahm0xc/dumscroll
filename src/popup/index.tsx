import React from "react";
import ReactDOM from "react-dom/client";

import "../globals.css";

import { ThemeProvider } from "~/components/theme-provider";

import Popup from "./popup";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
);
