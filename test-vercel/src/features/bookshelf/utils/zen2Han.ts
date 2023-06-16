/**
 * 全角英数を半角英数に変換
 * - [参考サイト](https://www.yoheim.net/blog.php?q=20191101)
 *   - 参考サイトは関数名がおかしいので注意
 * @param zen 変換対象の文字列
 * @returns 返還後の文字列
 */
export const zen2Han = (str: string) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0xfee0)
  })
}

// 半角英数を全角英数に変換
// const han2Zen = (str: string) => {
//   return str.replace(/[A-Za-z0-9]/g, (match) => {
//     return String.fromCharCode(match.charCodeAt(0) + 0xFEE0)
//   })
// }
