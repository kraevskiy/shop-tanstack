import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(input: string, length = 68) {
  if (input.length > length) {
    return input.substring(0, length) + "...";
  }
  return input;
}

export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const size = new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'centimeter'
})
