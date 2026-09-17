import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')

function loadEnvFile() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvFile()

const siteUrl = (process.env.VITE_SITE_URL || 'https://your-domain.com').replace(/\/$/, '')

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const courses = readJson('src/data/courses.json')
const categories = readJson('src/data/categories.json')
const blogPosts = readJson('src/data/blog-posts.json')

const staticPaths = [
  '/',
  '/courses',
  '/instructors',
  '/gallery',
  '/blog',
  '/about',
  '/contact',
  '/enroll',
  '/terms',
  '/privacy',
]

const paths = [
  ...staticPaths,
  ...categories.map((c) => `/categories/${c.slug}`),
  ...courses.map((c) => `/courses/${c.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
]

const uniquePaths = [...new Set(paths)]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths.map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc></url>`).join('\n')}
</urlset>
`

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)

console.log(`Generated sitemap.xml and robots.txt for ${siteUrl} (${uniquePaths.length} URLs)`)
