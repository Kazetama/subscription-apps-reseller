'use client'

import * as React from 'react'
import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-24 rounded-lg border border-border bg-muted/30 animate-pulse" />
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Pilih tema tampilan"
      className="inline-flex items-center p-0.5 rounded-lg border border-border bg-secondary/60 backdrop-blur-xs"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Mode Terang"
        aria-label="Mode Terang"
        className={`p-1.5 rounded-md transition-all cursor-pointer ${
          theme === 'light'
            ? 'bg-background text-foreground shadow-2xs font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        title="Ikuti Tema Sistem (Default)"
        aria-label="Ikuti Tema Sistem"
        className={`p-1.5 rounded-md transition-all cursor-pointer ${
          theme === 'system'
            ? 'bg-background text-foreground shadow-2xs font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Laptop className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Mode Gelap"
        aria-label="Mode Gelap"
        className={`p-1.5 rounded-md transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-background text-foreground shadow-2xs font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  )
}

