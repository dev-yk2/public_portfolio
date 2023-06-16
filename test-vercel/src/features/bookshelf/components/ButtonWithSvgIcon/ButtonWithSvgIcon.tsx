import React, { ReactNode } from 'react'

type ButtonWithSvgIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: ReactNode
  text?: string
  // boolean値でopcityを制御できる。未設定（undefined）の場合はopacityは変化しない。
  isActive?: boolean
}

export const ButtonWithSvgIcon: React.FC<ButtonWithSvgIconProps> = ({
  className,
  children,
  text,
  isActive,
  ...props
}) => {
  return (
    <button
      className={`flex items-center hover:text-sky-500 transition-all duration-300 ${className ?? ''} ${
        isActive === false ? 'opacity-30' : ''
      }`}
      {...props}
    >
      {children}
      {text ? <span className="ml-1">{text}</span> : null}
    </button>
  )
}
