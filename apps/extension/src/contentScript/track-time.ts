import chalk from "chalk";

export function trackTime() {
  let timeSpent = 0;

  setInterval(() => {
    if (!window.document.hasFocus()) {
      return;
    }

    if (timeSpent === 10) {
      updateTracking({ timeSpent });
      timeSpent = 0;
    }

    timeSpent += 1;
    console.info("🚀 ~ setInterval ~ timeSpent:", timeSpent);
  }, 1000);
}

function updateTracking({ timeSpent }: { timeSpent: number }) {
  chrome.runtime.sendMessage({ action: "getStorageValue", key: "customer-id" }, (res) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      const customerId = res.value;

      if (!customerId) {
        return;
      }

      chrome.runtime.sendMessage({
        action: "trackTime",
        timeSpent,
        platform: "youtube",
        customerId,
      });
    }
  });
}
