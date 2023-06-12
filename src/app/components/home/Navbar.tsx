'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  AiOutlineCaretDown,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai'

import logo from '../../images/logo.png'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full h-[5rem] grid place-items-center bg-white shadow-lg shadow-gray-400 z-50 fixed left-0 top-0 relative">
      <div className="container mx-auto md:flex md:items-center md:justify-between relative">
        {/* logo */}
        <div className="w-[15rem] h-[4.5rem]">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className="pl-6 md:pl-0 w-[8rem] h-full object-contain"
            />
          </Link>
        </div>

        {/* right */}
        <div>
          <ul className="hidden md:flex md:items-center md:gap-4 h-16">
            <li
              className="relative flex items-center gap-2 capitalize md:cursor-pointer"
              onClick={handleDropdownToggle}
            >
              manage content <AiOutlineCaretDown />
              {isDropdownOpen && (
                <div className="w-fit h-fit bg-white shadow-sm shadow-black p-4 rounded-lg flex flex-col items-start gap-4 top-[2rem] left-0 absolute transition duration-500 ease-linear">
                  <Link href="/categories">categories</Link>
                  <Link href="/project">projects</Link>
                </div>
              )}
            </li>
            <li className="font-bold capitalize md:cursor-pointer">
              <Link href="/database">view Existing database</Link>
            </li>
            <button className="w-40 h-[2.5rem] grid place-items-center py-2 px-4 capitalize text-white bg-blue-600 rounded-lg hover:text-black hover:bg-transparent hover:border hover:border-blue-600 hover:transition-all hover:duration-500 hover:ease-in-out">
              logout
            </button>
          </ul>
        </div>

        {/* buttons */}
        <button
          className="bg-transparent top-8 right-12 absolute md:hidden"
          onClick={handleOpen}
        >
          {isOpen ? (
            <AiOutlineClose style={{ fontSize: '1.5rem' }} />
          ) : (
            <AiOutlineMenu style={{ fontSize: '1.5rem' }} />
          )}
        </button>
      </div>
      {/* mobile nav */}
      <div
        className={`top-[5.25rem] absolute w-full h-screen bg-white pl-8 duration-500 md:hidden ${
          isOpen ? 'left-0' : 'left-[100%]'
        }`}
      >
        <ul className="md:hidden flex flex-col items-start gap-12 h-16">
          <li
            className="relative flex items-center gap-2 capitalize md:cursor-pointer"
            onClick={handleDropdownToggle}
          >
            manage content <AiOutlineCaretDown />
            {isDropdownOpen && (
              <div className="w-36 h-fit bg-white shadow-sm shadow-black py-12 pl-2 rounded-lg flex flex-col items-start gap-4 top-[2rem] left-0 absolute transition duration-500 ease-linear">
                <Link href="/categories">categories</Link>
                <Link href="/project">projects</Link>
              </div>
            )}
          </li>
          <li className="font-bold capitalize md:cursor-pointer">
            <Link href="/database">view Existing database</Link>
          </li>
          <button className="w-40 h-[2.5rem] grid place-items-center py-2 px-4 capitalize text-white bg-cyan-600 rounded-lg hover:text-black hover:bg-transparent hover:border hover:border-cyan-600 hover:transition-all hover:duration-500 hover:ease-in-out">
            logout
          </button>
        </ul>
      </div>
    </nav>
  )
}
