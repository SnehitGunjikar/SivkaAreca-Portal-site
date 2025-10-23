import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/products" className="text-brand-600">Back to Products</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Link to="/products" className="text-brand-400">← Back to Products</Link>
      <h2 className="text-white">{product.title}</h2>
      <p className="text-gray-300">{product.description}</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-300">
        {product.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="h-40 bg-white/10 rounded grid place-content-center text-gray-300">Product Image Placeholder</div>
    </div>
  )
}