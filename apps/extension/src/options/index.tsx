import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./app";
import OptionsLayout from "./layout";

import "~/styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <OptionsLayout>
      <>
        <Toaster />
        <App />
      </>
    </OptionsLayout>
  </React.StrictMode>,
);
