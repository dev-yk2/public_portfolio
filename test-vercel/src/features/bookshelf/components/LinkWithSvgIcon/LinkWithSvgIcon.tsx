import Link from 'next/link'
import React, { ReactNode } from 'react'

type LinkWithSvgIconProps = {
  className?: string
  children: ReactNode
  href: string
  text?: string
}

export const LinkWithSvgIcon: React.FC<LinkWithSvgIconProps> = ({ className, children, href, text }) => {
  return (
    <Link
      className={`flex items-center underline hover:text-sky-500 transition-all duration-300 ${className ?? ''}`}
      href={href}
    >
      {children}
      {text ? <span className="ml-1">{text}</span> : null}
    </Link>
  )
}
