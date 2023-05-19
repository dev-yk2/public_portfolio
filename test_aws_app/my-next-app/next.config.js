/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'images-na.ssl-images-amazon.com',
      'placehold.jp',
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports(SVGのインポートを処理する既存のルールを取得する)
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url(既存のルールを再適用するが、?urlで終わるsvgインポートにのみ適用する。)
      // {
      //   ...fileLoaderRule,
      //   test: /\.svg$/i,
      //   resourceQuery: /url/, // *.svg?url
      // },
      // Convert all other *.svg imports to React components(その他の *.svg インポートをすべて React コンポーネントに変換する。)
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        // resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.(ファイルローダーのルールを変更し、*.svgを無視するようにします。)
    // fileLoaderRule.exclude = /\.svg$/i

    return config
  },

}

module.exports = nextConfig
