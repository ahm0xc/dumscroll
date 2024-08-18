import * as React from "react";
import ReactDOM from "react-dom/client";

import useCountdown from "~/hooks/use-countdown";

import "./crime-modal.css";

export function openCrimeModal(_url: string) {
  const root = ReactDOM.createRoot(
    document.querySelector("dumscroll-root") as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <Modal />
    </React.StrictMode>,
  );
}

function Modal() {
  const { count } = useCountdown(5);
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) return null;

  async function handleAdmit() {
    if (count !== 0) {
      return;
    }
    setIsOpen(false);
  }

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          // animation: "modal-appear 0.3s ease-out",
        }}
      >
        <p
          className="modal-title"
          style={{
            fontSize: 24,
            color: "black",
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Committing crime 🫢!!
        </p>
        <p
          className="modal-message"
          style={{ fontSize: 18, color: "#333", marginBottom: 20 }}
        >
          Are you sure you wanna commit this crime. This blocking features are
          for you betterment.
        </p>
        <button
          type="button"
          onClick={handleAdmit}
          disabled={count !== 0}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            background: "hsl(0, 57%, 48%)",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          {count ? `${count} ` : ""}Admit Crime
        </button>
      </div>
    </div>
  );
}
