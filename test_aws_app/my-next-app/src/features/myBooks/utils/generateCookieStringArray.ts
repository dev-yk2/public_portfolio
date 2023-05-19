/**
- サーバーサイドでヘッダーに設定するクッキー文字列を生成する。
- /page/api配下で使用する。
- 引数の例
```typescript
[
  {
    name: 'cookieName',
    value: 'abcdefg',
    path: '/',
    httpOnly: true,
    secure: false,
  }
]
```
 * @param cookieObject クッキー文字列を作成するのに必要な値。全て必須。
 * @returns
 */
const generateCookieStringArray = (
  cookieSettings: {
    name: string
    value: string
    path?: string
    maxAge?: number
    httpOnly?: boolean
    secure?: boolean
  }[],
) => {
  return cookieSettings.map((v) => {
    const path = v.path !== undefined ? `; Path=${v.path}` : ''
    const maxAge = v.maxAge !== undefined ? `; Max-Age=${v.maxAge}` : ''
    const httpOnly = v.httpOnly !== undefined ? `; HttpOnly` : ''
    const secure = v.secure !== undefined ? `; Secure` : ''
    return `${v.name}=${v.value}${path}${maxAge}${httpOnly}${secure}`
  })
}

export default generateCookieStringArray
