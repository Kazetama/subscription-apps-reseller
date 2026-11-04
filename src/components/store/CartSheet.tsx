'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { formatRupiah } from '@/types/store'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { CheckoutDialog } from './CheckoutDialog'

export function CartSheet() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, getSubtotal } =
    useCartStore()

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const subtotal = getSubtotal()

  const handleOpenCheckout = () => {
    setIsOpen(false)
    setIsCheckoutOpen(true)
  }

  const handleOrderSuccess = () => {
    clearCart()
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-background border-l border-border p-0 flex flex-col justify-between shadow-xl"
        >
          {/* Header */}
          <SheetHeader className="p-5 border-b border-border bg-card text-left">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-heading font-extrabold text-base text-foreground flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                  <ShoppingBag className="size-4" />
                </div>
                <span>Keranjang Belanja</span>
              </SheetTitle>
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                >
                  Kosongkan
                </Button>
              )}
            </div>
            <SheetDescription className="text-xs text-muted-foreground pt-1">
              {items.length > 0
                ? `${items.length} jenis paket langganan dipilih`
                : 'Belum ada aplikasi yang dimasukkan ke keranjang.'}
            </SheetDescription>
          </SheetHeader>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-card p-3.5 rounded-xl border border-border shadow-2xs hover:border-border/80 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative size-16 rounded-lg overflow-hidden bg-secondary shrink-0 border border-border">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-heading font-bold text-xs text-foreground line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-medium text-muted-foreground">
                        {item.package.name} ({item.package.durationValue} {item.package.durationUnit})
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-heading font-extrabold text-sm text-foreground">
                        {formatRupiah(item.package.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-secondary border border-border rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="size-6 flex items-center justify-center rounded-md hover:bg-background text-foreground transition-colors cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="size-6 flex items-center justify-center rounded-md hover:bg-background text-foreground transition-colors cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty Cart View */
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                <div className="size-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shadow-2xs">
                  <ShoppingBag className="size-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-base text-foreground">
                    Keranjang Masih Kosong
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    Pilih aplikasi favoritmu di katalog dan tentukan durasi langganan yang cocok.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border-border text-foreground font-semibold text-xs mt-2 cursor-pointer hover:bg-secondary"
                >
                  Mulai Jelajah Produk
                </Button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout Button */}
          {items.length > 0 && (
            <SheetFooter className="p-5 border-t border-border bg-card space-y-3.5">
              <div className="flex justify-between items-baseline w-full">
                <span className="text-xs font-semibold text-muted-foreground">Total Pembayaran:</span>
                <span className="font-heading font-extrabold text-2xl text-foreground">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <Button
                size="lg"
                onClick={handleOpenCheckout}
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm gap-2 shadow-sm cursor-pointer"
              >
                <span>Lanjut ke Pemesanan</span>
                <ArrowRight className="size-4" />
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items}
        onOrderSuccess={handleOrderSuccess}
      />
    </>
  )
}
