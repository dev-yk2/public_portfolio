import { Card } from '@/features/root/components/Card'
import { HeadCommon } from '@/features/root/components/HeadCommon'
import { Layout } from '@/features/root/components/Layout'
import { useLoadingContext } from '@/features/root/context/LoadingContext'
import { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { setIsLoading } = useLoadingContext()

  // ローディング制御
  useEffect(() => {
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout pageTitle="Home">
      <HeadCommon title="App" description="ポートフォリオサイトトップページです。" />

      <div className="overflow-auto h-[calc(100vh_-_var(--root-header-height))]">
        <div className="flex flex-wrap mx-auto p-4 sm:p-8 w-full max-w-4xl">
          <Card link="/bookshelf" title="Bookshelf" text="自分の持っている本を管理するアプリです。" />
        </div>
      </div>
    </Layout>
  )
}

export default Home
