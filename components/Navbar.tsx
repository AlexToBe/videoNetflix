import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import { BsChevronDown,BsChevronUp,BsSearch,BsBell } from 'react-icons/bs';
import NavbarItem from "@/components/NavbarItem";
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
const TOP_OFFSET = 66;
const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);


  useEffect(() => {
    
    
    const changeBackground = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    }
    
  }, [])
      
  


  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = useCallback( ()=> {
    setShowMobileMenu(!showMobileMenu);
  },[showMobileMenu]);
  
    const [showAccountMenu, setAccountMenu] = useState(false);
  const toggleAccountMenu = useCallback( ()=> {
    setAccountMenu(!showAccountMenu);
  },[showAccountMenu]);
  return (
  <nav className=" w-full fixed z-40">
      <div className={`
        px-4 md:px-16 py-6 flex items-center flex-row transition duration-500 ${ hasScrolled?'bg-zinc-900 bg-opacity-90':''}
      `}>
        <Image className=" h-4 lg:h-7"  src="/images/logo.png" alt="logo" width={100} height={100}  />
              <div className=" flex-row  ml-8 gap-7 hidden lg:flex">
                  <NavbarItem label="home"/>
                  <NavbarItem label="Series"/>
                  <NavbarItem label="Films"/>
                  <NavbarItem label="New & Popular"/>
                  <NavbarItem label="My List"/>
                  <NavbarItem label="Browse by languages"/>
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className=' text-white text-sm'>Brose</p>
          <BsChevronDown className={` text-white transition ${showMobileMenu?'rotate-180':'rotate-0'}`} />
          <MobileMenu visable={showMobileMenu} />
        </div>
        <div className=" flex flex-row ml-auto gap-7 items-center">
          <div className=' text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch/>
          </div>
          <div className=' text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell/>
          </div>

          <div onClick={toggleAccountMenu} className=" flex flex-row items-center gap-2 cursor-pointer relative">
            <div className=' w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image className=" h-4 lg:h-7"  src="/images/logo.png" alt="logo" width={100} height={100}  />

            </div>
            <BsChevronDown className={` text-white transition ${showAccountMenu?'rotate-180':'rotate-0'}`} />
              
            <AccountMenu visable={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
