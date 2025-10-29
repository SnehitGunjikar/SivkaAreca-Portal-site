import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ScrollReveal from '../components/ScrollReveal'
import steelImg from '../assets/imagedata/core-expertise-image/steelstructure-fabrication-img.jpg'
import pebImg from '../assets/imagedata/core-expertise-image/peb-img.jpg'
import containerImg from '../assets/imagedata/core-expertise-image/container-img.jpg'
import towerImg from '../assets/imagedata/core-expertise-image/tower-img.jpg'
import sheetmetalImg from '../assets/imagedata/core-expertise-image/sheetmetal-img.jpg'
import { motion } from 'framer-motion'

const productImages = {
  'structural-steel-fabrication': steelImg,
  'pre-engineered-buildings': pebImg,
  'modular-enclosures-containers': containerImg,
  'exhaust-support-towers': towerImg,
  'sheet-metal-fabrication': sheetmetalImg,
}

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

  const bgImage = productImages[product.slug]

  return (
    <div className="space-y-4">
      <Link to="/products" className="text-brand-400">← Back to Products</Link>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">{product.title}</ScrollReveal>
      <motion.div
        className="relative h-72 sm:h-96 md:h-[30rem] rounded-lg shadow-inner overflow-hidden md:bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.05)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label={`${product.title} background image`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 right-4 md:right-auto">
          <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow">{product.title}</h3>
          <p className="text-white/85 text-sm max-w-2xl">{product.features[0]}</p>
        </div>
      </motion.div>
      <p className="text-gray-800">{product.description}</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-800">
        {product.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  )
}