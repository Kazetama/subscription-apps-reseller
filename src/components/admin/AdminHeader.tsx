'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { AdminSidebar } from './AdminSidebar'
import { AdminUser } from '@/lib/admin-auth'

interface AdminHeaderProps {
  admin: AdminUser
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Ringkasan Toko'
    if (pathname.startsWith('/admin/products')) return 'Katalog Produk'
    if (pathname.startsWith('/admin/categories')) return 'Kategori Layanan'
    if (pathname.startsWith('/admin/settings')) return 'Pengaturan Toko'
    return 'Dashboard'
  }

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <>
      {/* Desktop Top Breadcrumb & Status Bar */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Admin Portal</span>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <span className="font-bold text-foreground">{getPageTitle()}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Online</span>
          </div>
          <span className="text-xs text-muted-foreground">{currentDate}</span>
        </div>
      </div>

      {/* Mobile Top Bar — Clean typography without square S box */}
      <header className="md:hidden sticky top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur-md px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm tracking-tight text-foreground">
            Skies <span className="font-medium text-muted-foreground">by</span> Nas
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-border text-foreground hover:bg-secondary cursor-pointer transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200">
          <div className="w-72 bg-card h-full shadow-2xl relative flex flex-col animate-in slide-in-from-left duration-200">
            <AdminSidebar
              admin={admin}
              onItemClick={() => setMobileMenuOpen(false)}
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup menu overlay"
          />
        </div>
      )}
    </>
  )
}
