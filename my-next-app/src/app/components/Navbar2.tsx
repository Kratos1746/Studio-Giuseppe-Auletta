'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react";

export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [atTop, setAtTop] = useState(true)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Rileva Safari
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setAtTop(currentScroll < 50)
      
      // Aggiungi una soglia minima per considerarlo uno scroll significativo
      if (Math.abs(currentScroll - lastScrollY) < 5) {
        return;
      }

      if (currentScroll > lastScrollY) {
        // Scrolling verso il basso
        setShow(false)
      } else {
        // Scrolling verso l'alto
        setShow(true)
        
        // Fix specifico per Safari mobile
        if (isSafari) {
          setTimeout(() => setShow(true), 10);
        }
      }

      setLastScrollY(currentScroll)
    }

    // Usa un throttle per limitare la frequenza di chiamata
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener)
    return () => window.removeEventListener("scroll", scrollListener)
  }, [lastScrollY, isSafari])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Chi sono', href: '/chi-sono' },
  ]

  const isScrolled = !atTop

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-blue-950 shadow" : "bg-transparent"}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2 sm:px-8">
        {/* Logo dinamico */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={isScrolled ? "/img/logo_b.png" : "/img/logo_bi.png"}
            width={256}
            height={256}
            alt="Logo"
            className="w-32 min-[450px]:w-42 sm:w-48 lg:w-52 lg:pl-3 cursor-default select-none"
          />
        </Link>

        {/* Desktop Nav + CTA + Toggle */}
        <div className="flex items-center gap-x-4 min-[450px]:gap-x-8 ml-auto pr-2 min-[450px]:pr-8 font-titolo3 uppercase">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="font-semibold flex flex-row space-x-8">
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative block py-2 px-2 transition-all duration-200 ${
                        isScrolled
                          ? isActive
                            ? 'text-white'
                            : 'text-gray-200 hover:text-white'
                          : isActive
                            ? 'text-blue-800'
                            : 'text-blue-950 hover:text-blue-800'
                      } group`}
                    >
                      {label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 ${
                          isScrolled
                            ? 'bg-white'
                            : 'bg-blue-800'
                        } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
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
        }}
            className={`px-1 sm:px-3 lg:ml-3 py-3 w-fit font-semibold rounded-sm shadow border-2 transition duration-300 ease-in-out
              ${isScrolled
                ? 'border-white text-white '
                : 'border-blue-800 text-blue-800 hover:text-blue-700'
              } hover:scale-105 cursor-pointer`}
          >
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
          <ul className={`font-semibold flex flex-col p-4 rounded-lg ${isScrolled ? 'bg-white' : 'bg-gray-800'} border`}>
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative block py-2 px-3 transition-all duration-200 ${
                      isScrolled
                        ? isActive
                          ? 'text-gray-800'
                          : 'text-gray-500 hover:text-gray-800'
                        : isActive
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                    } group`}
                  >
                    {label}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 ${
                        isScrolled ? 'bg-gray-800' : 'bg-white'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
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