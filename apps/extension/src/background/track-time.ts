chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "trackTime") {
    const timeSpent = request.timeSpent as number;
    const url = request.url as string;
    const licenseKey = request.licenseKey as string;
    console.info({ timeSpent, url, licenseKey: licenseKey });

    // fetch("https://dumscroll.vercel.app/api/track", {
    fetch("http://localhost:3000/api/track", {
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
