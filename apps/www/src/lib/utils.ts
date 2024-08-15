import { type ClassValue, clsx } from "clsx";
import dayjs, { type Dayjs } from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const formattedNumber = formatter.format(num);

  if (formattedNumber.endsWith(".0")) {
    // Remove the ".0" part
    return formattedNumber.slice(0, -2);
  }
  return formattedNumber;
}

export function getRandomNumberInRange(min: number, max: number) {
  // Ensure min and max are integers
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  // Generate a random number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function getRandomItemFromArray(array: unknown[]) {
  if (array.length === 0) return null;
  const randomIndex = getRandomNumberInRange(0, array.length - 1);
  return array[randomIndex];
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

export function generateTrackId({
  userId,
  websiteUrl,
  today,
}: {
  userId: string;
  websiteUrl: string;
  today?: Dayjs;
}): string {
  if (!today) today = dayjs();

  const genID = `${today.get("year")}-${(today.get("month") + 1).toString().padStart(2, "0")}-${today.get("date").toString().padStart(2, "0")}#${userId}#${websiteUrl}`;

  return genID;
}
