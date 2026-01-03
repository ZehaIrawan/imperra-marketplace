import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  sold: number
  image: string
  seller: {
    name: string
    rating: number
    location: string
  }
}

interface ProductCardProps {
  product: Product
}

const FAVORITES_KEY = 'imperra-favorites'

// Utility functions for localStorage
const getFavoritesFromStorage = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveFavoritesToStorage = (favorites: string[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error)
  }
}

const toggleFavoriteInStorage = (productId: string): boolean => {
  const favorites = getFavoritesFromStorage()
  const index = favorites.indexOf(productId)

  if (index > -1) {
    favorites.splice(index, 1)
    saveFavoritesToStorage(favorites)
    return false
  } else {
    favorites.push(productId)
    saveFavoritesToStorage(favorites)
    return true
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  // Load favorite status from localStorage on mount
  useEffect(() => {
    const favorites = getFavoritesFromStorage()
    setIsFavorited(favorites.includes(product.id))
  }, [product.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newFavoriteStatus = toggleFavoriteInStorage(product.id)
    setIsFavorited(newFavoriteStatus)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discount && product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {product.discount}%
            </div>
          )}
          {/* Favorite Button - BUG DEMO: This state will be preserved incorrectly when using index as key */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-5 h-5 transition-colors ${
                isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-2">
            <div className="text-lg font-bold text-brand-600">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-xs font-medium text-gray-700 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount.toLocaleString('en-US')})
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">
              Sold {product.sold.toLocaleString('en-US')}
            </span>
          </div>

          {/* Seller Info */}
          <div className="text-xs text-gray-500">
            <span>{product.seller.name}</span>
            <span className="mx-1">•</span>
            <span>{product.seller.location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

