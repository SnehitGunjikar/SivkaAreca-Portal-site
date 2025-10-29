import fs from 'fs'
import path from 'path'
import url from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const imagesRoot = path.join(projectRoot, 'src', 'assets', 'imagedata')

const exts = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'])
const maxWidth = 1600
const maxHeight = 1200
const jpegQuality = 78 // balance size and clarity
const pngCompressionLevel = 9
const webpQuality = 82

function baseNoExt(filePath) {
  const dir = path.dirname(filePath)
  const ext = path.extname(filePath)
  const name = path.basename(filePath, ext)
  return path.join(dir, name)
}

async function optimizeFile(filePath) {
  const rel = path.relative(projectRoot, filePath)
  try {
    const img = sharp(filePath)
    const meta = await img.metadata()

    const width = Math.min(meta.width || maxWidth, maxWidth)
    const height = Math.min(meta.height || maxHeight, maxHeight)

    let pipeline = img.resize({ width, height, fit: 'inside', withoutEnlargement: true })

    const ext = path.extname(filePath)
    const lowerExt = ext.toLowerCase()

    if (lowerExt === '.jpg' || lowerExt === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: jpegQuality, mozjpeg: true })
    } else if (lowerExt === '.png') {
      // preserve alpha if present
      if (meta.hasAlpha) {
        pipeline = pipeline.png({ compressionLevel: pngCompressionLevel })
      } else {
        pipeline = pipeline.png({ compressionLevel: pngCompressionLevel })
      }
    }

    // Write optimized original (same extension)
    await pipeline.toFile(filePath + '.tmp')
    await fs.promises.rename(filePath + '.tmp', filePath)
    console.log(`Optimized: ${rel} -> ${width}x${height}`)

    // Generate WebP variants alongside original
    const base = baseNoExt(filePath)
    const outWebp = base + '.webp'
    const outWebpSm = base + '-640.webp'

    await img
      .resize({ width: Math.min(width, maxWidth), height: Math.min(height, maxHeight), fit: 'inside', withoutEnlargement: true })
      .webp({ quality: webpQuality })
      .toFile(outWebp)
      .catch((e) => console.warn(`WebP full fail (${rel}):`, e.message))

    await img
      .resize({ width: 640, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: webpQuality })
      .toFile(outWebpSm)
      .catch((e) => console.warn(`WebP 640 fail (${rel}):`, e.message))

  } catch (err) {
    console.warn(`Skip (${rel}):`, err.message)
  }
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      await walk(full)
    } else if (exts.has(path.extname(e.name))) {
      await optimizeFile(full)
    }
  }
}

(async function run() {
  console.log('Optimizing images under:', path.relative(projectRoot, imagesRoot))
  await walk(imagesRoot)
  console.log('Image optimization completed.')
})();