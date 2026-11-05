'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { STORE_WHATSAPP_NUMBER } from '@/lib/mock-data'
import { useCatalogStore } from '@/lib/catalog-store'
import { RotateCcw, Check, Sparkles } from 'lucide-react'

export function StoreSettings() {
  const resetToDefaults = useCatalogStore((state) => state.resetToDefaults)
  const [waNumber, setWaNumber] = useState(STORE_WHATSAPP_NUMBER)
  const [operationalHours, setOperationalHours] = useState('08:00 – 23:00 WIB')
  const [saved, setSaved] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleResetCatalog = () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh produk dan kategori ke data awal bawaan?')) {
      resetToDefaults()
      setResetSuccess(true)
      setTimeout(() => setResetSuccess(false), 2500)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-base font-bold text-foreground">
            Pengaturan Kontak WhatsApp
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Format nomor tujuan WhatsApp untuk pemesanan otomatis dari formulir web.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-foreground block">
              Nomor WhatsApp Admin
            </span>
            <Input
              type="text"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              className="h-10 rounded-xl border-border bg-background text-xs font-mono"
            />
            <p className="text-[11px] text-muted-foreground">
              Gunakan format internasional tanpa simbol + (contoh: 6281234567890).
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-xs font-bold text-foreground block">
              Jam Operasional Layanan
            </span>
            <Input
              type="text"
              value={operationalHours}
              onChange={(e) => setOperationalHours(e.target.value)}
              className="h-10 rounded-xl border-border bg-background text-xs"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs cursor-pointer"
              onClick={handleSave}
            >
              {saved ? (
                <>
                  <Check className="size-3.5 mr-1 text-emerald-300" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </Button>
            {saved && (
              <span className="text-xs text-emerald-600 font-medium animate-in fade-in">
                Pengaturan kontak tersimpan di sesi browser.
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Catalog Reset Card */}
      <Card className="border-border bg-card shadow-xs">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span>Manajemen Data Dummy Katalog</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Kembalikan daftar kategori dan produk ke default bawaan awal jika Anda ingin membersihkan hasil uji coba CRUD.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground">Reset ke Data Default</div>
            <p className="text-[11px] text-muted-foreground">
              Menghapus modifikasi lokal dan memuat ulang 6 produk & 4 kategori default.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetCatalog}
            className="rounded-xl border-border text-xs font-bold gap-1.5 cursor-pointer shrink-0"
          >
            <RotateCcw className="size-3.5" />
            <span>{resetSuccess ? 'Katalog Direset!' : 'Reset Data'}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
