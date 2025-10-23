import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ButtonLink } from '../components/Button'

export default function Products() {
  return (
    <div>
      <h2>Products</h2>
      <p className="mt-2 text-gray-300">Steel solutions and components portfolio.</p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.slug} className="border border-white/10 bg-white/5 rounded-lg p-4 flex flex-col">
            <div className="h-28 bg-white/10 rounded mb-3 grid place-content-center text-gray-300">Image</div>
            <h3 className="font-semibold text-white">{p.title}</h3>
            <ul className="text-sm text-gray-400 list-disc pl-5 flex-1">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <ButtonLink to={`/products/${p.slug}`} className="mt-3">Read More</ButtonLink>
          </div>
        ))}
      </div>
    </div>
  )
}