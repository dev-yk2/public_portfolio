/**
 * カタカナをひらがなに変換
 * - [参考サイト](https://qiita.com/mimoe/items/855c112625d39b066c9a)
 * @param str 変換対象の文字列
 * @returns 変換後の文字列
 */
export const kata2Hira = (str: string) => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60)
  })
}

// ひらがなをカタカナに変換
// const hira2Kata = (str: string) => {
//   return str.replace(/[\u3041-\u3096]/g, (match) => {
//     return String.fromCharCode(match.charCodeAt(0) + 0x60)
//   })
// }
