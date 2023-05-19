import type { NextApiRequest, NextApiResponse } from 'next'
import xml2js from 'xml2js'
import * as Types from '@/features/myBooks/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Types.NdlBookData | Types.FetchError>,
) {
  if (req.method !== 'GET') {
    const error = {
      errorCode: 2,
      errorMessage: '本のデータを取得できませんでした。',
    } as Types.FetchError
    return res.json(error)
  }

  // タイトル取得用にgoogle books apiのデータを取得する。
  const gglJson = await fetch(
    `${process.env.GOOGLE_BOOKS_API_URL}${req.query.isbn}`,
  )
  const gglData = await gglJson.json()

  // タイトル以外は国会図書館のデータを使用。
  const ndlXml = await fetch(`${process.env.NDL_API_URL}${req.query.isbn}`)
  const ndlData = await ndlXml.text()

  xml2js.parseString(ndlData, function (err, result) {
    if (err) throw err

    // 国会図書館データベースにデータなし
    if (result.searchRetrieveResponse.numberOfRecords[0] === '0') {
      // numberOfRecordsがゼロということは、国会図書館データベースに登録されていない
      const error: Types.FetchError = {
        errorCode: 1,
        errorMessage: '本のデータを取得できませんでした。',
      }
      return res.status(400).json(error)
    }

    // 国会図書館データベースにデータあり

    // unknown型に変換してからstring型に変換
    const stringData = String(
      result.searchRetrieveResponse.records[0].record[0]
        .recordData[0] as unknown,
    )

    /**
     * title
     */
    // google books apiにデータがあれば、そちらのタイトルを使用する。
    let title: string
    if (gglData.totalItems !== 0) {
      title = gglData.items[0].volumeInfo.title
    } else {
      const titleMatched = stringData.match(/<dc:title>(.+?)<\/dc:title>/)
      title = titleMatched ? titleMatched[1] : '' // nullチェック
    }

    /**
     * authors
     */
    // 著者は複数の可能性があるので配列で返す
    const authorsMatched = stringData.match(/<dc:creator>(.+?)<\/dc:creator>/)
    let authors = authorsMatched ? authorsMatched[1].split(',') : ['']
    // 特殊パターン
    // 1. 「手島拓也, 吉田健人, 高林佳稀著」 --- 　カンマの後に半スペあり、名前と著の間に半スペなし
    authors = authors.map((v) =>
      v
        .trim()
        .split(' ')[0]
        .trim()
        .replace(/(著|他著|原作)$/g, ''),
    ) // return author.replace(/(著|作|画|他著)$/g, '').trim()

    /**
     * publisher
     */
    const publisherMatched = stringData.match(
      /<dc:publisher>(.+?)<\/dc:publisher>/,
    )
    const publisher = publisherMatched ? publisherMatched[1] : '' // nullチェック

    const bookData: Types.NdlBookData = {
      isbn: req.query.isbn as string,
      title: title,
      authors: authors,
      publisher: publisher,
    }

    return res.status(200).json(bookData)
  })
}
