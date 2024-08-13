import "./track-time";

// ****************************************************************
// ********************* OPTIONS CONFIG ***************************
// ****************************************************************
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

// ****************************************************************
// ******************** LOCAL STORAGE *****************************
// ****************************************************************
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
