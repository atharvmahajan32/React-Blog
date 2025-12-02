"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  showNav?: boolean
}

export function Header({ showNav = true }: HeaderProps) {
  const pathname = usePathname()

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/", label: "Contact" },
  ]

  return (
    <header className="bg-[#F5F5F0]/80 backdrop-blur-md border-b border-[#E5E5E0] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        {/* Logo */}
        <div className="text-center mb-4">
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
        <div className="w-24 h-px bg-[#E5E5E0] mx-auto mb-4" />

        {/* Navigation */}
        {showNav && (
          <nav className="flex justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-sans text-black/80 hover:text-black transition-colors duration-300 py-1",
                  pathname === link.href && "text-black font-medium",
                )}
              >
                {link.label}
                {/* Animated underline */}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-black rounded-full transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
                {/* Hover underline */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black/50 rounded-full transition-all duration-300 hover:w-full" />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
