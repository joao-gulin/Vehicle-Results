import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateTimeRemaining(auctionDate: string): {
  days: number;
  hours: number;
} {
  const now = new Date();
  const auction = new Date(auctionDate);
  const diffMs = auction.getTime() - now.getTime();

  // If auction has already started/ended
  if (diffMs <= 0) {
    return { days: 0, hours: 0 };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return { days, hours };
}
