'use client'

import Header from '@/components/Header'
import BannerCarousel from '@/components/BannerCarousel'
import CategoryGrid from '@/components/CategoryGrid'
import ProductCard from '@/components/ProductCard'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import bannersData from '@/data/banners.json'
import { useState, useEffect } from 'react'

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'sold'

export default function Home() {
  const [displayCount, setDisplayCount] = useState(17)
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('default')

  // Sort products based on selected option
  const sortedProducts = [...productsData].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'sold':
        return b.sold - a.sold
      default:
        return 0
    }
  })

  const productsToShow = sortedProducts.slice(0, displayCount)
  const hasMore = displayCount < sortedProducts.length

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near the bottom
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Load more when user is 200px from bottom
      if (scrollTop + windowHeight >= documentHeight - 200 && hasMore && !isLoading) {
        setIsLoading(true)
        // Simulate loading delay for better UX
        setTimeout(() => {
          setDisplayCount((prev) => Math.min(prev + 17, sortedProducts.length))
          setIsLoading(false)
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayCount, hasMore, isLoading, sortedProducts.length])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Banner Carousel */}
        <BannerCarousel banners={bannersData} />

        {/* Categories */}
        <CategoryGrid categories={categoriesData} />

        {/* All Products */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              All Products
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption)
                    setDisplayCount(17) // Reset to initial count when sorting
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="sold">Most Sold</option>
                </select>
              </div>
              <span className="text-sm text-gray-600">
                Showing {displayCount} of {productsData.length}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productsToShow.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* Skeleton Loaders */}
            {isLoading &&
              Array.from({ length: 17 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>

          {/* End of Products Message */}
          {!hasMore && (
            <div className="text-center py-8 text-gray-600">
              <p>You&apos;ve reached the end of all products!</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Imperra</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-brand-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-600">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-brand-600">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-600">
                    How to Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-600">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Sell on Imperra</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-brand-600">
                    Become a Seller
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-600">
                    Seller Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-brand-600">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-brand-600">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-brand-600">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 Imperra Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
