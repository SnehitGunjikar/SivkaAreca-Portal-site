import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import ScrollReveal from '../components/ScrollReveal'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const resolveImage = (fileName) => new URL(`../assets/imagedata/products-image/${fileName}`, import.meta.url).href

// Auto-load images from per-project folders using Vite's import.meta.glob
// Using products-image subfolders per your placement
const projectFolderGalleries = {
  'pre-engineered-building-peb': import.meta.glob('../assets/imagedata/products-image/peb/*', { eager: true, as: 'url' }),
  'customized-container': import.meta.glob('../assets/imagedata/products-image/containers/*', { eager: true, as: 'url' }),
  'sheet-metal-works-ntpc': import.meta.glob('../assets/imagedata/products-image/sheetmetal-works/*', { eager: true, as: 'url' }),
}
// Prefer WebP assets when available
const projectFolderGalleriesWebp = {
  'pre-engineered-building-peb': import.meta.glob('../assets/imagedata/products-image/peb/*.webp', { eager: true, as: 'url' }),
  'customized-container': import.meta.glob('../assets/imagedata/products-image/containers/*.webp', { eager: true, as: 'url' }),
  'sheet-metal-works-ntpc': import.meta.glob('../assets/imagedata/products-image/sheetmetal-works/*.webp', { eager: true, as: 'url' }),
}
// Government Railway Projects: location-based galleries (prefer WebP)
const railwayLocationsWebp = {
  BAGALKOT: import.meta.glob('../assets/imagedata/products-image/govt-railways/BAGALKOT/*.webp', { eager: true, as: 'url' }),
  Channapatna: import.meta.glob('../assets/imagedata/products-image/govt-railways/Channapatna/*.webp', { eager: true, as: 'url' }),
  Ghataprabha: import.meta.glob('../assets/imagedata/products-image/govt-railways/Ghataprabha/*.webp', { eager: true, as: 'url' }),
  GUNJI: import.meta.glob('../assets/imagedata/products-image/govt-railways/GUNJI/*.webp', { eager: true, as: 'url' }),
  MANDYA: import.meta.glob('../assets/imagedata/products-image/govt-railways/MANDYA/*.webp', { eager: true, as: 'url' }),
  'SULDAL SULEBHAVI': import.meta.glob('../assets/imagedata/products-image/govt-railways/SULDAL SULEBHAVI/*.webp', { eager: true, as: 'url' }),
  UGAR: import.meta.glob('../assets/imagedata/products-image/govt-railways/UGAR/*.webp', { eager: true, as: 'url' }),
}
const railwayCommonWebp = import.meta.glob('../assets/imagedata/products-image/govt-railways/*', { eager: true, as: 'url' })

// Exhaust Towers: client/location-based galleries (prefer WebP)
const exhaustTowersClientsWebp = {
  'Aequs SEZ, Belgaum Karnataka': import.meta.glob('../assets/imagedata/products-image/exhaust-towers/AEQUS/*.webp', { eager: true, as: 'url' }),
  'Modern Hiring Service, Andaman and Nicobar Islands': import.meta.glob('../assets/imagedata/products-image/exhaust-towers/ModernHiringService-AN/*.webp', { eager: true, as: 'url' }),
  'Modern Hiring Service, Tiruchi Tamil Nadu': import.meta.glob('../assets/imagedata/products-image/exhaust-towers/ModernHiringService-Tiruchi/*.webp', { eager: true, as: 'url' }),
}
const exhaustTowersCommonWebp = import.meta.glob('../assets/imagedata/products-image/exhaust-towers/*', { eager: true, as: 'url' })

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div>
        <p>Project not found.</p>
        <Link to="/projects" className="text-brand-600">Back to Projects</Link>
      </div>
    )
  }

  const webpEntries = Object.entries(projectFolderGalleriesWebp[project.slug] || {})
  const folderGalleryWebp = webpEntries
    .filter(([key]) => !key.endsWith('-640.webp'))
    .map(([, url]) => url)

  const origEntries = Object.entries(projectFolderGalleries[project.slug] || {})
  const folderGallery = origEntries
    .filter(([key]) => !key.endsWith('.webp') && !key.endsWith('-640.webp'))
    .map(([, url]) => url)

  const fallbackGallery = (project.images || []).map(resolveImage)

  // Special handling for Government Railway Projects grouped by location
  const isRailProject = project.slug === 'government-railway-projects-swr'
  let locationSections = null
  if (isRailProject) {
    const locOrder = ['BAGALKOT', 'Channapatna', 'Ghataprabha', 'GUNJI', 'MANDYA', 'SULDAL SULEBHAVI', 'UGAR']
    locationSections = locOrder.map((loc) => {
      const entries = Object.entries(railwayLocationsWebp[loc] || {})
      const images = entries
        .filter(([key]) => !key.endsWith('-640.webp'))
        .map(([, url]) => url)
      return { loc, images }
    }).filter((s) => s.images.length > 0)
  }

  // Special handling for Exhaust Towers grouped by client/location
  const isExhaustProject = project.slug === 'exhaust-towers'
  let clientSections = null
  if (isExhaustProject) {
    const clientOrder = [
      'Aequs SEZ, Belgaum Karnataka',
      'Modern Hiring Service, Andaman and Nicobar Islands', 
      'Modern Hiring Service, Tiruchi Tamil Nadu'
    ]
    clientSections = clientOrder.map((client) => {
      const entries = Object.entries(exhaustTowersClientsWebp[client] || {})
      const images = entries
        .filter(([key]) => !key.endsWith('-640.webp'))
        .map(([, url]) => url)
      return { client, images }
    }).filter((s) => s.images.length > 0)
  }

  const commonRootImages = isRailProject
    ? Object.entries(railwayCommonWebp)
        .filter(([key]) => key.endsWith('.webp') && !key.endsWith('-640.webp'))
        .map(([, url]) => url)
    : isExhaustProject
    ? Object.entries(exhaustTowersCommonWebp)
        .filter(([key]) => key.endsWith('.webp') && !key.endsWith('-640.webp'))
        .map(([, url]) => url)
    : []

  const gallery = isRailProject
    ? (locationSections.length > 0 ? locationSections[0].images : (commonRootImages.length ? commonRootImages : fallbackGallery))
    : isExhaustProject
    ? (clientSections.length > 0 ? clientSections[0].images : (commonRootImages.length ? commonRootImages : fallbackGallery))
    : (folderGalleryWebp.length ? folderGalleryWebp : (folderGallery.length ? folderGallery : fallbackGallery))

  const [viewerIndex, setViewerIndex] = useState(null)
  const bgImage = (gallery[0] || fallbackGallery[0])

  return (
    <div className="space-y-4">
      <Link to="/projects" className="text-brand-400">← Back to Projects</Link>
      <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} textClassName="text-gray-900">{project.title}</ScrollReveal>
      <motion.div
        className="relative h-72 sm:h-96 md:h-[30rem] rounded-lg shadow-inner overflow-hidden md:bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.05)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label={`${project.title} background image`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 right-4 md:right-auto">
          <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow">{project.title}</h3>
          <p className="text-white/85 text-sm max-w-2xl">{project.description}</p>
        </div>
      </motion.div>
      <p className="text-gray-800">{project.description}</p>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-gray-800">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {isRailProject ? (
        <div className="mt-6 space-y-8">
          {commonRootImages.length > 0 && (
            <div>
              <h4 className="text-gray-900 font-semibold mb-2">Common Works</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonRootImages.map((src, idx) => (
                  <button
                    key={`common-${idx}`}
                    type="button"
                    onClick={() => setViewerIndex(idx)}
                    className="group relative rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-400"
                    aria-label={`Open common photo ${idx + 1}`}
                  >
                    <img src={src} alt={`Common photo ${idx + 1}`} loading="lazy" className="w-full h-32 sm:h-40 md:h-48 object-cover brightness-100 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {locationSections && locationSections.map((section) => (
            <div key={section.loc}>
              <h4 className="text-gray-900 font-semibold mb-2">{section.loc}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {section.images.map((src, idx) => (
                  <button
                    key={`${section.loc}-${idx}`}
                    type="button"
                    onClick={() => setViewerIndex(idx)}
                    className="group relative rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-400"
                    aria-label={`Open photo ${idx + 1} at ${section.loc}`}
                  >
                    <img src={src} alt={`${section.loc} photo ${idx + 1}`} loading="lazy" className="w-full h-32 sm:h-40 md:h-48 object-cover brightness-100 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : isExhaustProject ? (
        <div className="mt-6 space-y-8">
          {commonRootImages.length > 0 && (
            <div>
              <h4 className="text-gray-900 font-semibold mb-2">Common Works</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonRootImages.map((src, idx) => (
                  <button
                    key={`common-${idx}`}
                    type="button"
                    onClick={() => setViewerIndex(idx)}
                    className="group relative rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-400"
                    aria-label={`Open common photo ${idx + 1}`}
                  >
                    <img src={src} alt={`Common photo ${idx + 1}`} loading="lazy" className="w-full h-32 sm:h-40 md:h-48 object-cover brightness-100 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {clientSections && clientSections.map((section) => (
            <div key={section.client}>
              <h4 className="text-gray-900 font-semibold mb-2">{section.client}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {section.images.map((src, idx) => (
                  <button
                    key={`${section.client}-${idx}`}
                    type="button"
                    onClick={() => setViewerIndex(idx)}
                    className="group relative rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-400"
                    aria-label={`Open photo ${idx + 1} for ${section.client}`}
                  >
                    <img src={src} alt={`${section.client} photo ${idx + 1}`} loading="lazy" className="w-full h-32 sm:h-40 md:h-48 object-cover brightness-100 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        gallery.length > 0 && (
          <div className="mt-6">
            <h4 className="text-gray-900 font-semibold mb-2">Project Photos</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setViewerIndex(idx)}
                  className="group relative rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-400"
                  aria-label={`Open photo ${idx + 1} of ${project.title}`}
                >
                  {/* Prefer WebP sources when available */}
                  <img src={src} alt={`${project.title} photo ${idx + 1}`} loading="lazy" className="w-full h-32 sm:h-40 md:h-48 object-cover brightness-100 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )
      )}

      {viewerIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center"
          onClick={() => setViewerIndex(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-[95vw] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={isRailProject ? (locationSections?.[0]?.images?.[viewerIndex] || commonRootImages[viewerIndex]) : gallery[viewerIndex]} alt={`${project.title} enlarged photo`} className="w-full h-auto rounded-md shadow-2xl" />
            <div className="absolute inset-x-0 -top-12 flex justify-between items-center px-3">
              <button type="button" className="text-white/90 hover:text-white" onClick={() => setViewerIndex(null)}>Close</button>
              <div className="flex items-center gap-3">
                <button type="button" className="text-white/90 hover:text-white" onClick={() => setViewerIndex((viewerIndex + (isRailProject ? ((locationSections?.[0]?.images?.length || 0) + (commonRootImages?.length || 0)) : gallery.length) - 1) % (isRailProject ? ((locationSections?.[0]?.images?.length || 0) + (commonRootImages?.length || 0)) : gallery.length))}>Prev</button>
                <button type="button" className="text-white/90 hover:text-white" onClick={() => setViewerIndex((viewerIndex + 1) % (isRailProject ? ((locationSections?.[0]?.images?.length || 0) + (commonRootImages?.length || 0)) : gallery.length))}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}