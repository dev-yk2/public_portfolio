import React, { ReactNode } from 'react'

type ButtonBasicProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  className?: string
}

export const ButtonBasic: React.FC<ButtonBasicProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-3 border border-sky-500 hover:bg-sky-500 rounded-full text-sky-500 hover:text-zinc-50 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
