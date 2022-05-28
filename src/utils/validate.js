/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validmobile(str) {
  return /^1[3-9]\d{9}$/.test(str)// 正则表达式，手机号验证的正则封装到这里
}
