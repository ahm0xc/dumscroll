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
  const licenseKey = await GlobalStorage.get("license-key");
  const payload = {
    action: "trackTime",
    timeSpent,
    url,
    licenseKey,
  };

  console.info({ payload });

  if (licenseKey) {
    console.info(chalk.blue("Updating data..."));
    chrome.runtime.sendMessage({
      action: "trackTime",
      timeSpent,
      url,
      licenseKey,
    });
  }
}
