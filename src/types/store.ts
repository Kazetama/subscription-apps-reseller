export type DurationUnit = 'hari' | 'bulan' | 'tahun'

export type StockStatus = 'in_stock' | 'limited' | 'out_of_stock' | 'unavailable'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
}

export interface ProductPackage {
  id: string
  productId: string
  name: string
  durationValue: number
  durationUnit: DurationUnit
  price: number
  stockQuantity: number
  lowStockThreshold: number
  isActive: boolean
}

export interface Product {
  id: string
  categoryId: string
  categoryName?: string
  name: string
  slug: string
  tagline: string
  description: string
  imageUrl: string
  features: string[]
  isActive: boolean
  isFeatured: boolean
  packages: ProductPackage[]
}

export interface CartItem {
  id: string // gabungan `${productId}-${packageId}`
  product: Product
  package: ProductPackage
  quantity: number
}

export interface OrderCustomerInfo {
  customerName: string
  customerPhone: string
  customerNotes?: string
}

export function getStockStatus(pkg: ProductPackage): StockStatus {
  if (!pkg.isActive) return 'unavailable'
  if (pkg.stockQuantity <= 0) return 'out_of_stock'
  if (pkg.stockQuantity <= pkg.lowStockThreshold) return 'limited'
  return 'in_stock'
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

