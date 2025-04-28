'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setAtTop(currentScroll < 50)

      if (currentScroll > lastScrollY) {
        setShow(false)
      } else {
        setShow(true)
      }
      setLastScrollY(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Chi sono', href: '/chi-sono' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${atTop ? "bg-transparent" : "bg-blue-950 shadow-md"}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/img/logo_b.png"
            width={256}
            height={256}
            alt="Logo"
            className="w-32 min-[450px]:w-42 sm:w-48  lg:w-52 lg:pl-3 cursor-default select-none"
          />
        </Link>

        {/* Desktop Nav + CTA + Toggle */}
        <div className="flex items-center gap-x-4 min-[450px]:gap-x-8 ml-auto pr-2 min-[450px]:pr-8 font-titolo3 uppercase">
          {/* Desktop Navigation */}
          <div className={`hidden md:block`}>
            <ul className="font-semibold flex flex-row space-x-8">
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative block py-2 px-2 transition-all duration-200 ${
                        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      } group`}
                    >
                      {label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <button onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Ciao, vorrei richiedere una consulenza. Potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }} className="px-1 sm:px-3 lg:ml-3 py-3 w-fit  font-semibold  rounded-sm shadow border-2 border-white text-white hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
            CONTATTAMI
          </button>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-sm md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Apri il menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`} id="navbar-default">
          <ul className="font-semibold flex flex-col p-4 border border-gray-700 rounded-lg bg-gray-800">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative block py-2 px-3 transition-all duration-200 ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    } group`}
                  >
                    {label}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
