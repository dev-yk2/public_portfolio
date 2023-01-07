export const siteConfig = {
  siteUrl: 'https://portfolio-9cacc.web.app',
  siteTitle: 'ポートフォリオ',
  siteDescription: 'Reactを学習する際に作成したポートフォリオサイトです。',

  pages: [
    {
      path: '/',
      title: 'Home',
      description: 'トップページ',
      homeNavi: false,
      menuNavi: true,
    },
    {
      path: '/world-clock-app/',
      title: 'World Clocl App',
      description: '選択したタイムゾーンの時刻を表示します。',
      homeNavi: true,
      menuNavi: true,
    },
    {
      path: '/memo-app/',
      title: 'Memo App',
      description: '簡易的なメモ帳です。',
      homeNavi: true,
      menuNavi: true,
    },
    {
      path: '/memo-app/login/',
      title: 'Login | Memo App',
      description: 'ログインページ',
      homeNavi: false,
      menuNavi: false,
    },
    {
      path: '/generate-card-app/',
      title: 'Generate Card App',
      description: '選択したカードにテキストを入力してオリジナルカードを作成することができます。',
      homeNavi: true,
      menuNavi: true,
    },
  ],
}
