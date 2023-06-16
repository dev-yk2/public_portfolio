import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Confirm } from '@/features/root/components/Confirm'
import { Header } from '@/features/root/components/Header'
import { Loading } from '@/features/root/components/Loading'

type LayoutProps = {
  pageTitle?: string
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
  return (
    <>
      <Toaster position="top-center" />
      <Confirm />
      <div>
        <Header pageTitle={pageTitle} />
        <main className="relative h-[calc(100vh_-_var(--root-header-height))] bg-zinc-50 overflow-auto">
          <div>{children}</div>

          <Loading />
        </main>
      </div>
    </>
  )
}
