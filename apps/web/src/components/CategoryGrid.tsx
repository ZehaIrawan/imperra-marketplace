import Link from 'next/link'

interface Category {
  id: string
  name: string
  icon: string
  subcategories: string[]
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition cursor-pointer group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <span className="text-xs text-center text-gray-700 font-medium">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

