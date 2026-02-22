import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <header className='h-[70px] w-[100%] bg-black sticky top-0 z-10 shadow-2xl'>  
        <article className='w-[90%] m-auto h-[100%] flex items-center justify-between'>
            <Logo/>
            <Menu/>
        </article>
    </header>
  )
}

export default NavbarContainer
