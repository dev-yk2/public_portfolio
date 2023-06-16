import React from 'react'
import Link from 'next/link'
import { ButtonSignOut } from '../ButtonSignOut'

type MenuProps = {
  isMenuOpen: boolean
}

export const Menu: React.FC<MenuProps> = ({ isMenuOpen }) => {
  return (
    <nav
      className={`overflow-auto fixed -right-80 top-[--root-header-height] w-80 h-[calc(100vh_-_var(--root-header-height))] bg-zinc-200 transition-all ${
        isMenuOpen ? '!right-0' : ''
      }`}
    >
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/bookshelf">Bookshelf</Link>
        </li>
        <li>
          <ButtonSignOut />
        </li>
      </ul>
    </nav>
  )
}
