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

/**
 * 数字运算（主要用于小数点精度问题）
 * @param {number} a 
 * @param {"+"|"-"|"*"|"/"} type 计算方式
 * @param {number} b 
 * @example 
 */
export function computeNumber(a, type, b) {
  /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
  function getDecimalLength(n) {
    const decimal = n?.toString().split(".")[1];
    return decimal ? decimal.length : 0;
  }
  /**
   * 修正小数点
   * @description 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的处理
   * @param {number} n
   */
  const amend = (n, precision = 15) => parseFloat(Number(n).toPrecision(precision));
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  let result = 0;

  a = amend(a * power);
  b = amend(b * power);

  switch (type) {
    case "+":
      result = (a + b) / power;
      break;
    case "-":
      result = (a - b) / power;
      break;
    case "*":
      result = (a * b) / (power * power);
      break;
    case "/":
      result = a / b;
      break;
  }

  result = amend(result);

  return result
}
