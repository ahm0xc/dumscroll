import React from "react";

import { Button } from "~/components/ui/button";

export default function SettingsFooter() {
  const [userEmail, setUserEmail] = React.useState<string>("");
  function logout() {
    chrome.runtime.sendMessage({ action: "setStorageValue", key: "customer-id", value: "" });
    window.location.reload();
  }

  React.useEffect(() => {
    chrome.runtime.sendMessage({ action: "getStorageValue", key: "user-email" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        setUserEmail(res.value);
      }
    });
  }, []);
  return (
    <footer className="flex items-center pt-3 border-t justify-between">
      <div>
        <p>Logged in from {userEmail}</p>
      </div>
      <div>
        <Button variant="link" size="sm" className="text-foreground text-[13px]" onClick={logout}>
          Logout
        </Button>
      </div>
    </footer>
  );
}
