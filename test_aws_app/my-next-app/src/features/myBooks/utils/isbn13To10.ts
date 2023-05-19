/**
 * 13桁のISBNコードを10桁に変換する。
 * - [参考サイト](https://qiita.com/jnchito/items/b8be26ce87b56c9341ae)
 * @param isbn13 13桁のISBNコード
 * @returns 10桁のISBNコード（ASINコード）
 */
const isbn13To10 = (isbn13: string) => {
  const nineDigits = isbn13.replace(/-/g, '').trim().slice(3, 12)
  const lastNum =
    11 -
    (nineDigits.split('').reduce((a, v, i) => {
      return a + Number(v) * (10 - i)
    }, 0) %
      11)
  const isbn10 =
    nineDigits + (lastNum === 11 ? '0' : lastNum === 10 ? 'X' : String(lastNum))
  return isbn10
}

export default isbn13To10
