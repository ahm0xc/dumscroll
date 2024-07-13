import chalk from "chalk";

export function trackTime({ platform }: { platform: string }) {
  let timeSpent = 0;

  setInterval(() => {
    if (!window.document.hasFocus()) {
      return;
    }

    if (timeSpent === 60) {
      updateTracking({ timeSpent, platform });
      timeSpent = 0;
    }

    timeSpent += 1;
  }, 1000);
}

function updateTracking({ timeSpent, platform }: { timeSpent: number; platform: string }) {
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
        platform,
        customerId,
      });
    }
  });
}
