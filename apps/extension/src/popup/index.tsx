import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "~/components/theme-provider";
import Popup from "./popup";

import "~/styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
);
