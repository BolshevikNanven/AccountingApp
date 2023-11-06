import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { accountingOutType } from "../components/icons/icons";
import dayjs from "dayjs";

/**
 * 样式合并
 * @param  {...any} inputs 
 * @returns 
 */
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
  for (let key of Object.keys(accountingOutType)) {
    if (accountingOutType[key].includes(type)) {
      return key;
    }
  }
}

/**
 * 按日期分组
 * @param {Array} billdata 
 * @returns {Map}
 */
export function resortToGroupByDatetime(billdata) {
  let data = new Map();
  for (let i of billdata) {
    const time = dayjs(i.datetime).format('YYYY-MM-DD');

    if (!data.has(time)) {
      data.set(time, [i]);
      continue
    }
    data.set(time, [...data.get(time), i])
  }
  return data;
}