import Link from 'next/link'
import React from 'react'

type CardProps = {
  link: string
  title: string
  text: string
}

export const Card: React.FC<CardProps> = ({ link, title, text }) => {
  return (
    <div
      className="
        w-[48%]
        sm:w-[32%]
        [&:nth-child(2n)]:ml-[4%]
        sm:[&:nth-child(3n+1)]:ml-[0%]
        sm:[&:nth-child(3n+2)]:ml-[2%]
        sm:[&:nth-child(3n)]:ml-[2%]
        [&:nth-child(n+3)]:mt-[4%]
        sm:[&:nth-child(n+3)]:mt-[0%]
        sm:[&:nth-child(n+4)]:mt-[2%]
        border
        border-zinc-400
        hover:border-sky-500
        hover:bg-sky-50
        rounded-lg
        transition-all
      "
    >
      <Link className="block p-3" href={link}>
        <p className="text-center text-lg font-bold">{title}</p>
        <p className="mt-1">{text}</p>
      </Link>
    </div>
  )
}
