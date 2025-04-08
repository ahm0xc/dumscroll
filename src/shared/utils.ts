export function getDomainNameFromUrl(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname.replace("www.", "").replace("https://", "").replace("http://", "");
}
