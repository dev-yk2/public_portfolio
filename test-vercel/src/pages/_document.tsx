import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja" className="text-[14px] sm:text-[16px]">
      <Head />
      <body className="text-slate-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
