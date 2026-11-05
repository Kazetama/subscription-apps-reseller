'use client'

import React, { useState } from 'react'
import { Plus, Search, Pencil, Trash2, Layers, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Category } from '@/types/store'
import { useCatalogStore } from '@/lib/catalog-store'
import { CategoryFormDialog } from './CategoryFormDialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export function CategoriesTable() {
  const categories = useCatalogStore((state) => state.categories)
  const products = useCatalogStore((state) => state.products)
  const deleteCategory = useCatalogStore((state) => state.deleteCategory)

  const [search, setSearch] = useState('')
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  // Filter out default 'cat-all' from editable list, or treat it as general
  const editableCategories = categories.filter((c) => c.id !== 'cat-all')

  const filteredCategories = editableCategories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  )

  const handleOpenAdd = () => {
    setSelectedCategory(null)
    setFormDialogOpen(true)
  }

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category)
    setFormDialogOpen(true)
  }

  const handleOpenDelete = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id)
      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari nama atau deskripsi kategori..."
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
          <span>Tambah Kategori</span>
        </Button>
      </div>

      {/* Main Table */}
      <Card className="border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Slug ID</th>
                <th className="py-3 px-4">Deskripsi</th>
                <th className="py-3 px-4">Jumlah Produk</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    <Layers className="size-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">Tidak ada kategori ditemukan</p>
                    <p className="text-[11px] text-muted-foreground">
                      Coba kata kunci lain atau tambahkan kategori baru.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => {
                  const productCount = products.filter((p) => p.categoryId === category.id).length

                  return (
                    <tr key={category.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        <div className="flex items-center gap-2">
                          <div className="size-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                            <Layers className="size-3.5" />
                          </div>
                          <span>{category.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground font-mono text-[11px]">
                        {category.slug}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground max-w-xs truncate">
                        {category.description || '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="outline" className="border-border text-[10px] font-semibold">
                          {productCount} Produk
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(category)}
                            className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                            title="Edit Kategori"
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDelete(category)}
                            className="size-7 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                            title="Hapus Kategori"
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

      {/* Form Dialog */}
      <CategoryFormDialog
        isOpen={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        categoryToEdit={selectedCategory}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={(open) => !open && setDeleteDialogOpen(false)}>
        <DialogContent className="sm:max-w-[420px] bg-card border-border">
          <DialogHeader>
            <div className="size-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mb-2">
              <AlertCircle className="size-5" />
            </div>
            <DialogTitle className="text-base font-bold text-foreground">
              Hapus Kategori &quot;{categoryToDelete?.name}&quot;?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Kategori ini akan dihapus dari daftar. Produk yang berada di kategori ini akan otomatis dialihkan ke kategori default. Tindakan ini tidak dapat dibatalkan.
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
              type="button"
              size="sm"
              onClick={handleConfirmDelete}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
            >
              Ya, Hapus Kategori
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

