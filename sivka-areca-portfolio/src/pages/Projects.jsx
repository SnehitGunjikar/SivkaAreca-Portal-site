import { projects } from '../data/projects'
import { ButtonLink } from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SpotlightCard from '../components/SpotlightCard'
import railwayImg from '../assets/imagedata/products-image/railway-staircase-img.JPG'
import pebImage from '../assets/imagedata/products-image/peb-image.PNG'
import containerImage from '../assets/imagedata/products-image/contairner-img.JPG'
import towerImage from '../assets/imagedata/products-image/tower-img.JPG'
import sheetmetalImage from '../assets/imagedata/products-image/sheetmetal-img.jpg'
import railwayImgWebp from '../assets/imagedata/products-image/railway-staircase-img.webp'
import pebImageWebp from '../assets/imagedata/products-image/peb-image.webp'
import containerImageWebp from '../assets/imagedata/products-image/contairner-img.webp'
import towerImageWebp from '../assets/imagedata/products-image/tower-img.webp'
import sheetmetalImageWebp from '../assets/imagedata/products-image/sheetmetal-img.webp'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  FaDiagramProject, 
  FaTrain, 
  FaBuilding, 
  FaCube, 
  FaIndustry, 
  FaHammer,
  FaFilter,
  FaMagnifyingGlass,
  FaArrowRight,
  FaCircleCheck,
  FaStar,
  FaAward,
  FaShield,
  FaCalendar,
  FaLocationDot,
  FaEye
} from 'react-icons/fa6'

const projectImages = {
  'government-railway-projects-swr': railwayImg,
  'pre-engineered-building-peb': pebImage,
  'customized-container': containerImage,
  'exhaust-towers': towerImage,
  'sheet-metal-works-ntpc': sheetmetalImage,
}
const projectImagesWebp = {
  'government-railway-projects-swr': railwayImgWebp,
  'pre-engineered-building-peb': pebImageWebp,
  'customized-container': containerImageWebp,
  'exhaust-towers': towerImageWebp,
  'sheet-metal-works-ntpc': sheetmetalImageWebp,
}

const projectIcons = {
  'government-railway-projects-swr': FaTrain,
  'pre-engineered-building-peb': FaBuilding,
  'customized-container': FaCube,
  'exhaust-towers': FaIndustry,
  'sheet-metal-works-ntpc': FaHammer,
}

const projectCategories = [
  { id: 'all', name: 'All Projects', icon: FaDiagramProject },
  { id: 'railway', name: 'Railway', icon: FaTrain },
  { id: 'building', name: 'Buildings', icon: FaBuilding },
  { id: 'container', name: 'Containers', icon: FaCube },
  { id: 'tower', name: 'Towers', icon: FaIndustry },
  { id: 'sheet-metal', name: 'Sheet Metal', icon: FaHammer },
]

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const startCount = 0

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * (end - startCount) + startCount))
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return <span ref={countRef}>{count}{suffix}</span>
}

function ProjectCard({ project, imageSrc, index }) {
  const [loaded, setLoaded] = useState(false)
  const IconComponent = projectIcons[project.slug] || FaDiagramProject

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <SpotlightCard className="group relative h-full rounded-2xl border border-gray-300 bg-white p-6 flex flex-col transition-all duration-300 hover:ring-1 hover:ring-brand-200 hover:shadow-xl" spotlightColor="rgba(0, 0, 0, 0.15)">
        <ScrollReveal as="div" mode="block" containerClassName="flex-1 flex flex-col">
          <div className="relative w-full aspect-[4/3] rounded-xl mb-4 overflow-hidden">
            <picture>
              <source srcSet={projectImagesWebp[project.slug]} type="image/webp" />
              <img 
                src={imageSrc} 
                alt={project.title} 
                loading="lazy" 
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
              />
            </picture>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden="true" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            
            {/* Icon overlay */}
            <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg group-hover:bg-brand-50 transition-colors">
              <IconComponent className="text-brand-600 text-xl" />
            </div>
            
            {/* Status badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              <FaCircleCheck size={12} />
              Completed
            </div>
          </div>
          
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-700 transition-colors flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {project.title}
            </h3>
          </div>
          
          <p className="text-gray-700 flex-1 mb-6 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
          
          {/* Project details */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendar size={14} />
              <span>2023-2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaLocationDot size={14} />
              <span>India</span>
            </div>
          </div>
          
          <ButtonLink to={`/projects/${project.slug}`} className="mt-auto group bg-brand-600 hover:bg-brand-700 text-white">
            View Details
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </ButtonLink>
        </ScrollReveal>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-16">
      {/* Enhanced Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50 py-16 px-6 rounded-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FaDiagramProject className="text-5xl text-brand-600 mb-6 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Where vision meets precision—every project is a testament to craftsmanship, innovation, and relentless attention to detail
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-gray-600">Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-gray-600">On-Time Delivery</p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Categories */}
      <motion.section
        className="bg-white py-12 px-6 rounded-2xl border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FaIndustry className="text-4xl text-brand-600 mb-4 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Project Categories</h2>
            <p className="text-gray-600">Diverse expertise across multiple industries and applications</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {projectCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    filter === category.id 
                      ? 'bg-brand-600 text-white shadow-lg' 
                      : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="text-2xl mb-2 mx-auto" />
                  <p className="text-xs font-medium">{category.name}</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Excellence Showcase */}
      <motion.section
        className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-12 px-6 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FaAward className="text-4xl mb-4 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Excellence in Every Project</h2>
            <p className="text-white/90">Our commitment to quality and innovation drives exceptional results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <FaShield className="text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Quality Assurance</h3>
              <p className="text-white/80 text-sm">Rigorous testing and quality control at every stage</p>
            </motion.div>
            
            <motion.div
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaStar className="text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-white/80 text-sm">Cutting-edge solutions and modern fabrication techniques</p>
            </motion.div>
            
            <motion.div
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <FaCircleCheck className="text-3xl mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Timely Delivery</h3>
              <p className="text-white/80 text-sm">Consistent on-time project completion and delivery</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 text-lg">Discover our portfolio of successful steel fabrication projects</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((pr, index) => (
            <ProjectCard key={pr.slug} project={pr} imageSrc={projectImages[pr.slug]} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaMagnifyingGlass className="text-4xl text-gray-400 mb-4 mx-auto" />
            <p className="text-gray-600">No projects found matching your search.</p>
          </motion.div>
        )}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white py-16 px-6 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaDiagramProject className="text-5xl mb-6 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's collaborate to bring your vision to life with our proven expertise
            </p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ButtonLink 
                to="/contact" 
                className="bg-white text-brand-700 hover:bg-gray-100 group"
              >
                Start Your Project
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>
              <ButtonLink 
                to="/products" 
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-brand-700 group"
              >
                View Our Products
                <FaEye className="ml-2 group-hover:scale-110 transition-transform" />
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}