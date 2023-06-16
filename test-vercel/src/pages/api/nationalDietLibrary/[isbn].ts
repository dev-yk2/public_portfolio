import type { NextApiRequest, NextApiResponse } from 'next'
import xml2js from 'xml2js'
import type { NdlBookData } from '@/features/bookshelf/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<NdlBookData | Error>) {
  if (req.method === 'GET') {
    // タイトル取得用にgoogle books apiのデータを取得する。
    const gglJson = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${req.query.isbn}`)
    const gglData = await gglJson.json()

    // タイトル以外は国会図書館のデータを使用。
    const ndlXml = await fetch(`https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=${req.query.isbn}`)
    const ndlData = await ndlXml.text()

    xml2js.parseString(ndlData, function (err, result) {
      // 国会図書館データベースにデータあり

      if (result.searchRetrieveResponse.numberOfRecords[0] === '0') {
        // numberOfRecordsがゼロということは、国会図書館データベースに登録されていない
        return res.status(400).json(new Error('Not found book data in National Diet Library.'))
      }

      // unknown型に変換してからstring型に変換
      const stringData = String(result.searchRetrieveResponse.records[0].record[0].recordData[0] as unknown)

      /**
       * title
       */
      // google books apiにデータがあれば、そちらのタイトルを使用する。
      let title: string
      if (gglData.totalItems !== 0) {
        title = gglData.items[0].volumeInfo.title
        console.log({ title })
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
      // 1. 「苗字名前, 苗字名前, 苗字名前著」 --- カンマの後に半スペあり、名前と著の間に半スペなし
      authors = authors.map((author) =>
        author
          .trim()
          .split(' ')[0]
          .trim()
          .replace(/(著|他著|原作)$/g, '')
      ) // return author.replace(/(著|作|画|他著)$/g, '').trim()

      /**
       * publisher
       */
      const publisherMatched = stringData.match(/<dc:publisher>(.+?)<\/dc:publisher>/)
      const publisher = publisherMatched ? publisherMatched[1] : '' // nullチェック

      const bookData: NdlBookData = {
        isbn: req.query.isbn as string,
        title: title,
        authors: authors,
        publisher: publisher,
      }

      return res.json(bookData)
    })
  }
}
