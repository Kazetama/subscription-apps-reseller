'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCartStore } from '@/lib/cart-store'
import { STORE_WHATSAPP_NUMBER } from '@/lib/mock-data'

const NAV_LINKS = [
  { href: '#katalog', label: 'Katalog Produk' },
  { href: '#cara-order', label: 'Cara Order' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const setIsOpen = useCartStore((state) => state.setIsOpen)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand — Skies by Nas (Tidak disingkat, pakai By) */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-xl tracking-tight text-foreground group-hover:opacity-90 transition-opacity">
            Skies <span className="font-medium text-muted-foreground">by</span> Nas
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
            Reseller
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/70 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Interactive Dark Mode / Light / System Toggle */}
          <ThemeToggle />

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Buka Keranjang"
            className="relative flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-foreground rounded-lg hover:bg-secondary border border-transparent hover:border-border transition-all cursor-pointer h-8"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {mounted && totalItems > 0 && (
              <Badge className="h-4.5 min-w-4.5 px-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center p-0">
                {totalItems}
              </Badge>
            )}
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Halo Skies by Nas, saya ingin menanyakan paket langganan aplikasi premium.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs rounded-lg h-8.5 px-3.5 gap-1.5 cursor-pointer transition-all shadow-xs"
            >
              <MessageCircle className="size-3.5 text-emerald-500" />
              <span>WhatsApp</span>
              <ArrowUpRight className="size-3 opacity-60" />
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="md:hidden p-1.5 text-foreground rounded-lg hover:bg-secondary transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-3 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs"
            >
              <MessageCircle className="size-4 text-emerald-400" />
              <span>Chat WhatsApp Resmi</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
