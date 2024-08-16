import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Track } from "~/options/analytics";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isShallowEqual(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export function convertTime(time24: string) {
  const [hours, minutes] = time24.split(":");
  let hours12 = Number.parseInt(hours);
  let ampm = "AM";

  if (hours12 === 0) {
    hours12 = 12;
  } else if (hours12 === 12) {
    ampm = "PM";
  } else if (hours12 > 12) {
    hours12 -= 12;
    ampm = "PM";
  }

  return {
    time12: `${hours12}:${minutes}`,
    ampm,
  };
}

export function isFirstTimeGreater(time1: string, time2: string) {
  // Convert both time strings to Date objects
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  // Create Date objects for comparison
  const date1 = new Date(0, 0, 0, hours1, minutes1);
  const date2 = new Date(0, 0, 0, hours2, minutes2);

  // Compare the two Date objects
  return date1 > date2;
}

export function getDateFromTrackId(id: string) {
  return id.split("#").at(0);
}
export function getUserIdFromTrackId(id: string) {
  return id.split("#").at(1);
}
export function getOriginFromTrackId(id: string) {
  return id.split("#").at(2);
}

export function getHigherLevelDomain(url: string, includePath = true) {
  // Remove the protocol (http:// or https://)
  let domain = url.replace(/^https?:\/\//, "");
  // removes (www.)
  domain = domain.replace("www.", "");

  if (includePath) return domain;
  // Find the index of the next slash after the domain
  const pathIndex = domain.indexOf("/");

  // If there is no path, return the domain as is
  if (pathIndex === -1) {
    return domain;
  }
  // Otherwise, return the domain and path
  return domain.slice(0, pathIndex);
}

export function getPlatformNameFromUrl(url: string) {
  return (
    url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split(".")[0] ?? ""
  );
}

export function getFormattedTracks(tracks: Track[]) {
  const map = new Map<string, { date: string; tracks: Track[] }>();

  tracks.forEach((track) => {
    const date = getDateFromTrackId(track.id);
    if (!date) return;

    if (!map.has(date)) {
      map.set(date, { date, tracks: [] });
    }
    map.get(date)!.tracks.push(track);
  });

  return Array.from(map.values());
}
