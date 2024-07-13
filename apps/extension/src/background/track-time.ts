chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "trackTime") {
    const timeSpent = request.timeSpent as number;
    const platform = request.platform as string;
    const customerId = request.customerId as string;
    console.info({ timeSpent, platform, customerId });
    // if (!platform || !timeSpent) {
    //   sendResponse({});
    //   return true;
    // }

    fetch("https://dumscroll.vercel.app/api/track", {
      method: "POST",
      body: JSON.stringify({
        platform,
        duration: timeSpent,
        customerId,
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
