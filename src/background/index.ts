let extensionId = "";

chrome.management.getSelf((info) => {
  extensionId = info.id;
});


chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const blockedSites = ["facebook.com", "tiktok.com"];
  const url = new URL(details.url);

  if (blockedSites.some((site) => url.hostname.includes(site))) {
    chrome.tabs.update(details.tabId, {
      url: `chrome://newtab?blockedSite=${url.hostname}`,
    });
  }
});
