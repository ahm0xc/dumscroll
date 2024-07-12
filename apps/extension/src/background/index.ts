chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    const defaultStorage = {
      "s-tiktok-blocked": true,
      "is-ig-reels-blocked": true,
      "is-fb-watch-blocked": true,
      "is-yt-shorts-blocked": true
    };
    chrome.storage.local.set(defaultStorage);
  }
});

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
