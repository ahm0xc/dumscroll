import { type ClassValue, clsx } from "clsx";
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
