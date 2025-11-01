import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Provider } from "@/components/provider"
import "./globals.css"

// Fonts (closest substitutes for Geist and Geist Mono)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })

export const metadata: Metadata = {
  title: "StaffGPT - AI Employee Marketplace",
  description: "Hire AI Employees, not tools",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png", // make sure favicon.png is in public folder
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  )
}
