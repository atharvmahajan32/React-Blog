import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { KeepAlive } from "@/components/keep-alive"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

import { Playfair_Display, Inter, Libre_Baskerville as V0_Font_Libre_Baskerville, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Lora as V0_Font_Lora } from 'next/font/google'

// Initialize fonts
const _libreBaskerville = V0_Font_Libre_Baskerville({ subsets: ['latin'], weight: ["400","700"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _lora = V0_Font_Lora({ subsets: ['latin'], weight: ["400","500","600","700"] })

// <CHANGE> Using Playfair Display for headings and Inter for body text
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Atharv's Weekly Journal",
  description: "Sharing personal insights from my educational journey.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </SmoothScrollProvider>
        <KeepAlive />
        <Analytics />
      </body>
    </html>
  )
}
