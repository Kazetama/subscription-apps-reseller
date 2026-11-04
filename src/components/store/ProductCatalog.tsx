'use client'

import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, PackageOpen, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductCard } from './ProductCard'
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mock-data'
import { Product, ProductPackage } from '@/types/store'

interface ProductCatalogProps {
  onQuickOrder?: (product: Product, pkg: ProductPackage) => void
}

export function ProductCatalog({ onQuickOrder }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured')

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'cat-all' && product.categoryId !== selectedCategory) {
        return false
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const matchName = product.name.toLowerCase().includes(query)
        const matchDesc = product.description.toLowerCase().includes(query)
        const matchTagline = product.tagline.toLowerCase().includes(query)
        const matchCategory = product.categoryName?.toLowerCase().includes(query)
        if (!matchName && !matchDesc && !matchTagline && !matchCategory) {
          return false
        }
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const minA = Math.min(...a.packages.map((p) => p.price))
        const minB = Math.min(...b.packages.map((p) => p.price))
        return minA - minB
      }
      if (sortBy === 'price-desc') {
        const minA = Math.min(...a.packages.map((p) => p.price))
        const minB = Math.min(...b.packages.map((p) => p.price))
        return minB - minA
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    })
  }, [selectedCategory, searchQuery, sortBy])

  const handleResetFilters = () => {
    setSelectedCategory('cat-all')
    setSearchQuery('')
    setSortBy('featured')
  }

  return (
    <section id="katalog" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Katalog
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Pilih Layanan Digital
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Semua produk bergaransi penuh. Pilih paket yang diinginkan dan lakukan konfirmasi cepat via WhatsApp.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MOCK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-[13px] font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari aplikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-lg border-border bg-card text-foreground text-sm font-medium focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card px-3 py-2 rounded-lg border border-border">
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[13px] font-medium text-foreground border-none focus:outline-hidden cursor-pointer"
              >
                <option value="featured" className="bg-card text-foreground">Populer</option>
                <option value="price-asc" className="bg-card text-foreground">Termurah</option>
                <option value="price-desc" className="bg-card text-foreground">Termahal</option>
                <option value="name" className="bg-card text-foreground">Nama A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickOrder={onQuickOrder}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4 max-w-sm mx-auto">
            <div className="size-12 rounded-xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
              <PackageOpen className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-foreground">
                Tidak Ditemukan
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Coba ubah kata kunci atau filter pencarian.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-lg text-[13px] font-medium gap-1.5 cursor-pointer border-border"
            >
              <RotateCcw className="size-3.5" />
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
