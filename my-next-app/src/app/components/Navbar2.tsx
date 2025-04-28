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
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-sm md:hidden focus:outline-none focus:ring-2 focus:ring-blue-800 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Apri il menu</span>
            {/* Animated Lines */}
            <div className="relative w-6 h-5">
              <span
                className={`absolute h-0.5 w-6 bg-blue-800 left-0 -top-0.5 transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-2.5' : ''
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-blue-800 left-0 top-2 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-blue-800 left-0 bottom-0 transition-all duration-300 ${
                  isOpen ? '-rotate-45 bottom-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`w-full md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
          id="navbar-default"
        >
          <ul className="font-semibold flex flex-col p-4 border border-blue-700 rounded-lg bg-white space-y-2">
            {navLinks.map(({ label, href }, index) => {
              const isActive = pathname === href
              return (
                <li
                  key={href}
                  style={{
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: isOpen ? `${index * 300}ms` : '0ms',
                    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <Link
                    href={href}
                    className={`relative block py-2 px-3 transition-all duration-200 ${
                      isActive ? 'text-blue-800' : 'text-gray-800 hover:text-blue-800'
                    } group`}
                  >
                    {label}
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 bg-blue-800 transition-all duration-300 ${
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