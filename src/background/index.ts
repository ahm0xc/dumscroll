import type { BlockedWebsite } from "~/shared/config";

import { storage } from "~/lib/storage";
import { ALL_CUSTOMIZATIONS, DEFAULT_BLOCKED_WEBSITES } from "~/shared/config";
import { getDomainNameFromUrl } from "~/shared/utils";

// let extensionId = "";

// chrome.management.getSelf((info) => {
//   extensionId = info.id;
// });

chrome.runtime.onInstalled.addListener(async () => {
  const blockedWebsites = await storage.local.get("blocked_websites");
  if (!blockedWebsites) {
    await storage.local.set("blocked_websites", DEFAULT_BLOCKED_WEBSITES);
  }
});

chrome.runtime.onStartup.addListener(async () => {
  for (const customization of ALL_CUSTOMIZATIONS) {
    const storageKey = `cs-${customization.id}`;
    const hasValue = await storage.local.has(storageKey);
    if (!hasValue) {
      await storage.local.set(storageKey, customization.defaultEnabled);
    }
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id)
    return;
  chrome.runtime.openOptionsPage();
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const blockedSites = await storage.local.get<BlockedWebsite[]>(
    "blocked_websites",
  );
  console.log("blockedSites", blockedSites);
  const myUrl = new URL(details.url);
  console.log("myUrl", myUrl);
  if (blockedSites.some(site => getDomainNameFromUrl(myUrl.origin) === getDomainNameFromUrl(site.url))) {
    chrome.tabs.update(details.tabId, {
      url: `chrome://newtab`,
    });
  }
});

// ** handles facebook customizations
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const url = new URL(details.url);
  if (url.hostname === "www.facebook.com" && url.pathname.includes("watch")) {
    const isWatchBlocked = await storage.local.get<boolean>(
      `cs-facebook-remove-watch`,
    );

    if (!isWatchBlocked)
      return;

    chrome.tabs.update(details.tabId, {
      url: "https://www.facebook.com/",
    });
  }
});

// ** handles instagram customizations
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const url = new URL(details.url);
  if (url.hostname === "www.instagram.com" && url.pathname.includes("reels")) {
    const isReelsBlocked = await storage.local.get<boolean>(
      `cs-instagram-block-reels`,
    );

    if (!isReelsBlocked)
      return;

    chrome.tabs.update(details.tabId, {
      url: "https://www.instagram.com/",
    });
  }
  if (url.hostname === "www.instagram.com" && url.pathname.includes("explore")) {
    const isExploreBlocked = await storage.local.get<boolean>(
      `cs-instagram-block-explore`,
    );

    if (!isExploreBlocked)
      return;

    chrome.tabs.update(details.tabId, {
      url: "https://www.instagram.com/",
    });
  }
});
