import * as React from "react";
import ReactDOM from "react-dom/client";

import useCountdown from "~/hooks/use-countdown";

import "./crime-modal.css";

export function openCrimeModal(_url: string) {
  const root = ReactDOM.createRoot(document.querySelector("dumscroll-root") as HTMLElement);

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
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-title">Committing crime 🫢!!</p>
        <p className="modal-message">
          Are you sure you wanna commit this crime. This blocking features are for you betterment.
        </p>
        <button type="button" onClick={handleAdmit} disabled={count !== 0}>
          {count ? `${count} ` : ""}Admit Crime
        </button>
      </div>
    </div>
  );
}
