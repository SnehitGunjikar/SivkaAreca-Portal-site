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
      <Link to="/products" className="text-brand-600">← Back to Products</Link>
      <h2>{product.title}</h2>
      <p className="text-gray-700">{product.description}</p>
      <ul className="list-disc pl-5 space-y-1">
        {product.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="h-40 bg-gray-100 rounded grid place-content-center text-gray-500">Product Image Placeholder</div>
    </div>
  )
}