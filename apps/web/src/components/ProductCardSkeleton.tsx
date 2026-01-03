export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Price Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

        {/* Rating Skeleton */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Seller Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  )
}

