import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product, Category, ProductPackage } from '@/types/store'
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from './mock-data'

interface CatalogState {
  categories: Category[]
  products: Product[]

  // Product CRUD
  addProduct: (product: {
    name: string
    categoryId: string
    tagline: string
    description: string
    imageUrl: string
    features: string[]
    packages: {
      name: string
      durationValue: number
      durationUnit: 'hari' | 'bulan' | 'tahun'
      price: number
    }[]
  }) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  toggleProductActive: (id: string) => void

  // Category CRUD
  addCategory: (category: { name: string; description?: string }) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void

  // Reset
  resetToDefaults: () => void
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      categories: MOCK_CATEGORIES,
      products: MOCK_PRODUCTS,

      addProduct: (input) => {
        const id = `prod-${Date.now()}`
        const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        const category = get().categories.find((c) => c.id === input.categoryId)

        const packages: ProductPackage[] = input.packages.map((pkg, idx) => ({
          id: `${id}-pkg-${idx + 1}`,
          productId: id,
          name: pkg.name,
          durationValue: pkg.durationValue,
          durationUnit: pkg.durationUnit,
          price: pkg.price,
          stockQuantity: 99,
          lowStockThreshold: 5,
          isActive: true,
        }))

        const newProduct: Product = {
          id,
          categoryId: input.categoryId,
          categoryName: category?.name || 'Umum',
          name: input.name,
          slug,
          tagline: input.tagline,
          description: input.description,
          imageUrl: input.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
          features: input.features.filter((f) => f.trim().length > 0),
          isActive: true,
          isFeatured: false,
          packages,
        }

        set({ products: [newProduct, ...get().products] })
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map((p) => {
            if (p.id !== id) return p
            const updated = { ...p, ...updates }
            if (updates.categoryId) {
              const cat = get().categories.find((c) => c.id === updates.categoryId)
              if (cat) updated.categoryName = cat.name
            }
            return updated
          }),
        })
      },

      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) })
      },

      toggleProductActive: (id) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
          ),
        })
      },

      addCategory: (input) => {
        const id = `cat-${Date.now()}`
        const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        const newCategory: Category = {
          id,
          name: input.name,
          slug,
          description: input.description,
        }
        set({ categories: [...get().categories, newCategory] })
      },

      updateCategory: (id, updates) => {
        set({
          categories: get().categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
          // Update categoryName in products if name changed
          products: updates.name
            ? get().products.map((p) =>
                p.categoryId === id ? { ...p, categoryName: updates.name } : p
              )
            : get().products,
        })
      },

      deleteCategory: (id) => {
        if (id === 'cat-all') return // Protect default category
        set({
          categories: get().categories.filter((c) => c.id !== id),
          // Reassign affected products to default
          products: get().products.map((p) =>
            p.categoryId === id ? { ...p, categoryId: 'cat-all', categoryName: 'Semua Kategori' } : p
          ),
        })
      },

      resetToDefaults: () => {
        set({
          categories: MOCK_CATEGORIES,
          products: MOCK_PRODUCTS,
        })
      },
    }),
    {
      name: 'skies_catalog_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

