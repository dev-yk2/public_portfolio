import Head from 'next/head'
import React from 'react'

type Props = {
  title?: string
  description?: string
  pagePath?: string
}

const HeadBasic: React.FC<Props> = (props) => {
  let title = 'ポートフォリオサイト'
  if (props.title) {
    title = `${props.title} | ${title}`
  }

  let description =
    'Next.js、Prisma、Firebase Authentication、AWS、Supabase（PostgreSQL）を使用したポートフォリオサイトです。'
  if (props.description) {
    description = props.description
  }

  let canonical = 'https://aws-app.dev-2.com'
  if (props.pagePath) {
    canonical = `${canonical}${props.pagePath}`
  }

  const ogp = 'https://aws-app.dev-2.com/img/myBooks/ogp.jpg'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="ポートフォリオサイト" />
      <meta property="og:image" content={ogp} />

      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}

export default HeadBasic
