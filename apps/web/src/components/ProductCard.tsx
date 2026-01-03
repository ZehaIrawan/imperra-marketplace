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

// Simulating database/API calls with localStorage
// In a real app, these would be API calls to your backend
const checkFavoriteStatus = async (productId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 0))

  if (typeof window === 'undefined') return false
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    const favorites: string[] = stored ? JSON.parse(stored) : []
    return favorites.includes(productId)
  } catch {
    return false
  }
}

const toggleFavoriteInDB = async (productId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 0))

  if (typeof window === 'undefined') return false

  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    const favorites: string[] = stored ? JSON.parse(stored) : []
    const index = favorites.indexOf(productId)

    if (index > -1) {
      favorites.splice(index, 1)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      return false
    } else {
      favorites.push(productId)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      return true
    }
  } catch (error) {
    console.error('Failed to save favorite to database:', error)
    return false
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchFavoriteStatus = async () => {
      setIsLoading(true)
      // Simulate API call to check if product is favorited
      const favorited = await checkFavoriteStatus(product.id)

      if (!cancelled) {
        setIsFavorited(favorited)
        setIsLoading(false)
      }
    }

    fetchFavoriteStatus()

    // Cleanup: prevent state update if component unmounts during async operation
    return () => {
      cancelled = true
    }
    // Intentionally empty deps to simulate "fetch once on mount" pattern
    // In real-world, you might do this, but you MUST use stable keys (product.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // REAL-WORLD PATTERN: Optimistic update + API call
    const previousState = isFavorited
    setIsFavorited(!previousState) // Optimistic update

    try {
      // Simulate API call to save/remove favorite in database
      const newStatus = await toggleFavoriteInDB(product.id)
      setIsFavorited(newStatus)
    } catch (error) {
      // Rollback on error
      setIsFavorited(previousState)
      console.error('Failed to update favorite:', error)
    }
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
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isLoading ? (
              <svg className="w-5 h-5 text-gray-400 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
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
            )}
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

