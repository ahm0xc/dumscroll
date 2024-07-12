chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "trackTime") {
    const timeSpent = request.timeSpent;
    const domain = request.domain;

    console.info({ timeSpent, domain });
    sendResponse({});
    return true; // Asynchronous response
  }
});
