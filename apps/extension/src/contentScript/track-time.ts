import chalk from "chalk";
import { GlobalStorage } from "~/helpers/globalstorage";

export function trackTime({ url }: { url: string }) {
  console.info(chalk.blue(`Tracking time for ${url}...`));
  let timeSpent = 0;

  setInterval(() => {
    if (!window.document.hasFocus()) {
      return;
    }

    if (timeSpent === 60) {
      updateTracking({ timeSpent, url });
      timeSpent = 0;
    }

    timeSpent += 1;
  }, 1000);
}

async function updateTracking({ timeSpent, url }: { timeSpent: number; url: string }) {
  const customerId = await GlobalStorage.get("customer-id");
  const payload = {
    action: "trackTime",
    timeSpent,
    url,
    customerId,
  };

  console.info({ payload });

  if (customerId) {
    chrome.runtime.sendMessage({
      action: "trackTime",
      timeSpent,
      url,
      customerId,
    });
  }
}
