import React from 'react'
import Link from 'next/link'
import { MessageCircle, Clock, ShieldCheck } from 'lucide-react'
import { STORE_WHATSAPP_NUMBER } from '@/lib/mock-data'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-12 pb-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-foreground tracking-tight">
                Skies <span className="font-medium text-muted-foreground">by</span> Nas
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                Digital Store
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Platform reseller resmi langganan aplikasi digital premium terpercaya di Indonesia: Canva Pro, Netflix UHD, Spotify, YouTube, dan ChatGPT.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-emerald-500" />
                <span>Layanan: 08:00 – 23:00 WIB</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>100% Bergaransi</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#katalog" className="hover:text-foreground transition-colors">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="#cara-order" className="hover:text-foreground transition-colors">
                  Cara Order
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground transition-colors">
                  FAQ & Tanya Jawab
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">
              Kontak Kami
            </h4>
            <p className="text-sm text-muted-foreground">
              Butuh bantuan atau pertanyaan? Admin siap melayani melalui WhatsApp.
            </p>
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors"
            >
              <MessageCircle className="size-3.5 text-emerald-400" />
              <span>WhatsApp Official</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 Skies by Nas. All rights reserved.</p>
          <p>Reseller resmi langganan aplikasi premium & bergaransi penuh</p>
        </div>
      </div>
    </footer>
  )
}
