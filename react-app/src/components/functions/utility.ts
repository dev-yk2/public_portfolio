/**
 *
 * @param {number} num ゼロ埋めしたい数字
 * @param {number} len 桁数
 * @returns {string} (ex) 06
 */
export const zeroPadding = (num: number, len: number): string => {
  return (Array(len).join('0') + num).slice(-len)
}
