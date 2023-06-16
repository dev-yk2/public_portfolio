/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Menu } from '../Menu/Menu'
import { ButtonHamburgerMenu } from '../ButtonHamburgerMenu'

export const MenuContainer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleMenuBtnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const handleMenuCloseBtnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsMenuOpen(false)
  }

  return (
    <div className="relative z-40">
      {isMenuOpen ? (
        <button
          className="fixed left-0 top-0 block w-full h-full cursor-default bg-black/20 backdrop-blur-sm"
          onClick={handleMenuCloseBtnClick}
        ></button>
      ) : null}

      <ButtonHamburgerMenu isMenuOpen={isMenuOpen} size="md" onClick={handleMenuBtnClick} />

      <Menu isMenuOpen={isMenuOpen} />
    </div>
  )
}
