import React from 'react'
import { MenuContainer } from '../MenuContainer'

type HeaderProps = {
  pageTitle?: string
}

export const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="flex items-center h-[--root-header-height] bg-zinc-100 border-b-[1px] border-zinc-300">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-8 w-full max-w-4xl">
        <div className="text-zinc-600">Apps</div>
        <h1 className="text-zinc-800 text-xl">{pageTitle}</h1>
        <MenuContainer />
      </div>
    </header>
  )
}
