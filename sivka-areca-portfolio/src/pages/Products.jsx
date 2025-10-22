import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Products() {
  return (
    <div>
      <h2>Products</h2>
      <p className="mt-2 text-gray-700">Steel solutions and components portfolio.</p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.slug} className="border rounded-lg p-4 flex flex-col">
            <div className="h-28 bg-gray-100 rounded mb-3 grid place-content-center text-gray-500">Image</div>
            <h3 className="font-semibold">{p.title}</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5 flex-1">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link to={`/products/${p.slug}`} className="mt-3 inline-block bg-brand-600 text-white px-3 py-2 rounded">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  )
}