'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CartItem, formatRupiah, OrderCustomerInfo } from '@/types/store'
import { createWhatsAppUrl, generateOrderNumber, generateWhatsAppMessage } from '@/lib/whatsapp'
import { MessageCircle, CheckCircle2, Copy, ExternalLink, ArrowRight } from 'lucide-react'

interface CheckoutDialogProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onOrderSuccess: () => void
}

export function CheckoutDialog({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}: CheckoutDialogProps) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  // Status setelah submit
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderNumber: string
    url: string
    message: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const totalAmount = items.reduce(
    (total, item) => total + item.package.price * item.quantity,
    0
  )

  const handleValidate = () => {
    const newErrors: { name?: string; phone?: string } = {}
    if (!customerName.trim()) {
      newErrors.name = 'Nama lengkap / panggilan wajib diisi'
    }
    if (!customerPhone.trim()) {
      newErrors.phone = 'Nomor WhatsApp aktif wajib diisi'
    } else if (customerPhone.trim().length < 9) {
      newErrors.phone = 'Nomor WhatsApp tidak valid (minimal 9 digit)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handleValidate() || items.length === 0) return

    const orderNumber = generateOrderNumber()
    const customer: OrderCustomerInfo = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerNotes: customerNotes.trim(),
    }

    const payload = {
      orderNumber,
      customer,
      items,
      totalAmount,
    }

    const waUrl = createWhatsAppUrl(payload)
    const waMessage = generateWhatsAppMessage(payload)

    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank')

    // Tampilkan konfirmasi
    setSubmittedOrder({
      orderNumber,
      url: waUrl,
      message: waMessage,
    })

    onOrderSuccess()
  }

  const handleCopyMessage = () => {
    if (!submittedOrder) return
    navigator.clipboard.writeText(submittedOrder.message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCloseDialog = () => {
    setSubmittedOrder(null)
    setCustomerName('')
    setCustomerPhone('')
    setCustomerNotes('')
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
      <DialogContent className="sm:max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl text-foreground">
        {!submittedOrder ? (
          <div>
            <DialogHeader className="space-y-1.5 text-left pb-4 border-b border-border">
              <DialogTitle className="font-heading font-extrabold text-lg text-foreground">
                Formulir Pemesanan
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Isi form di bawah. Format pesanan otomatis dibuatkan dan diteruskan ke WhatsApp resmi toko.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {/* Item Summary Box */}
              <div className="bg-secondary/50 p-3.5 rounded-xl border border-border space-y-2 max-h-40 overflow-y-auto">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Rincian Pesanan ({items.length} Item):
                </div>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground truncate max-w-[220px]">
                      {item.product.name} ({item.package.name}) x{item.quantity}
                    </span>
                    <span className="font-bold text-foreground">
                      {formatRupiah(item.package.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex justify-between items-baseline font-bold text-sm">
                  <span className="text-muted-foreground">Total Bayar:</span>
                  <span className="text-foreground font-extrabold text-base">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Input: Nama */}
              <div className="space-y-1 text-left">
                <Label htmlFor="name" className="text-xs font-semibold text-foreground">
                  Nama Pemesan <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="rounded-lg h-9.5 text-xs border-border bg-card text-foreground"
                />
                {errors.name && (
                  <p className="text-[11px] font-medium text-rose-500">{errors.name}</p>
                )}
              </div>

              {/* Input: WhatsApp */}
              <div className="space-y-1 text-left">
                <Label htmlFor="phone" className="text-xs font-semibold text-foreground">
                  Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="rounded-lg h-9.5 text-xs border-border bg-card text-foreground"
                />
                {errors.phone && (
                  <p className="text-[11px] font-medium text-rose-500">{errors.phone}</p>
                )}
              </div>

              {/* Input: Catatan */}
              <div className="space-y-1 text-left">
                <Label htmlFor="notes" className="text-xs font-semibold text-foreground">
                  Catatan Tambahan (Opsional)
                </Label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="Contoh: Email invite Canva / YouTube..."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="rounded-lg h-9.5 text-xs border-border bg-card text-foreground"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  <span>Kirim Pesanan ke WhatsApp</span>
                  <ArrowRight className="size-4 ml-auto" />
                </Button>
                <p className="text-[11px] text-center text-muted-foreground mt-2">
                  Format chat WhatsApp akan terbuka otomatis dengan rincian pesanan.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="text-center py-4 space-y-4">
            <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="size-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-lg text-foreground">
                Pesanan Berhasil Disiapkan
              </h3>
              <p className="text-xs font-mono font-semibold text-foreground bg-secondary py-1 px-2.5 rounded-md inline-block border border-border">
                No. Order: {submittedOrder.orderNumber}
              </p>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto pt-1 leading-relaxed">
                Silakan lanjutkan konfirmasi pembayaran di WhatsApp untuk aktivasi akun kilat.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={submittedOrder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block"
              >
                <Button
                  size="lg"
                  className="w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-2 cursor-pointer"
                >
                  <ExternalLink className="size-3.5" />
                  <span>Buka Ulang Chat WhatsApp</span>
                </Button>
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyMessage}
                className="w-full h-9.5 rounded-xl border-border text-xs font-medium gap-2 cursor-pointer hover:bg-secondary"
              >
                <Copy className="size-3.5" />
                <span>{copied ? 'Teks Tersalin! ✓' : 'Salin Format Pesanan'}</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseDialog}
              className="text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Tutup & Selesai
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
