import Link from 'next/link'

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

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
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

