import React from 'react'

const sizes = {
  sm: 'w-5 h-3',
  md: 'w-6 h-4',
  lg: 'w-7 h-5',
}

type ButtonHamburgerMenuProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isMenuOpen: boolean
  size?: keyof typeof sizes
}

export const ButtonHamburgerMenu: React.FC<ButtonHamburgerMenuProps> = ({ isMenuOpen, size = 'md', ...props }) => {
  return (
    <button className={`relative block ${sizes[size]}`} {...props}>
      <span
        className={`absolute left-0 top-[0%] -translate-y-[50%] w-full h-0.5 bg-zinc-600 rounded-sm transition-all ${
          isMenuOpen ? '!top-[50%] !rotate-45' : ''
        }`}
      ></span>
      <span
        className={`absolute left-0 top-[50%] -translate-y-[50%] w-full h-0.5 bg-zinc-600 rounded-sm transition-all ${
          isMenuOpen ? 'opacity-0' : ''
        }`}
      ></span>
      <span
        className={`absolute left-0 top-[100%] -translate-y-[50%] w-full h-0.5 bg-zinc-600 rounded-sm transition-all ${
          isMenuOpen ? '!top-[50%] !-rotate-45' : ''
        }`}
      ></span>
    </button>
  )
}
