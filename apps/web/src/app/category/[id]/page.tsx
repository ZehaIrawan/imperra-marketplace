'use client'

import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import { useMemo, useState } from 'react'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoriesData.find((c) => c.id === params.id)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'newest'>('newest')

  // Filter products by category
  const categoryProducts = useMemo(() => {
    let filtered = productsData.filter((p) => p.category === category?.name)

    // Filter by subcategory if selected
    if (selectedSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory)
    }

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
        default:
          return b.sold - a.sold // Sort by popularity (sold count) as default
      }
    })
  }, [category?.name, selectedSubcategory, sortBy])

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-brand-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-6xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <p className="text-gray-600">
                {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Subcategories */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Subcategories</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubcategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedSubcategory === null
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {category.subcategories.map((subcat) => {
                const subcatCount = productsData.filter(
                  (p) => p.category === category.name && p.subcategory === subcat
                ).length
                return (
                  <button
                    key={subcat}
                    onClick={() => setSelectedSubcategory(subcat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedSubcategory === subcat
                        ? 'bg-brand-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subcat} ({subcatCount})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {categoryProducts.length} of {categoryProducts.length} products
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              {selectedSubcategory
                ? `No products found in ${selectedSubcategory} subcategory.`
                : 'No products found in this category.'}
            </p>
            <button
              onClick={() => setSelectedSubcategory(null)}
              className="px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition"
            >
              View All Products
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

