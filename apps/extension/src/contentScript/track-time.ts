import chalk from "chalk";

export function trackTime() {
  let timeSpent = 0;

  setInterval(() => {
    if (!window.document.hasFocus()) {
      return;
    }

    timeSpent += 1;
  }, 1000);

  setInterval(
    () => {
      console.info(chalk.bgBlueBright("Time spent"), `${(timeSpent / 60).toFixed(1)} minutes`);
      chrome.runtime.sendMessage({
        action: "trackTime",
        timeSpent,
        domain: window.location.hostname,
      });
    },
    60_000, // run every minute
  );
}
