'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRupiah, Product } from '@/types/store'
import { useCatalogStore } from '@/lib/catalog-store'
import { ProductFormDialog } from './ProductFormDialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export function ProductsTable() {
  const products = useCatalogStore((state) => state.products)
  const toggleProductActive = useCatalogStore((state) => state.toggleProductActive)
  const deleteProduct = useCatalogStore((state) => state.deleteProduct)

  const [search, setSearch] = useState('')
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenAdd = () => {
    setSelectedProduct(null)
    setFormDialogOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product)
    setFormDialogOpen(true)
  }

  const handleOpenDelete = (product: Product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Top Search & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari nama, kategori, atau tagline produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8.5 h-9 rounded-xl border-border bg-card text-xs"
          />
        </div>

        <Button
          size="sm"
          onClick={handleOpenAdd}
          className="h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5 cursor-pointer shrink-0 shadow-xs"
        >
          <Plus className="size-3.5" />
          <span>Tambah Produk</span>
        </Button>
      </div>

      {/* Main Table */}
      <Card className="border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Paket Varian</th>
                <th className="py-3 px-4">Rentang Harga</th>
                <th className="py-3 px-4">Status Toko</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    <Package className="size-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">Tidak ada produk ditemukan</p>
                    <p className="text-[11px] text-muted-foreground">
                      Coba kata kunci lain atau tambahkan produk baru ke katalog.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const prices = p.packages.length > 0 ? p.packages.map((pkg) => pkg.price) : [0]
                  const minPrice = Math.min(...prices)
                  const maxPrice = Math.max(...prices)

                  return (
                    <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 rounded-lg overflow-hidden bg-secondary shrink-0 border border-border">
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <div className="font-bold text-foreground text-xs">{p.name}</div>
                            <div className="text-muted-foreground text-[11px] line-clamp-1 max-w-xs">
                              {p.tagline}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="outline" className="border-border text-[10px] font-semibold">
                          {p.categoryName || 'Umum'}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-foreground">
                        {p.packages.length} varian durasi
                      </td>
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {minPrice === maxPrice
                          ? formatRupiah(minPrice)
                          : `${formatRupiah(minPrice)} – ${formatRupiah(maxPrice)}`}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleProductActive(p.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                            p.isActive
                              ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                              : 'bg-zinc-500/15 text-zinc-500 border border-zinc-500/30'
                          }`}
                          title={p.isActive ? 'Klik untuk sembunyikan dari toko' : 'Klik untuk tampilkan di toko'}
                        >
                          {p.isActive ? (
                            <>
                              <Eye className="size-3" />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="size-3" />
                              <span>Sembunyi</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(p)}
                            className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                            title="Edit Produk"
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDelete(p)}
                            className="size-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Product Form Dialog (Add / Edit) */}
      <ProductFormDialog
        isOpen={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        productToEdit={selectedProduct}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={(open) => !open && setDeleteDialogOpen(false)}>
        <DialogContent className="sm:max-w-[420px] bg-card border-border">
          <DialogHeader>
            <div className="size-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mb-2">
              <AlertCircle className="size-5" />
            </div>
            <DialogTitle className="text-base font-bold text-foreground">
              Hapus Produk &quot;{productToDelete?.name}&quot;?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Produk beserta seluruh paket durasinya akan dihapus dari katalog toko secara permanen. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDeleteDialogOpen(false)}
              className="rounded-xl border-border text-xs cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              onClick={handleConfirmDelete}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
            >
              Ya, Hapus Produk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
