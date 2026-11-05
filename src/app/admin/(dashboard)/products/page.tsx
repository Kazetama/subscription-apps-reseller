import React from 'react'
import { ProductsTable } from '@/components/admin/ProductsTable'

export const metadata = {
  title: 'Katalog Produk — Admin Skies by Nas',
}

export default function AdminProductsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Manajemen Katalog Produk
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Kelola ketersediaan dan visibilitas layanan aplikasi premium yang tampil di etalase toko.
        </p>
      </div>

      <ProductsTable />
    </div>
  )
}

