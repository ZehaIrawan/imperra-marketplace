'use client'

import Header from '@/components/Header'
import productsData from '@/data/products.json'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import Link from 'next/link'

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = productsData.find((p) => p.id === params.id)
  const { addToCart } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [showNotification, setShowNotification] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleBuyNow = () => {
    addToCart(product.id, quantity)
    router.push('/cart')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="relative w-full h-96 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-full h-20 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200"
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount.toLocaleString('en-US')} reviews)
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  Sold {product.sold.toLocaleString('en-US')}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-brand-600 mb-2">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    {product.discount && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm font-semibold">
                        {product.discount}% Off
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="mb-6 space-y-3">
                <div className="flex">
                  <span className="text-gray-600 w-32">Condition</span>
                  <span className="font-medium">{product.condition}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32">Weight</span>
                  <span className="font-medium">{product.weight} kg</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32">Category</span>
                  <span className="font-medium">
                    {product.category} &gt; {product.subcategory}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32">Warranty</span>
                  <span className="font-medium">{product.warranty}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32">Stock</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Sold by</span>
                  <span className="text-brand-600 font-medium">
                    {product.seller.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span>{product.seller.rating}</span>
                  </div>
                  <span>{product.seller.location}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 min-w-[4rem] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 border-2 border-brand-600 text-brand-600 rounded-lg font-semibold hover:bg-brand-50 transition">
                  Chat Seller
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  + Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition"
                >
                  Buy Now
                </button>
              </div>

              {/* Notification */}
              {showNotification && (
                <div className="mt-4 p-4 bg-brand-100 border border-brand-400 text-brand-700 rounded-lg flex items-center justify-between">
                  <span>Product added to cart successfully!</span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-brand-700 hover:text-brand-900"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

