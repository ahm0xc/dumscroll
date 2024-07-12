chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "getStorageValue") {
    chrome.storage.local.get(request.key, (items) => {
      sendResponse({ value: items[request.key] });
    });
    return true; // Asynchronous response
  }
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "setStorageValue") {
    chrome.storage.local.set({ [request.key]: request.value }, () => {
      sendResponse({});
    });
    return true; // Asynchronous response
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
  if (changeInfo.url) {
    handleChange(changeInfo.url, tabId);
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  handleChange(details.url, details.tabId);
});

function handleChange(url: string, tabId: number) {
  console.log({ url, tabId });
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes("/shorts/")) {
      return { redirectUrl: details.url.replace("/shorts/", "/watch?v=") };
    }
  },
  { urls: ["https://*.youtube.com/*"] },
  // ['blocking']
);
