import React from 'react'
import { CategoriesTable } from '@/components/admin/CategoriesTable'

export const metadata = {
  title: 'Kategori Layanan — Admin Skies by Nas',
  description: 'Kelola kategori produk dan pengelompokan layanan digital Skies by Nas',
}

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Kategori Layanan
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Kelola kategori untuk mengelompokkan katalog produk di halaman toko pelanggan.
        </p>
      </div>

      <CategoriesTable />
    </div>
  )
}

