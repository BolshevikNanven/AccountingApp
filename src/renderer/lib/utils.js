import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * 防抖函数
 * @param {Function} fn 
 * @param {Integer} wait 
 * @returns 
 */
export function debounce(fn, wait) {
  var timer;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);

  }
}