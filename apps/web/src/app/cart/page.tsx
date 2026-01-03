'use client'

import Header from '@/components/Header'
import productsData from '@/data/products.json'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  const getProduct = (productId: string) => {
    return productsData.find((p) => p.id === productId)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const shipping = 15000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              You don't have any products in your cart yet
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = getProduct(item.productId)
                if (!product) return null

                return (
                  <div
                    key={item.productId}
                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4"
                  >
                    <div className="relative w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.seller.name}
                      </p>
                      <div className="text-lg font-bold text-brand-600 mb-4">
                        {formatPrice(product.price)}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition mb-4">
                  Checkout
                </button>
                <a
                  href="/"
                  className="block w-full px-6 py-3 border-2 border-brand-600 text-brand-600 rounded-lg font-semibold hover:bg-brand-50 transition text-center"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

