import React from "react";

import Settings from "./settings";
import Setup from "./setup";

export default function Popup() {
  const [customerId, setCustomerId] = React.useState("");

  React.useEffect(() => {
    chrome.runtime.sendMessage({ action: "getStorageValue", key: "customer-id" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        setCustomerId(res.value);
      }
    });
  }, []);

  return <main className="p-6">{customerId ? <Settings /> : <Setup />}</main>;
}
