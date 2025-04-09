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

export async function getTopWebsiteUses({
  limit = 10,
  timeframe = { months: 1 },
}: {
  limit?: number;
  timeframe?: { days?: number; months?: number };
} = {}): Promise<Array<{ url: string; uses: number }>> {
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

  // Step 1: Get all history items in the time range
  const historyItems = await new Promise<chrome.history.HistoryItem[]>((resolve) => {
    chrome.history.search({
      text: "",
      startTime: startDate.getTime(),
      maxResults: 10000, // Reasonable limit
    }, items => resolve(items));
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
  const allVisits: { timestamp: number; domain: string }[] = [];

  // Process each domain and its URLs
  for (const [domain, urls] of domainUrlMap.entries()) {
    if (!domainVisits.has(domain)) {
      domainVisits.set(domain, { visitTime: 0, representativeUrl: "" });
    }

    let maxVisitCount = 0;
    let mostVisitedUrl = "";

    // Get visits for each URL in the domain
    for (const url of urls) {
      const visits = await new Promise<chrome.history.VisitItem[]>((resolve) => {
        chrome.history.getVisits({ url }, visitItems => resolve(visitItems));
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

  // Step 4: Calculate time spent on each domain
  const MAX_INACTIVE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
  const MIN_VISIT_TIME = 5 * 1000; // 5 seconds minimum
  const DEFAULT_LAST_VISIT_TIME = 30 * 1000; // 30 seconds for last visit

  for (let i = 0; i < allVisits.length; i++) {
    const currentVisit = allVisits[i];
    const nextVisit = i < allVisits.length - 1 ? allVisits[i + 1] : null;

    // Calculate time spent on this visit
    let timeSpent = 0;

    if (nextVisit) {
      // Time until next visit
      const timeDiff = nextVisit.timestamp - currentVisit.timestamp;

      // If the next visit is too far in the future, cap the time
      timeSpent = Math.min(timeDiff, MAX_INACTIVE_TIME);
    }
    else {
      // For the last visit, assign a default time
      timeSpent = DEFAULT_LAST_VISIT_TIME;
    }

    // Ensure at least minimum time
    timeSpent = Math.max(timeSpent, MIN_VISIT_TIME);

    // Add to the domain's total time
    const domainData = domainVisits.get(currentVisit.domain);
    if (domainData) {
      domainData.visitTime += timeSpent;
    }
  }

  // Step 5: Convert to array, sort, and take top sites
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

  // Step 1: Get all history items in the time range
  const historyItems = await new Promise<chrome.history.HistoryItem[]>((resolve) => {
    chrome.history.search({
      text: "",
      startTime: startDate.getTime(),
      maxResults: 10000, // Reasonable limit
    }, items => resolve(items));
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
  const allVisits: {
    timestamp: number;
    domain: string;
    url: string;
  }[] = [];

  // Process each domain and its URLs
  for (const [domain, urls] of domainUrlMap.entries()) {
    // Get visits for each URL in the domain
    for (const url of urls) {
      const visits = await new Promise<chrome.history.VisitItem[]>((resolve) => {
        chrome.history.getVisits({ url }, visitItems => resolve(visitItems));
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
          });
        }
      }
    }
  }

  // Step 3: Sort all visits chronologically
  allVisits.sort((a, b) => a.timestamp - b.timestamp);

  // Step 4: Calculate total time spent using actual time between visits
  const MAX_INACTIVE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
  const DEFAULT_LAST_VISIT_TIME = 30 * 1000; // 30 seconds for last visit

  let totalTimeSpent = 0;

  for (let i = 0; i < allVisits.length; i++) {
    const currentVisit = allVisits[i];
    const nextVisit = i < allVisits.length - 1 ? allVisits[i + 1] : null;

    // Calculate time spent on this visit
    let timeSpent = 0;

    if (nextVisit) {
      // Time until next visit
      const timeDiff = nextVisit.timestamp - currentVisit.timestamp;

      // If the next visit is too far in the future, cap the time
      // This could indicate user inactivity or closed the browser
      timeSpent = Math.min(timeDiff, MAX_INACTIVE_TIME);
    }
    else {
      // For the last visit, assign a default time
      timeSpent = DEFAULT_LAST_VISIT_TIME;
    }

    // Add to the total time spent
    totalTimeSpent += timeSpent;
  }

  // Return the total time in seconds
  return totalTimeSpent / 1000;
}
