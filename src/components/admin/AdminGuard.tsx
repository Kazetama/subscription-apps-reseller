'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminSession, AdminUser } from '@/lib/admin-auth'

interface AdminGuardProps {
  children: (admin: AdminUser) => React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const session = getAdminSession()
    if (!session) {
      router.replace('/admin/login')
    } else {
      setAdmin(session)
      setChecking(false)
    }
  }, [router])

  if (checking || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-muted-foreground font-medium">Memverifikasi akses admin...</span>
        </div>
      </div>
    )
  }

  return <>{children(admin)}</>
}

