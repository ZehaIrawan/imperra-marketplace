'use client'

import { CartProvider } from '@/contexts/CartContext'

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <CartProvider>{children}</CartProvider>
}

