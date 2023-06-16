import React from 'react'
import Head from 'next/head'

type HeadCommonProps = {
  title: string
  description: string
}

export const HeadCommon: React.FC<HeadCommonProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}
