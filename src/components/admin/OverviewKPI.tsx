'use client'

import React from 'react'
import { Package, Layers, CheckCircle2, SlidersHorizontal } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useCatalogStore } from '@/lib/catalog-store'

export function OverviewKPI() {
  const products = useCatalogStore((state) => state.products)
  const categories = useCatalogStore((state) => state.categories)

  const activeProducts = products.filter((p) => p.isActive).length
  const customCategories = categories.filter((c) => c.id !== 'cat-all').length
  const totalPackages = products.reduce((acc, p) => acc + (p.packages?.length || 0), 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Produk */}
      <Card className="border-border bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-bold uppercase tracking-wider">Total Produk</span>
          <Package className="size-4 text-primary" />
        </div>
        <div className="text-2xl font-black text-foreground">
          {products.length} <span className="text-sm font-semibold text-muted-foreground">Layanan</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Total katalog aplikasi premium
        </p>
      </Card>

      {/* Kategori */}
      <Card className="border-border bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-bold uppercase tracking-wider">Kategori</span>
          <Layers className="size-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-black text-foreground">
          {customCategories} <span className="text-sm font-semibold text-muted-foreground">Kategori</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Grup pengelompokan produk
        </p>
      </Card>

      {/* Layanan Aktif di Toko */}
      <Card className="border-border bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-bold uppercase tracking-wider">Tampil di Toko</span>
          <CheckCircle2 className="size-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-black text-foreground">
          {activeProducts} <span className="text-sm font-semibold text-muted-foreground">Aktif</span>
        </div>
        <p className="text-[11px] text-emerald-600 font-semibold">
          {products.length - activeProducts} produk disembunyikan
        </p>
      </Card>

      {/* Total Varian Paket */}
      <Card className="border-border bg-card p-4 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-bold uppercase tracking-wider">Varian Durasi</span>
          <SlidersHorizontal className="size-4 text-primary" />
        </div>
        <div className="text-2xl font-black text-foreground">
          {totalPackages} <span className="text-sm font-semibold text-muted-foreground">Paket</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Pilihan durasi & harga tersedia
        </p>
      </Card>
    </div>
  )
}
