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
    // For "Today" option: set to start of current day
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

  return new Promise((resolve) => {
    chrome.history.search({
      text: "",
      startTime: startDate.getTime(),
      maxResults: 1_00_00_000, // 100 million
    }, (historyItems) => {
      // Create a map to track domains and their visit data
      const domainMap = new Map<string, { url: string; visitCount: number; visitTime: number }>();

      // Process history items
      for (const item of historyItems) {
        if (!item.url)
          continue;

        try {
          const domain = getDomainNameFromUrl(item.url);

          // Skip extension and browser URLs
          if (domain.includes("chrome-extension")
            || domain.includes("chrome")
            || domain.includes("edge")
            || domain.includes("brave")) {
            continue;
          }

          if (!domainMap.has(domain)) {
            domainMap.set(domain, {
              url: item.url,
              visitCount: 0,
              visitTime: 0,
            });
          }

          const data = domainMap.get(domain)!;
          data.visitCount += item.visitCount || 0;
          // Estimate time spent (avg 60 seconds per visit)
          data.visitTime += (item.visitCount || 0) * 60;

          // Use the most common URL for this domain
          if ((item.visitCount || 0) > (data.visitCount / 2)) {
            data.url = item.url;
          }
        }
        catch (error) {
          console.error("Error processing URL:", item.url, error);
        }
      }

      // Convert to array, sort by visit time, and take top sites
      const topSites = Array.from(domainMap.entries())
        .sort((a, b) => b[1].visitTime - a[1].visitTime)
        .slice(0, limit);

      // Convert to the requested format
      const result: Array<{ url: string; uses: number }> = [];

      for (const [_domain, data] of topSites) {
        result.push({
          url: data.url,
          uses: data.visitTime,
        });
      }

      resolve(result);
    });
  });
}
