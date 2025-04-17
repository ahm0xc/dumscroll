export function getDomainNameFromUrl(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname.replace("www.", "").replace("https://", "").replace("http://", "");
}

export function getUrlFromDomainName(domainName: string) {
  return `https://${domainName}`;
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

type GetUsesOptions = {
  startDate?: Date;
  endDate?: Date;
  maxResults?: number;
};

type UsageStats = {
  totalDuration: number; // Duration in seconds
  viewCount: number;
  lastVisited: number; // Timestamp in milliseconds
};

type UsageType = {
  [origin: string]: UsageStats;
};

// Helper function to check if URL is a default browser URL that should be excluded
function isDefaultBrowserUrl(url: string): boolean {
  // Common browser URLs to exclude
  const defaultPatterns = [
    // Chrome
    /^chrome:\/\//, // Chrome internal pages
    /^chrome-extension:\/\//, // Chrome extensions
    /^chrome-devtools:\/\//, // Chrome DevTools
    /^chrome-search:\/\//, // Chrome search
    /^chrome-untrusted:\/\//, // Chrome untrusted
    /^chrome-error:\/\//, // Chrome error pages

    // Firefox
    /^about:/, // Firefox internal pages
    /^moz-extension:\/\//, // Firefox extensions
    /^resource:\/\//, // Firefox resources
    /^view-source:\/\//, // View source

    // Edge
    /^edge:\/\//, // Edge internal pages
    /^ms-browser-extension:\/\//, // Edge extensions

    // Safari
    /^safari-extension:\/\//, // Safari extensions
    /^safari-web-extension:\/\//, // Safari web extensions

    // Common browser features
    /^file:\/\//, // Local files
    /^data:/, // Data URLs
    /^blob:/, // Blob URLs
    /^javascript:/, // JavaScript URLs

    // New tab pages
    /^chrome:\/\/newtab/, // Chrome new tab
    /^about:newtab/, // Firefox new tab
    /^edge:\/\/newtab/, // Edge new tab

    // Extension pages
    /\/\/extensions\//, // Extension pages
    /\/\/downloads\//, // Downloads pages

    // Internal browser pages
    /\/\/settings\//,
    /\/\/history\//,
    /\/\/bookmarks\//,
  ];

  return defaultPatterns.some(pattern => pattern.test(url));
}

// Reverted to history-based calculation for pre-installation data
export function getUses(options: GetUsesOptions = {}): Promise<UsageType> {
  return new Promise((resolve) => {
    // Set default values and normalize dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Default startDate to beginning of today if not provided, or 0 if requested
    const startTime = options.startDate ? options.startDate.getTime() : today.getTime();
    // Default endTime to now if not provided
    const endTime = options.endDate ? options.endDate.getTime() + 86400000 : Date.now(); // Add a day to include the end date fully
    const maxResults = options.maxResults || 0; // 0 means no limit

    // Storage for our results
    const INTERNAL__uses: UsageType = {};

    // Helper to sort and resolve the results to avoid code duplication
    const finalizeSortAndResolve = () => {
      // Sort by total duration (descending) before resolving
      const sortedUsage: UsageType = {};
      Object.keys(INTERNAL__uses)
        .sort((a, b) => INTERNAL__uses[b].totalDuration - INTERNAL__uses[a].totalDuration)
        .forEach((key) => {
          sortedUsage[key] = {
            // Keep duration rounded to 1 decimal place
            totalDuration: Math.round(INTERNAL__uses[key].totalDuration * 10) / 10,
            viewCount: INTERNAL__uses[key].viewCount,
            lastVisited: INTERNAL__uses[key].lastVisited,
          };
        });

      // Limit to maxResults if specified
      if (maxResults > 0) {
        const limitedKeys = Object.keys(sortedUsage).slice(0, maxResults);
        const limitedUsage: UsageType = {};
        limitedKeys.forEach((key) => {
          limitedUsage[key] = sortedUsage[key];
        });
        resolve(limitedUsage);
      }
      else {
        resolve(sortedUsage);
      }
    };

    // Get history items within the time range
    chrome.history.search({
      text: "", // Empty string to get all history
      startTime,
      endTime,
      maxResults,
    }, (historyItems: chrome.history.HistoryItem[]) => {
      if (!historyItems || historyItems.length === 0) {
        resolve({});
        return;
      }

      // Process each history item
      let pendingVisits = historyItems.length;
      const processItem = (item: chrome.history.HistoryItem) => {
        try {
          if (!item.url) {
            throw new Error("URL is undefined");
          }

          // Skip default browser URLs
          if (isDefaultBrowserUrl(item.url)) {
            pendingVisits--;
            if (pendingVisits === 0) {
              finalizeSortAndResolve();
            }
            return;
          }

          const domain = getDomainNameFromUrl(item.url);

          // Initialize entry for this domain if it doesn't exist
          if (!INTERNAL__uses[domain]) {
            INTERNAL__uses[domain] = {
              totalDuration: 0,
              viewCount: 0,
              lastVisited: 0,
            };
          }

          // Increment view count and update last visited
          INTERNAL__uses[domain].viewCount++;
          if (item.lastVisitTime && item.lastVisitTime > INTERNAL__uses[domain].lastVisited) {
            INTERNAL__uses[domain].lastVisited = item.lastVisitTime;
          }

          // Get detailed visit information to calculate duration
          chrome.history.getVisits({ url: item.url }, (visits: chrome.history.VisitItem[]) => {
            const filteredVisits = visits.filter((visit) => {
              const visitTime = visit.visitTime;
              // Ensure visitTime is defined and within the requested range
              return visitTime && visitTime >= startTime && visitTime <= endTime;
            });

            // Calculate duration for sequential visits to this URL
            if (filteredVisits.length > 0) {
              // Sort visits chronologically
              filteredVisits.sort((a, b) => (a.visitTime || 0) - (b.visitTime || 0));

              for (let i = 0; i < filteredVisits.length - 1; i++) {
                const currentVisit = filteredVisits[i];
                const nextVisit = filteredVisits[i + 1];

                if (currentVisit.visitTime && nextVisit.visitTime) {
                  // Duration in milliseconds
                  const durationMs = nextVisit.visitTime - currentVisit.visitTime;

                  // Only count reasonable durations (less than 30 minutes of inactivity)
                  if (durationMs > 0 && durationMs < 1800000) {
                    // Add duration in seconds
                    INTERNAL__uses[domain].totalDuration += Math.floor(durationMs / 1000);
                  }
                }
              }

              // Instead of adding a fixed duration for the last visit, we can just use the last visit time
              if (filteredVisits.length > 0) {
                const lastVisitTime = filteredVisits[filteredVisits.length - 1].visitTime;
                if (lastVisitTime && lastVisitTime > INTERNAL__uses[domain].lastVisited) {
                  INTERNAL__uses[domain].lastVisited = lastVisitTime;
                }
              }
            }

            // Check if all items have been processed
            pendingVisits--;
            if (pendingVisits === 0) {
              finalizeSortAndResolve();
            }
          });
        }
        catch { // Catch errors for specific item processing
          pendingVisits--; // Decrement count even if an item fails
          if (pendingVisits === 0) { // Check if it was the last one
            finalizeSortAndResolve();
          }
        }
      };

      // Process items asynchronously
      historyItems.forEach(processItem);
    });
  });
}
