import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function convertDate(date?: string): string | null {
  if (!date) {
    return null;
  }
  const new_date = parseISO(date);
  const result = formatDistanceToNow(new_date, { addSuffix: true });
  return result;
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
