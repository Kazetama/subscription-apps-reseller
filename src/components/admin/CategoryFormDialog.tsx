'use client'

import React, { useState, useEffect } from 'react'
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
import { Category } from '@/types/store'
import { useCatalogStore } from '@/lib/catalog-store'

interface CategoryFormDialogProps {
  isOpen: boolean
  onClose: () => void
  categoryToEdit?: Category | null
}

export function CategoryFormDialog({
  isOpen,
  onClose,
  categoryToEdit,
}: CategoryFormDialogProps) {
  const addCategory = useCatalogStore((state) => state.addCategory)
  const updateCategory = useCatalogStore((state) => state.updateCategory)

  const isEditing = !!categoryToEdit

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name)
      setDescription(categoryToEdit.description || '')
    } else {
      setName('')
      setDescription('')
    }
    setError('')
  }, [categoryToEdit, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Nama kategori tidak boleh kosong')
      return
    }

    if (isEditing && categoryToEdit) {
      updateCategory(categoryToEdit.id, {
        name: name.trim(),
        description: description.trim() || undefined,
      })
    } else {
      addCategory({
        name: name.trim(),
        description: description.trim() || undefined,
      })
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-black tracking-tight text-foreground">
            {isEditing ? 'Edit Kategori Layanan' : 'Tambah Kategori Baru'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {isEditing
              ? 'Perbarui nama atau deskripsi kategori. Perubahan akan otomatis terhubung ke produk terkait.'
              : 'Tambahkan kategori baru untuk mengelompokkan produk di katalog toko.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Category Name */}
          <div className="space-y-1.5">
            <Label htmlFor="category-name" className="text-xs font-bold text-foreground">
              Nama Kategori <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="category-name"
              type="text"
              placeholder="Contoh: Produktivitas & Kantor"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              className="h-9 text-xs rounded-xl bg-background border-border"
              autoFocus
            />
            {error && <p className="text-[11px] font-semibold text-rose-500">{error}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="category-desc" className="text-xs font-bold text-foreground">
              Deskripsi Singkat <span className="text-[10px] text-muted-foreground font-normal">(opsional)</span>
            </Label>
            <Input
              id="category-desc"
              type="text"
              placeholder="Contoh: Akun aplikasi untuk kerja dan efisiensi harian"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-9 text-xs rounded-xl bg-background border-border"
            />
          </div>

          <DialogFooter className="pt-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl border-border text-xs cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs cursor-pointer"
            >
              {isEditing ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

