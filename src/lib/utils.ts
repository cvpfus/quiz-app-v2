import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { intervalToDuration } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function decodeText(text: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  return doc.documentElement.textContent;
}

export function getReadableTimeFormat(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const formattedDuration = [];
  if (duration.hours) formattedDuration.push(`${duration.minutes}h`);
  if (duration.minutes) formattedDuration.push(`${duration.minutes}m`);
  if (duration.seconds) formattedDuration.push(`${duration.seconds}s`);

  return `${formattedDuration.join(" ")} left`;
}
