import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>,
);

function Hello() {
  return "Hello";
}
