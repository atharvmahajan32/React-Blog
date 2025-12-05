"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  showNav?: boolean
}

export function Header({ showNav = true }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    // { href: "/", label: "Contact" },
  ]

  return (
    <header>
      {/* Fixed header container */}
      <div className="bg-[#F5F5F0]/80 backdrop-blur-md border-b border-[#E5E5E0] fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          {/* Logo - collapses when scrolled */}
          <div 
            className={cn(
              "text-center overflow-hidden transition-all duration-500 ease-in-out",
              isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-24 py-6 opacity-100"
            )}
          >
            <Link 
              href="/home" 
              className="group inline-block transition-all duration-300 hover:scale-105"
            >
              <Image 
                src="/favicon.png" 
                alt="Atharv's Weekly Journal" 
                width={60} 
                height={60}
                className="mx-auto"
                priority
              />
            </Link>
          </div>

          {/* Horizontal line above nav */}
          <div className={cn(
            "h-px bg-[#E5E5E0] mx-auto transition-all duration-500",
            isScrolled ? "w-32 mt-1 bg-[#8e8e88]" : "w-24"
          )} />

          {/* Navigation */}
          {showNav && (
            <nav className={cn(
              "flex justify-center transition-all duration-500",
              isScrolled ? "gap-14 py-5" : "gap-10 py-4"
            )}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative font-sans text-black/80 hover:text-black transition-all duration-500 py-1",
                    isScrolled ? "text-base" : "text-sm",
                    pathname === link.href && "text-black font-medium",
                  )}
                >
                  {link.label}
                  {/* Underline - active or hover */}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-black rounded-full transition-all duration-300",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Spacer to push content below fixed header */}
      <div className={cn(
        "transition-all duration-500",
        isScrolled ? "h-[62px]" : "h-[149px]"
      )} />
    </header>
  )
}
