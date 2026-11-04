import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product, ProductPackage } from '@/types/store'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, pkg: ProductPackage, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setIsOpen: (isOpen: boolean) => void
  getSubtotal: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, pkg: ProductPackage, quantity = 1) => {
        const itemId = `${product.id}-${pkg.id}`
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === itemId)

        if (existingItem) {
          const newQty = existingItem.quantity + quantity
          set({
            items: currentItems.map((i) =>
              i.id === itemId ? { ...i, quantity: newQty } : i
            ),
            isOpen: true,
          })
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: itemId,
                product,
                package: pkg,
                quantity,
              },
            ],
            isOpen: true,
          })
        }
      },

      removeItem: (itemId: string) => {
        set({
          items: get().items.filter((i) => i.id !== itemId),
        })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set({
          items: get().items.map((i) => {
            if (i.id === itemId) {
              const maxAvailable = i.package.stockQuantity
              return { ...i, quantity: Math.min(quantity, maxAvailable) }
            }
            return i
          }),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      setIsOpen: (isOpen: boolean) => {
        set({ isOpen })
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          return total + item.package.price * item.quantity
        }, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'skies_cart_storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
)

