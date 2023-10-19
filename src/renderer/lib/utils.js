import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { accountingType } from "../components/icons/icons";

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

/**
 * 查找账单大类
 * @param {string} type 
 * @returns 
 */
export function findFatherType(type) {
  for (let key of Object.keys(accountingType)) {
      if (accountingType[key].includes(type)) {
          return key;
      }
  }

}