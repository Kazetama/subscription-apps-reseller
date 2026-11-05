import React from 'react'
import { StoreSettings } from '@/components/admin/StoreSettings'

export const metadata = {
  title: 'Pengaturan Toko — Admin Skies by Nas',
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Pengaturan Toko & Operasional
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Konfigurasi nomor kontak penerima pesanan dan jam operasional layanan pelanggan.
        </p>
      </div>

      <StoreSettings />
    </div>
  )
}

