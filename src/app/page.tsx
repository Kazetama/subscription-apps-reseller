import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Database, Layers, ArrowRight } from "lucide-react"

export default function Home() {
  const isSupabaseConfigured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project")

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 md:p-12 flex flex-col items-center justify-center font-sans">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-2">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            Setup Berhasil ✨
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Subscription Apps Reseller
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Proyek Next.js Anda sudah dikonfigurasikan dengan shadcn/ui dan Supabase (SSR & Client).
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card shadcn/ui */}
          <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                    <Layers className="size-5" />
                  </div>
                  <CardTitle className="text-lg">shadcn/ui</CardTitle>
                </div>
                <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-300">
                  <CheckCircle2 className="size-3.5 mr-1" /> Terpasang
                </Badge>
              </div>
              <CardDescription>
                Komponen UI modern & accessible berbasis Tailwind CSS v4.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Komponen siap pakai sudah ditambahkan:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Button</Badge>
                <Badge variant="secondary">Card</Badge>
                <Badge variant="secondary">Input</Badge>
                <Badge variant="secondary">Badge</Badge>
                <Badge variant="secondary">Label</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex gap-2 w-full">
                <Button variant="default" className="w-full">
                  Primary Button <ArrowRight className="size-4 ml-1" />
                </Button>
                <Button variant="outline" className="w-full">
                  Outline
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Card Supabase */}
          <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Database className="size-5" />
                  </div>
                  <CardTitle className="text-lg">Supabase Database</CardTitle>
                </div>
                {isSupabaseConfigured ? (
                  <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-300">
                    <CheckCircle2 className="size-3.5 mr-1" /> Terkoneksi
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-amber-600 dark:text-amber-400">
                    Perlu Kredensial .env
                  </Badge>
                )}
              </div>
              <CardDescription>
                Database PostgreSQL, Auth, dan Realtime dengan Supabase SSR helper.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Modul helper Supabase telah dibuat:
              </p>
              <ul className="text-xs font-mono space-y-1 text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/60 p-3 rounded-md">
                <li>• src/lib/supabase/client.ts (Client Components)</li>
                <li>• src/lib/supabase/server.ts (Server Components)</li>
                <li>• src/middleware.ts (Session Refresh)</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <p className="text-xs text-neutral-500">
                Edit file <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">.env.local</code> untuk memasukkan URL & Anon Key Supabase Anda.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
