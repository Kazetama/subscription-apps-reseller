import React from 'react'
import Link from 'next/link'
import { Package, Layers, ArrowRight, MessageSquareQuote } from 'lucide-react'
import { OverviewKPI } from '@/components/admin/OverviewKPI'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Ringkasan Toko — Admin Skies by Nas',
  description: 'Panel manajemen katalog produk dan kategori Skies by Nas',
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Selamat Datang, Admin Skies
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Kelola katalog produk aplikasi premium dan kategori layanan Skies by Nas.
        </p>
      </div>

      {/* KPI Cards */}
      <OverviewKPI />

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Products Card */}
        <Card className="p-5 border-border bg-card space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Package className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Manajemen Katalog Produk</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Tambah aplikasi baru, atur paket harga & durasi, ganti gambar, dan sembunyikan/tampilkan produk di katalog toko.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link href="/admin/products">
              <Button size="sm" className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer">
                <span>Kelola Produk</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Categories Card */}
        <Card className="p-5 border-border bg-card space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Layers className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Manajemen Kategori Layanan</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Kelola kelompok layanan seperti Desain, Streaming, Produktivitas, atau AI agar pelanggan mudah mencari aplikasi.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link href="/admin/categories">
              <Button variant="outline" size="sm" className="rounded-xl border-border text-xs font-bold gap-1.5 cursor-pointer">
                <span>Kelola Kategori</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Info Card: WhatsApp Order Handling Notice */}
      <Card className="p-4.5 border-border/80 bg-secondary/30 rounded-2xl flex items-start gap-3.5">
        <div className="size-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
          <MessageSquareQuote className="size-4" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-foreground">Alur Pesanan Pelanggan via WhatsApp</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Semua transaksi dan konfirmasi ketersediaan akun dilakukan langsung oleh pembeli ke WhatsApp resmi Skies by Nas. Panel admin ini difokuskan penuh untuk mengelola katalog, kategori, dan harga produk.
          </p>
        </div>
      </Card>
    </div>
  )
}
