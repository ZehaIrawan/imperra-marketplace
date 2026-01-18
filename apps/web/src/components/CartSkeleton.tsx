import React from 'react'

export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4"
            >
              {/* Image Placeholder */}
              <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>

              {/* Content Placeholder */}
              <div className="flex-1 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 rounded"></div>

                {/* Controls Placeholder */}
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Price Placeholder */}
              <div className="text-right">
                <div className="h-8 w-24 bg-gray-200 rounded ml-auto"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <div className="h-8 w-40 bg-gray-200 rounded mb-6"></div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="h-12 w-full bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
