'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import { Product } from '@/types/store'
import { useCatalogStore } from '@/lib/catalog-store'

interface ProductFormDialogProps {
  isOpen: boolean
  onClose: () => void
  productToEdit?: Product | null
}

interface PackageDraft {
  name: string
  durationValue: number
  durationUnit: 'hari' | 'bulan' | 'tahun'
  price: number
}

export function ProductFormDialog({
  isOpen,
  onClose,
  productToEdit,
}: ProductFormDialogProps) {
  const allCategories = useCatalogStore((state) => state.categories)
  const categories = React.useMemo(() => allCategories.filter((c) => c.id !== 'cat-all'), [allCategories])
  const defaultCategoryId = categories[0]?.id || ''
  const addProduct = useCatalogStore((state) => state.addProduct)
  const updateProduct = useCatalogStore((state) => state.updateProduct)

  const isEditing = !!productToEdit

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [featuresText, setFeaturesText] = useState('')
  const [packages, setPackages] = useState<PackageDraft[]>([
    { name: '1 Bulan Privat', durationValue: 1, durationUnit: 'bulan', price: 25000 },
  ])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name)
      setCategoryId(productToEdit.categoryId)
      setTagline(productToEdit.tagline)
      setDescription(productToEdit.description)
      setImageUrl(productToEdit.imageUrl)
      setFeaturesText(productToEdit.features.join('\n'))
      setPackages(
        productToEdit.packages.map((pkg) => ({
          name: pkg.name,
          durationValue: pkg.durationValue,
          durationUnit: pkg.durationUnit,
          price: pkg.price,
        }))
      )
    } else {
      setName('')
      setCategoryId(defaultCategoryId)
      setTagline('')
      setDescription('')
      setImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80')
      setFeaturesText('Akses penuh fitur premium\nGaransi selama masa aktif\nBisa di HP, Laptop & Tablet')
      setPackages([
        { name: '1 Bulan', durationValue: 1, durationUnit: 'bulan', price: 30000 },
        { name: '3 Bulan', durationValue: 3, durationUnit: 'bulan', price: 80000 },
      ])
    }
    setErrors({})
  }, [productToEdit, isOpen, defaultCategoryId])

  const handleAddPackage = () => {
    setPackages((prev) => [
      ...prev,
      { name: 'Paket Baru', durationValue: 1, durationUnit: 'bulan', price: 25000 },
    ])
  }

  const handleRemovePackage = (index: number) => {
    if (packages.length <= 1) return
    setPackages((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleUpdatePackage = <K extends keyof PackageDraft>(
    index: number,
    key: K,
    value: PackageDraft[K]
  ) => {
    setPackages((prev) =>
      prev.map((pkg, idx) => (idx === index ? { ...pkg, [key]: value } : pkg))
    )
  }

  const handleValidate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Nama produk wajib diisi'
    if (!categoryId) errs.categoryId = 'Pilih kategori aplikasi'
    if (!tagline.trim()) errs.tagline = 'Tagline produk wajib diisi'
    if (packages.length === 0) errs.packages = 'Minimal harus ada 1 paket harga'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handleValidate()) return

    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0)

    if (isEditing && productToEdit) {
      updateProduct(productToEdit.id, {
        name: name.trim(),
        categoryId,
        tagline: tagline.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        features,
        packages: packages.map((pkg, idx) => ({
          id: `${productToEdit.id}-pkg-${idx + 1}`,
          productId: productToEdit.id,
          name: pkg.name,
          durationValue: pkg.durationValue,
          durationUnit: pkg.durationUnit,
          price: Number(pkg.price),
          stockQuantity: 99,
          lowStockThreshold: 5,
          isActive: true,
        })),
      })
    } else {
      addProduct({
        name: name.trim(),
        categoryId,
        tagline: tagline.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        features,
        packages: packages.map((p) => ({
          ...p,
          price: Number(p.price),
        })),
      })
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-card border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-3 border-b border-border text-left">
          <DialogTitle className="font-heading font-extrabold text-lg text-foreground">
            {isEditing ? 'Edit Produk Aplikasi' : 'Tambah Produk Aplikasi Baru'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Lengkapi rincian aplikasi dan pilihan paket langganan yang akan tampil di katalog toko.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Row 1: Nama & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <Label htmlFor="prod-name" className="text-xs font-bold text-foreground">
                Nama Aplikasi <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="prod-name"
                placeholder="Contoh: Canva Pro, Netflix 4K"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 rounded-lg border-border text-xs"
              />
              {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="prod-cat" className="text-xs font-bold text-foreground">
                Kategori Layanan <span className="text-rose-500">*</span>
              </Label>
              <select
                id="prod-cat"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-card text-foreground px-3 text-xs font-medium focus:outline-hidden"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-[11px] text-rose-500">{errors.categoryId}</p>}
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1 text-left">
            <Label htmlFor="prod-tagline" className="text-xs font-bold text-foreground">
              Tagline Singkat <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="prod-tagline"
              placeholder="Contoh: Desain grafis profesional tanpa batasan aset"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="h-9 rounded-lg border-border text-xs"
            />
            {errors.tagline && <p className="text-[11px] text-rose-500">{errors.tagline}</p>}
          </div>

          {/* Image URL & Thumbnail Preview */}
          <div className="space-y-1 text-left">
            <Label htmlFor="prod-image" className="text-xs font-bold text-foreground">
              URL Gambar Sampul
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                id="prod-image"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="h-9 rounded-lg border-border text-xs flex-1"
              />
              <div className="relative size-9 rounded-lg overflow-hidden bg-secondary shrink-0 border border-border">
                {imageUrl ? (
                  <Image src={imageUrl} alt="preview" fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="size-4" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-1 text-left">
            <Label htmlFor="prod-desc" className="text-xs font-bold text-foreground">
              Deskripsi Lengkap
            </Label>
            <textarea
              id="prod-desc"
              rows={2}
              placeholder="Jelaskan keunggulan dan spesifikasi akun..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-border bg-card text-foreground p-2.5 text-xs focus:outline-hidden"
            />
          </div>

          {/* Fitur Utama */}
          <div className="space-y-1 text-left">
            <Label htmlFor="prod-features" className="text-xs font-bold text-foreground">
              Fitur Keunggulan (1 baris per fitur)
            </Label>
            <textarea
              id="prod-features"
              rows={2}
              placeholder="100% Bergaransi&#10;Bebas Iklan&#10;Support HP & Laptop"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full rounded-lg border border-border bg-card text-foreground p-2.5 text-xs font-mono focus:outline-hidden"
            />
          </div>

          {/* Paket Durasi & Harga */}
          <div className="space-y-2 text-left pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground">
                Daftar Paket Durasi & Harga
              </Label>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleAddPackage}
                className="h-7 text-[11px] font-bold gap-1 rounded-md"
              >
                <Plus className="size-3" />
                <span>Tambah Paket</span>
              </Button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40 border border-border"
                >
                  <Input
                    placeholder="Nama Paket (misal: 1 Bulan Privat)"
                    value={pkg.name}
                    onChange={(e) => handleUpdatePackage(idx, 'name', e.target.value)}
                    className="h-8 text-xs flex-1 rounded-md border-border bg-card"
                  />
                  <div className="w-28 flex items-center gap-1">
                    <span className="text-[11px] text-muted-foreground font-semibold">Rp</span>
                    <Input
                      type="number"
                      placeholder="Harga"
                      value={pkg.price}
                      onChange={(e) => handleUpdatePackage(idx, 'price', Number(e.target.value) || 0)}
                      className="h-8 text-xs rounded-md border-border bg-card"
                    />
                  </div>
                  {packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="p-1 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.packages && <p className="text-[11px] text-rose-500">{errors.packages}</p>}
          </div>

          {/* Actions */}
          <DialogFooter className="pt-3 border-t border-border flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl border-border text-xs font-semibold"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold"
            >
              {isEditing ? 'Simpan Perubahan' : 'Terbitkan Produk'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
