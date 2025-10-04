import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import UserDropDown from './UserDropdown'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className='container header-wrapper'>
            <Link href={'/'}>
                <Image src="/assets/icons/logo.svg" alt='logo' width={140} height={32} className='h-8 w-auto cursor-pointer' />
            </Link>
            <nav className='hidden sm:block'>
                {/* Nav Items */}
                <NavItems/>
            </nav>
            {/* UserDropDown */}
            <UserDropDown/>
        </div>
    </header>
  )
}

export default Header