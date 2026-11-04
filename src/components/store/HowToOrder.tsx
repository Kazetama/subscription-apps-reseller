import React from 'react'
import { ShoppingCart, MessageSquare, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Pilih Aplikasi & Paket',
    description: 'Pilih aplikasi dan durasi langganan yang sesuai kebutuhanmu.',
    icon: ShoppingCart,
  },
  {
    step: '02',
    title: 'Konfirmasi via WhatsApp',
    description: 'Kirim format pesanan, admin akan langsung mengonfirmasi ke chat kamu.',
    icon: CheckCircle2,
  },
  {
    step: '03',
    title: 'Pemesanan Diproses',
    description: 'Detail pesanan otomatis tersusun rapi untuk diverifikasi admin.',
    icon: MessageSquare,
  },
  {
    step: '04',
    title: 'Bayar',
    description: 'Transfer via QRIS, BCA, Mandiri, BRI, atau e-wallet pilihanmu.',
    icon: CreditCard,
  },
  {
    step: '05',
    title: 'Akun Aktif',
    description: 'Detail akun dikirim admin dalam 5–15 menit dengan garansi penuh.',
    icon: ShieldCheck,
  },
]

export function HowToOrder() {
  return (
    <section id="cara-order" className="py-16 md:py-24 bg-card border-y border-border scroll-mt-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Cara Order
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            5 Langkah Mudah
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Tanpa registrasi berbelit. Pesanan langsung ditangani dan dikonfirmasi admin via WhatsApp.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STEPS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group relative p-5 rounded-xl bg-secondary/50 border border-border hover:border-border/80 hover:bg-card transition-all space-y-3"
              >
                {/* Step Number & Icon Row */}
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-2xl text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors tabular-nums">
                    {item.step}
                  </span>
                  <div className="size-9 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                    <Icon className="size-4 text-foreground" />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Connector line (desktop) */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-3 h-px bg-border" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
