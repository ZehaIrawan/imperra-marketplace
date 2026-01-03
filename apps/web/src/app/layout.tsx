import type { Metadata } from 'next'
import './globals.css'
import CartProviderWrapper from '@/components/CartProviderWrapper'

export const metadata: Metadata = {
  title: 'Imperra Marketplace',
  description: 'Modern marketplace application',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProviderWrapper>{children}</CartProviderWrapper>
      </body>
    </html>
  )
}

