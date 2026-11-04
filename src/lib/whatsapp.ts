import { CartItem, formatRupiah, OrderCustomerInfo } from '@/types/store'
import { STORE_WHATSAPP_NUMBER } from './mock-data'

export interface OrderPayload {
  orderNumber: string
  customer: OrderCustomerInfo
  items: CartItem[]
  totalAmount: number
}

export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `SBN-${dateStr}-${randomSuffix}`
}

export function generateWhatsAppMessage(payload: OrderPayload): string {
  const { orderNumber, customer, items, totalAmount } = payload

  const itemLines = items
    .map((item, index) => {
      const itemSubtotal = item.package.price * item.quantity
      return (
        `${index + 1}. *${item.product.name}*\n` +
        `   • Paket: ${item.package.name} (${item.package.durationValue} ${item.package.durationUnit})\n` +
        `   • Jumlah: ${item.quantity}x @ ${formatRupiah(item.package.price)}\n` +
        `   • Subtotal: ${formatRupiah(itemSubtotal)}`
      )
    })
    .join('\n\n')

  const notesText = customer.customerNotes ? `\n📝 *Catatan:* ${customer.customerNotes}` : ''

  const message =
    `Halo *Skies by Nas*, saya ingin memesan langganan aplikasi:\n\n` +
    `🔖 *No. Pesanan:* ${orderNumber}\n` +
    `👤 *Nama:* ${customer.customerName}\n` +
    `📱 *WhatsApp:* ${customer.customerPhone}${notesText}\n\n` +
    `📦 *Rincian Pesanan:*\n` +
    `${itemLines}\n\n` +
    `💰 *TOTAL PEMBAYARAN:* *${formatRupiah(totalAmount)}*\n\n` +
    `Mohon info instruksi pembayaran & rekening transfernya ya kak. Terima kasih! ✨`

  return message
}

export function createWhatsAppUrl(payload: OrderPayload): string {
  const message = generateWhatsAppMessage(payload)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`
}

