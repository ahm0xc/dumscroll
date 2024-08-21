import { APP_URL } from "~/config";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "trackTime") {
    const timeSpent = request.timeSpent as number;
    let url = (request.url as string).replace("www.", "");
    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    const licenseKey = request.licenseKey as string;
    console.info({ timeSpent, url, licenseKey: licenseKey });

    fetch(`${APP_URL}/api/track`, {
      method: "POST",
      body: JSON.stringify({
        url,
        duration: timeSpent,
        licenseKey,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sendResponse({ data });
      })
      .catch((err) => {
        sendResponse({ error: err.message });
      });

    return true;
  }
});
