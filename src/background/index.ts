import type { BlockedWebsite } from "~/shared/config";
import type { Schedule } from "~/shared/types";

import { storage } from "~/lib/storage";
import { ALL_CUSTOMIZATIONS, DEFAULT_BLOCKED_WEBSITES } from "~/shared/config";
import { getDomainNameFromUrl } from "~/shared/utils";

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
  if (blockedSites.some(site => getDomainNameFromUrl(details.url) === getDomainNameFromUrl(site.url))) {
    chrome.tabs.update(details.tabId, {
      url: `chrome-extension://${extensionId}/options.html?blockedSite=${details.url}`,
    });
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const schedules = await storage.local.get<Schedule[]>("schedules");
  const schedule = schedules.find((schedule) => {
    return getDomainNameFromUrl(schedule.url) === getDomainNameFromUrl(details.url);
  });

  if (!schedule || !schedule.enabled) {
    console.log("no schedule or schedule is disabled");
    return;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Parse start and end times
  const [startHours, startMinutes] = schedule.start.split(":").map(Number);
  const [endHours, endMinutes] = schedule.end.split(":").map(Number);

  const startTime = new Date(today);
  startTime.setHours(startHours, startMinutes, 0, 0);

  const endTime = new Date(today);
  endTime.setHours(endHours, endMinutes, 0, 0);

  // Handle schedules that span across days (e.g., 23:00 to 01:00)
  if (endTime <= startTime) {
    endTime.setDate(endTime.getDate() + 1);
  }

  if (now >= startTime && now <= endTime) {
    console.log("time to block");
    chrome.tabs.update(details.tabId, {
      url: `chrome-extension://${extensionId}/options.html?blockedSite=${details.url}`,
    });
  }
  else {
    console.log("time to not block");
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
