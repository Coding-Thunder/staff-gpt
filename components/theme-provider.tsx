"use client"

import type * as React from "react"

// This component is now replaced by next-themes in the provider.tsx
// Keeping it for reference or future custom logic if needed
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
