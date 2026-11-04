'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Check, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product, ProductPackage, formatRupiah } from '@/types/store'
import { useCartStore } from '@/lib/cart-store'

interface ProductCardProps {
  product: Product
  onQuickOrder?: (product: Product, pkg: ProductPackage) => void
}

export function ProductCard({ product, onQuickOrder }: ProductCardProps) {
  const [selectedPackage, setSelectedPackage] = useState<ProductPackage>(
    product.packages[0] || null
  )

  const addItem = useCartStore((state) => state.addItem)
  const [addedToast, setAddedToast] = useState(false)

  const handleAddToCart = () => {
    if (!selectedPackage) return
    addItem(product, selectedPackage, 1)
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedPackage) return
    if (onQuickOrder) {
      onQuickOrder(product, selectedPackage)
    } else {
      addItem(product, selectedPackage, 1)
      useCartStore.getState().setIsOpen(true)
    }
  }

  return (
    <div className="group flex flex-col bg-card rounded-xl border border-border hover:border-border/80 transition-all duration-300 overflow-hidden hover:shadow-md">
      {/* Image */}
      <div className="relative h-40 w-full bg-secondary overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/90 backdrop-blur-sm text-[10px] font-bold text-foreground uppercase tracking-wider shadow-2xs border border-border/40">
          {product.categoryName}
        </span>

        {/* Product Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-base text-white drop-shadow-sm">
            {product.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.tagline || product.description}
        </p>

        {/* Package Selector */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Pilih Paket
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {product.packages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-2xs'
                      : 'border-border text-foreground hover:border-primary/50 bg-secondary/50 hover:bg-secondary'
                  }`}
                >
                  {pkg.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground block">
              Harga
            </span>
            <span className="font-extrabold text-xl text-foreground tracking-tight">
              {selectedPackage ? formatRupiah(selectedPackage.price) : '-'}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-1 text-xs text-muted-foreground">
          {product.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              <Check className="size-3 text-emerald-500 shrink-0" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddToCart}
          className="h-9 text-xs font-medium rounded-lg border-border hover:bg-secondary text-foreground gap-1.5 cursor-pointer"
        >
          <ShoppingBag className="size-3.5" />
          {addedToast ? 'Ditambah ✓' : 'Keranjang'}
        </Button>

        <Button
          size="sm"
          onClick={handleBuyNow}
          className="h-9 text-xs font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 cursor-pointer"
        >
          Pesan
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
