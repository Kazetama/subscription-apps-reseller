'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Clock,
  BadgePercent,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STORE_WHATSAPP_NUMBER } from '@/lib/mock-data'
import { Product, ProductPackage } from '@/types/store'

interface HeroProps {
  onQuickOrder?: (product: Product, pkg: ProductPackage) => void
}

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Garansi Penuh',
    desc: 'Ganti akun jika bermasalah',
  },
  {
    icon: Clock,
    title: '5–15 Menit',
    desc: 'Aktivasi kilat via WhatsApp',
  },
  {
    icon: BadgePercent,
    title: 'Hemat s/d 70%',
    desc: 'Harga reseller terjangkau',
  },
  {
    icon: Zap,
    title: '100% Legal & Resmi',
    desc: 'Pilihan privat & sharing',
  },
]

export function Hero({ onQuickOrder }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-border">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -z-10 w-[500px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 -z-10 w-[450px] h-[350px] bg-gradient-to-bl from-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
          </span>
          <span>Reseller Resmi • Proses Cepat & Bergaransi</span>
          <Sparkles className="size-3 text-amber-500 ml-0.5" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.12]">
          Langganan Premium, <br />
          <span className="text-muted-foreground/70">
            Harga Reseller Bersahabat.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed">
          Nikmati Netflix UHD, Canva Pro, Spotify, YouTube hingga ChatGPT Plus dengan harga hemat hingga 70%. Garansi aktif penuh dan proses kilat 5–15 menit via WhatsApp.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <Link href="#katalog" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl h-11 px-6 gap-2 cursor-pointer transition-all shadow-sm"
            >
              <span>Eksplor Katalog</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>

          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Halo Skies by Nas, saya ingin tanya seputar langganan aplikasi premium.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-border bg-card hover:bg-secondary text-foreground font-semibold text-sm rounded-xl h-11 px-5 gap-2 cursor-pointer shadow-2xs"
            >
              <MessageCircle className="size-4 text-emerald-500" />
              <span>Chat WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Trust Highlights Grid */}
        <div id="keunggulan" className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {TRUST_FEATURES.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="p-3.5 rounded-xl bg-card border border-border hover:border-border/80 hover:shadow-2xs transition-all text-left space-y-1.5 group"
              >
                <div className="size-7 rounded-lg bg-secondary flex items-center justify-center text-foreground group-hover:bg-secondary/80 transition-colors">
                  <Icon className="size-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
