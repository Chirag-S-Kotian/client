"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme="dark" // Set the default theme to dark
      enableSystem={false} // Disable the system theme option
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
