'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Bagaimana cara akun dikirimkan setelah order?',
    a: 'Setelah Anda mengirimkan pesanan via WhatsApp dan mengonfirmasi bukti transfer, admin kami akan langsung mengirimkan detail login akun (email & password privat) atau link undangan resmi (untuk Canva/YouTube Family) ke chat WhatsApp Anda dalam tempo 5-15 menit.',
  },
  {
    q: 'Apa perbedaan akun Privat dan Sharing?',
    a: 'Akun Privat berarti akun tersebut digunakan khusus oleh Anda sendiri (bisa atur profil dan PIN pribadi), sedangkan akun Sharing adalah akun resmi yang digunakan bersama beberapa anggota dengan profil terpisah berproteksi PIN. Seluruh akun dijamin 100% legal dan bergaransi.',
  },
  {
    q: 'Metode pembayaran apa saja yang diterima?',
    a: 'Kami menerima berbagai metode pembayaran: QRIS (bebas biaya admin, support semua bank & e-wallet), Transfer Bank (BCA, Mandiri, BRI, BNI), serta e-Wallet (GoPay, OVO, Dana, ShopeePay).',
  },
  {
    q: 'Bagaimana jika akun bermasalah sebelum masa aktif habis?',
    a: 'Semua produk memiliki jaminan Garansi Penuh selama masa langganan. Jika terjadi kendala login atau akses premium, cukup hubungi admin WhatsApp dan kami akan segera memperbaiki atau mengganti dengan akun baru.',
  },
  {
    q: 'Bisa perpanjang akun lama yang pernah dibeli di sini?',
    a: 'Bisa! Untuk sebagian besar aplikasi seperti Canva Pro, Spotify, dan YouTube, Anda bisa memperpanjang durasi menggunakan akun yang sama tanpa kehilangan histori playlist atau file desain.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Pertanyaan Umum
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-border bg-card shadow-xs'
                    : 'border-border/60 bg-card/60 hover:border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`font-medium text-sm transition-colors ${
                    isOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`size-6 rounded-md flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {isOpen ? (
                      <Minus className="size-3" />
                    ) : (
                      <Plus className="size-3" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
