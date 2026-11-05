'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  Store,
  ExternalLink,
  LogOut,
  X,
  User,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { clearAdminSession, AdminUser } from '@/lib/admin-auth'
import { useCatalogStore } from '@/lib/catalog-store'

interface AdminSidebarProps {
  admin: AdminUser
  onItemClick?: () => void
  onClose?: () => void
}

export function AdminSidebar({ admin, onItemClick, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const products = useCatalogStore((state) => state.products)
  const categories = useCatalogStore((state) => state.categories)
  const customCategories = categories.filter((c) => c.id !== 'cat-all')

  const handleLogout = () => {
    clearAdminSession()
    router.replace('/admin/login')
  }

  const navItems = [
    {
      href: '/admin',
      label: 'Ringkasan',
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      href: '/admin/products',
      label: 'Katalog Produk',
      icon: Package,
      badge: products.length.toString(),
      exact: false,
    },
    {
      href: '/admin/categories',
      label: 'Kategori Layanan',
      icon: Layers,
      badge: customCategories.length.toString(),
      exact: false,
    },
    {
      href: '/admin/settings',
      label: 'Pengaturan Toko',
      icon: Settings,
      badge: null,
      exact: false,
    },
  ]

  const isLinkActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname.startsWith(item.href)
  }

  return (
    <div className="flex flex-col h-full justify-between bg-card select-none">
      {/* Top Header & Navigation */}
      <div>
        {/* Brand Bar — Clean typography without square S box */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight leading-tight text-foreground">
              Skies <span className="font-medium text-muted-foreground">by</span> Nas
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Badge variant="outline" className="text-[10px] border-border text-muted-foreground font-bold px-1.5 py-0.5">
              v1.0
            </Badge>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
                aria-label="Tutup menu"
                title="Tutup menu"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Menu Utama
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isLinkActive(item)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      active
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Quick Links */}
        <div className="px-3 pt-2">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Akses Cepat
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Store className="size-4 text-emerald-500" />
              <span>Lihat Toko Publik</span>
            </div>
            <ExternalLink className="size-3 opacity-60" />
          </Link>
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-border space-y-3 bg-secondary/30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 truncate">
            <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <User className="size-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-foreground truncate">
                {admin.name}
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                {admin.email}
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full h-8.5 rounded-lg border-border text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-1.5 cursor-pointer justify-center"
        >
          <LogOut className="size-3.5" />
          <span>Keluar Akun</span>
        </Button>
      </div>
    </div>
  )
}
