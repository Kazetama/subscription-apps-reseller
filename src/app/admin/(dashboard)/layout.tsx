'use client'

import React from 'react'
import { AdminGuard } from '@/components/admin/AdminGuard'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      {(admin) => (
        <div className="min-h-screen flex bg-background text-foreground transition-colors">
          {/* Sisi Kiri: Desktop Sidebar */}
          <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0 sticky top-0 h-screen">
            <AdminSidebar admin={admin} />
          </aside>

          {/* Sisi Kanan: Header & Main Content Terpusat */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            <AdminHeader admin={admin} />

            <div className="flex-1 flex justify-center w-full">
              <main className="w-full max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      )}
    </AdminGuard>
  )
}

