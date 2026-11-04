'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/store/Navbar'
import { Hero } from '@/components/store/Hero'
import { ProductCatalog } from '@/components/store/ProductCatalog'
import { HowToOrder } from '@/components/store/HowToOrder'
import { FAQ } from '@/components/store/FAQ'
import { Footer } from '@/components/store/Footer'
import { CartSheet } from '@/components/store/CartSheet'
import { CheckoutDialog } from '@/components/store/CheckoutDialog'
import { Product, ProductPackage, CartItem } from '@/types/store'

export default function HomePage() {
  const [quickOrderItem, setQuickOrderItem] = useState<CartItem | null>(null)
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false)

  const handleQuickOrder = (product: Product, pkg: ProductPackage) => {
    setQuickOrderItem({
      id: `${product.id}-${pkg.id}`,
      product,
      package: pkg,
      quantity: 1,
    })
    setIsQuickOrderOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <Hero onQuickOrder={handleQuickOrder} />
        <ProductCatalog onQuickOrder={handleQuickOrder} />
        <HowToOrder />
        <FAQ />
      </main>

      <Footer />
      <CartSheet />

      {quickOrderItem && (
        <CheckoutDialog
          isOpen={isQuickOrderOpen}
          onClose={() => {
            setIsQuickOrderOpen(false)
            setQuickOrderItem(null)
          }}
          items={[quickOrderItem]}
          onOrderSuccess={() => {}}
        />
      )}
    </div>
  )
}
