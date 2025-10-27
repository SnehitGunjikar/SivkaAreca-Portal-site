import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ScrollReveal from '../components/ScrollReveal'

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
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">{product.title}</ScrollReveal>
      <p className="text-gray-800">{product.description}</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-800">
        {product.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="h-40 bg-white/10 rounded grid place-content-center text-gray-600">Product Image Placeholder</div>
    </div>
  )
}