'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  ADMIN_CREDENTIALS,
  getAdminSession,
  setAdminSession,
  validateAdminLogin,
} from '@/lib/admin-auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Jika sudah ada sesi aktif, otomatis redirect ke dashboard admin
  useEffect(() => {
    const session = getAdminSession()
    if (session) {
      router.replace('/admin')
    } else {
      setCheckingAuth(false)
    }
  }, [router])

  const handleQuickFill = () => {
    setEmail(ADMIN_CREDENTIALS.email)
    setPassword(ADMIN_CREDENTIALS.password)
    setError(null)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Simulasi delay singkat agar animasi terasa responsif & interaktif
    setTimeout(() => {
      const validation = validateAdminLogin(email, password)

      if (validation.success) {
        setAdminSession({
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role,
          loginAt: new Date().toISOString(),
        })
        router.push('/admin')
      } else {
        setError(validation.error || 'Terjadi kesalahan login')
        setLoading(false)
      }
    }, 400)
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-muted-foreground font-medium">Memeriksa sesi admin...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 -z-10 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Top Bar with Brand & Theme Toggle */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs">
            <Lock className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight">
              Skies <span className="font-medium text-muted-foreground">by</span> Nas
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Internal Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Halaman Toko</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-4">
          <Card className="border-border bg-card shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1.5 pb-4 text-center">
              <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-primary mb-1 shadow-2xs">
                <ShieldCheck className="size-6" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Masuk ke Panel Admin
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Gunakan kredensial pengelola untuk mengelola katalog produk dan kategori layanan.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {/* Error Banner */}
                {error && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="size-4 shrink-0" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-1.5 text-left">
                  <Label htmlFor="email" className="text-xs font-bold text-foreground">
                    Email Pengelola
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="admin@skiesbynas.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-10 rounded-xl border-border bg-background text-sm font-medium focus-visible:ring-primary"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-bold text-foreground">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-10 rounded-xl border-border bg-background text-sm font-medium focus-visible:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Demo Helper Pill */}
                <div className="p-3 rounded-xl bg-secondary/70 border border-border/80 flex items-center justify-between gap-2">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Akun Demo (Dummy)
                    </span>
                    <p className="text-xs font-mono text-foreground font-semibold truncate max-w-[210px] sm:max-w-none">
                      admin@skiesbynas.com • admin123
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={handleQuickFill}
                    className="text-[11px] font-bold h-7 rounded-lg border-border hover:bg-background cursor-pointer shrink-0"
                  >
                    Isi Otomatis
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm gap-2 cursor-pointer shadow-sm transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Memverifikasi...</span>
                    </span>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <p className="text-center text-[11px] text-muted-foreground">
            Halaman ini khusus pengelola toko Skies by Nas.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-muted-foreground border-t border-border/40">
        © 2026 Skies by Nas. All rights reserved.
      </footer>
    </div>
  )
}

