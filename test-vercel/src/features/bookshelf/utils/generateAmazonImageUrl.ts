import { isbn13To10 } from './isbn13To10'

/**
 * # 本の画像パスを取得する。
 * - [参考サイト](https://www.ipentec.com/document/internet-get-amazon-product-image)
 * ## 課題
 * - 国コードは日本（09）のみ対応している。外国の書籍の場合はどうするか。
 * - 画像が取得できない場合の[ダミー画像](https://placehold.jp/aaaaaa/ffffff/500x500.jpg?text=no%20image)はどうするか。
 * @param isbn13or10 ISBNコード13桁または10桁
 * @param imageType 画像のサイズ t:サムネイル(52×75)、s:小サイズ(77×110)、m:中サイズ(112×160)、l:大サイズ(349×500)
 * @returns
 */
export const generateAmazonImageUrl = (isbn13or10: string, imageType: 't' | 's' | 'm' | 'l') => {
  const code = '09'
  const imgType = { t: 'THUMBZZZ', s: 'TZZZZZZZ', m: 'MZZZZZZZ', l: 'LZZZZZZZ' }
  const asin = isbn13or10.length === 13 ? isbn13To10(isbn13or10) : isbn13or10
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.${code}.${imgType[imageType]}.jpg`
}
