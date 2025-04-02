import { storage } from "~/lib/storage";
import { DEFAULT_BLOCKED_WEBSITES } from "~/shared/config";

let extensionId = "";

chrome.management.getSelf((info) => {
  extensionId = info.id;
});

chrome.runtime.onInstalled.addListener(async () => {
  const blockedWebsites = await storage.local.get("blocked_websites");
  if (!blockedWebsites) {
    await storage.local.set("blocked_websites", DEFAULT_BLOCKED_WEBSITES);
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  console.log("🚀 ~ chrome.action.onClicked.addListener ~ tab:", tab)
  console.log("clicked");
  if (!tab.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_POPUP" });
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const blockedSites = ["tiktok.com"];
  const url = new URL(details.url);

  if (blockedSites.some((site) => url.hostname.includes(site))) {
    chrome.tabs.update(details.tabId, {
      url: `chrome://newtab?blockedSite=${url.hostname}`,
    });
  }
});
