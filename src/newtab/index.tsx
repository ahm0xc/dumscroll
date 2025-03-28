import React from "react";
import ReactDOM from "react-dom/client";

import "../globals.css";

import { ThemeProvider } from "~/components/theme-provider";

import NewTab from "./new-tab";
import WebsiteBlockedAlert from "./website-blocked-alert";

const blockedSite = new URLSearchParams(window.location.search).has(
  "blockedSite",
);

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      {blockedSite ? <WebsiteBlockedAlert /> : <NewTab />}
    </ThemeProvider>
  </React.StrictMode>,
);
