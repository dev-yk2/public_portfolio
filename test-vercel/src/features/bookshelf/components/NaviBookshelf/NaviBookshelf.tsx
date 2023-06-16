import React from 'react'
import { GiBookshelf } from 'react-icons/gi/'
import { BiBookAdd } from 'react-icons/bi/'
import { BsTag } from 'react-icons/bs/'
import { LinkWithSvgIcon } from '@/features/bookshelf/components/LinkWithSvgIcon'

export const NaviBookshelf: React.FC = () => {
  return (
    <div className="h-[var(--bookshelf-navi-height)] bg-zinc-100 border-t-[1px] border-zinc-300">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-8 w-full h-full max-w-4xl">
        {/* <Link className="flex items-center" href="/bookshelf/regist-book">
          <BiBookAdd />
          <span className="ml-1">新規登録</span>
        </Link>
        <Link className="flex items-center" href="/bookshelf">
          <GiBookshelf />
          <span className="ml-1">本棚</span>
        </Link>
        <Link className="flex items-center" href="/bookshelf/manage-tag">
          <BsTag />
          <span className="ml-1">タグ</span>
        </Link> */}

        <LinkWithSvgIcon href="/bookshelf/regist-book" text="新規登録">
          <BiBookAdd />
        </LinkWithSvgIcon>
        <LinkWithSvgIcon href="/bookshelf" text="本棚">
          <GiBookshelf />
        </LinkWithSvgIcon>
        <LinkWithSvgIcon href="/bookshelf/manage-tag" text="タグ">
          <BsTag />
        </LinkWithSvgIcon>
      </div>
    </div>
  )
}
