"use client"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/lib/store"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  )
}
