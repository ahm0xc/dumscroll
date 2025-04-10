export function getDomainNameFromUrl(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname.replace("www.", "").replace("https://", "").replace("http://", "");
}

export function getWebsiteNameFromUrl(url: string) { // https://www.google.com/search?q=test -> google
  try {
    const hostname = new URL(url).hostname;
    // Remove www. prefix if present
    const withoutWww = hostname.replace(/^www\./, "");
    // Get the main domain part (before the TLD)
    const parts = withoutWww.split(".");
    if (parts.length >= 2) {
      // Return the second-to-last part (the main domain name)
      return parts[parts.length - 2];
    }
    return withoutWww;
  }
  catch (error) {
    console.error("Error parsing URL:", url, error);
    return url;
  }
}

export function truncateString(str: string, maxLength: number, suffix = "...") {
  if (str.length <= maxLength)
    return str;

  return str.slice(0, maxLength) + suffix;
}

/**
 * Constants for time calculations with reasonable defaults
 */
const BROWSING_CONSTANTS = {
  // Maximum time between visits considered as continuous browsing (30 min)
  MAX_INACTIVE_TIME: 30 * 60 * 1000,
  // Minimum time to attribute to any visit (5 sec)
  MIN_VISIT_TIME: 5 * 1000,
  // Default time for the last recorded visit (30 sec)
  DEFAULT_LAST_VISIT_TIME: 30 * 1000,
  // Maximum results to fetch from history API
  MAX_HISTORY_RESULTS: 10000,
  // Threshold for rapid navigation (visits less than 2 seconds apart)
  RAPID_NAVIGATION_THRESHOLD: 2 * 1000,
};

/**
 * Helper function that processes browser history data with common logic
 */
async function processBrowsingHistory({
  timeframe = { months: 1 },
  constants = BROWSING_CONSTANTS,
}: {
  timeframe?: { days?: number; months?: number };
  constants?: typeof BROWSING_CONSTANTS;
} = {}) {
  // Get browsing history from the specified period ago
  const startDate = new Date();

  if (timeframe.days === 0) {
    // For "Today" option: set to midnight (12:00 AM) of the current day
    startDate.setHours(0, 0, 0, 0);
  }
  else {
    // Apply months if specified
    if (timeframe.months) {
      startDate.setMonth(startDate.getMonth() - timeframe.months);
    }

    // Apply days if specified
    if (timeframe.days) {
      startDate.setDate(startDate.getDate() - timeframe.days);
    }
  }

  try {
    // Step 1: Get all history items in the time range
    const historyItems = await new Promise<chrome.history.HistoryItem[]>((resolve, reject) => {
      try {
        chrome.history.search({
          text: "",
          startTime: startDate.getTime(),
          maxResults: constants.MAX_HISTORY_RESULTS,
        }, (items) => {
          if (chrome.runtime.lastError) {
            reject(new Error(`History search error: ${chrome.runtime.lastError.message}`));
          }
          else {
            resolve(items);
          }
        });
      }
      catch (error) {
        reject(new Error(`Failed to search history: ${error}`));
      }
    });

    // Create a map to track domains and their URLs
    const domainUrlMap = new Map<string, Set<string>>();

    // Process history items to get unique URLs per domain
    for (const item of historyItems) {
      if (!item.url)
        continue;

      try {
        // Skip browser-specific URLs directly
        if (item.url.startsWith("chrome://")
          || item.url.startsWith("chrome-extension://")
          || item.url.startsWith("chrome-search://")
          || item.url.startsWith("edge://")
          || item.url.startsWith("brave://")
          || item.url.startsWith("about:")
          || item.url.startsWith("devtools://")
          || item.url.includes("/newtab")) {
          continue;
        }

        const domain = getDomainNameFromUrl(item.url);

        // Skip browser domains
        if (domain.includes("chrome.")
          || domain.includes("chrome-extension")
          || domain.includes("chrome-search")
          || domain.includes("newtab")
          || domain.includes("edge.")
          || domain.includes("brave.")
          || domain.includes("chromewebstore.")
          || domain.includes("chromium.")) {
          continue;
        }

        if (!domainUrlMap.has(domain)) {
          domainUrlMap.set(domain, new Set());
        }

        domainUrlMap.get(domain)!.add(item.url);
      }
      catch (error) {
        console.error("Error processing URL:", item.url, error);
      }
    }

    // Step 2: Get all visits for all domains
    const domainVisits = new Map<string, { visitTime: number; representativeUrl: string }>();
    const allVisits: { timestamp: number; domain: string; url?: string; transition?: string }[] = [];

    // Process each domain and its URLs
    for (const [domain, urls] of domainUrlMap.entries()) {
      if (!domainVisits.has(domain)) {
        domainVisits.set(domain, { visitTime: 0, representativeUrl: "" });
      }

      let maxVisitCount = 0;
      let mostVisitedUrl = "";

      // Get visits for each URL in the domain
      for (const url of urls) {
        const visits = await new Promise<chrome.history.VisitItem[]>((resolve, reject) => {
          try {
            chrome.history.getVisits({ url }, (visitItems) => {
              if (chrome.runtime.lastError) {
                reject(new Error(`Get visits error: ${chrome.runtime.lastError.message}`));
              }
              else {
                resolve(visitItems);
              }
            });
          }
          catch (error) {
            reject(new Error(`Failed to get visits: ${error}`));
          }
        });

        // Filter visits within our time range
        const filteredVisits = visits.filter(visit =>
          visit.visitTime && visit.visitTime >= startDate.getTime(),
        );

        // Add domain visits to our sorted list
        for (const visit of filteredVisits) {
          if (visit.visitTime) {
            allVisits.push({
              timestamp: visit.visitTime,
              domain,
              url,
              transition: visit.transition,
            });
          }
        }

        // Track the most visited URL for this domain
        if (filteredVisits.length > maxVisitCount) {
          maxVisitCount = filteredVisits.length;
          mostVisitedUrl = url;
        }
      }

      // Store the most representative URL for this domain
      if (mostVisitedUrl) {
        domainVisits.get(domain)!.representativeUrl = mostVisitedUrl;
      }
      else if (urls.size > 0) {
        // Fallback to first URL
        domainVisits.get(domain)!.representativeUrl = [...urls][0];
      }
    }

    // Step 3: Sort all visits chronologically
    allVisits.sort((a, b) => a.timestamp - b.timestamp);

    return {
      startDate,
      domainUrlMap,
      domainVisits,
      allVisits,
      constants,
    };
  }
  catch (error) {
    console.error("Error processing browsing history:", error);
    // Return empty data structures in case of error
    return {
      startDate,
      domainUrlMap: new Map(),
      domainVisits: new Map(),
      allVisits: [],
      constants,
    };
  }
}

/**
 * Calculate time spent on websites based on visit timestamps
 * Accounts for different browsing patterns and transitions
 */
function calculateTimeSpent(visits: { timestamp: number; domain: string; transition?: string }[], constants: typeof BROWSING_CONSTANTS) {
  const domainTimeMap = new Map<string, number>();

  for (let i = 0; i < visits.length; i++) {
    const currentVisit = visits[i];
    const nextVisit = i < visits.length - 1 ? visits[i + 1] : null;

    // Skip certain transition types that don't represent active browsing
    if (currentVisit.transition === "auto_subframe" || currentVisit.transition === "reload") {
      continue;
    }

    // Calculate time spent on this visit
    let timeSpent = 0;

    if (nextVisit) {
      // Time until next visit
      const timeDiff = nextVisit.timestamp - currentVisit.timestamp;

      // Handle rapid navigation
      if (timeDiff < constants.RAPID_NAVIGATION_THRESHOLD) {
        timeSpent = constants.MIN_VISIT_TIME;
      }
      else {
        // If the next visit is too far in the future, cap the time
        timeSpent = Math.min(timeDiff, constants.MAX_INACTIVE_TIME);
      }
    }
    else {
      // For the last visit, assign a default time
      timeSpent = constants.DEFAULT_LAST_VISIT_TIME;
    }

    // Ensure at least minimum time
    timeSpent = Math.max(timeSpent, constants.MIN_VISIT_TIME);

    // Add to domain's total time
    const domain = currentVisit.domain;
    domainTimeMap.set(domain, (domainTimeMap.get(domain) || 0) + timeSpent);
  }

  return domainTimeMap;
}

export async function getTopWebsiteUses({
  limit = 10,
  timeframe = { months: 1 },
}: {
  limit?: number;
  timeframe?: { days?: number; months?: number };
} = {}): Promise<Array<{ url: string; uses: number }>> {
  const { domainVisits, allVisits, constants } = await processBrowsingHistory({ timeframe });

  // Use the enhanced calculation function
  const domainTimeMap = calculateTimeSpent(allVisits, constants);

  // Update the domain visit times
  for (const [domain, timeSpent] of domainTimeMap.entries()) {
    const domainData = domainVisits.get(domain);
    if (domainData) {
      domainData.visitTime = timeSpent;
    }
  }

  // Convert to array, sort, and take top sites
  const topSites = Array.from(domainVisits.entries())
    .map(([domain, data]) => ({
      domain,
      url: data.representativeUrl,
      uses: data.visitTime / 1000, // Convert to seconds
    }))
    .sort((a, b) => b.uses - a.uses)
    .slice(0, limit);

  return topSites.map(site => ({
    url: site.url,
    uses: site.uses,
  }));
}

export async function getTotalTimeSpent({
  timeframe = { months: 1 },
}: {
  timeframe?: { days?: number; months?: number };
}): Promise<number> {
  const { allVisits, constants } = await processBrowsingHistory({ timeframe });

  // Use the enhanced calculation function to get all domain times
  const domainTimeMap = calculateTimeSpent(allVisits, constants);

  // Sum up all domain times
  let totalTimeSpent = 0;
  for (const timeSpent of domainTimeMap.values()) {
    totalTimeSpent += timeSpent;
  }

  // Return the total time in seconds
  return totalTimeSpent / 1000;
}
