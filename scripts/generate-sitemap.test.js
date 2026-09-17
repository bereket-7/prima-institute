import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const sitemapPath = path.join(root, 'public/sitemap.xml')

describe('generate-sitemap', () => {
  beforeAll(() => {
    execSync('node scripts/generate-sitemap.js', {
      cwd: root,
      env: { ...process.env, VITE_SITE_URL: 'https://example.test' },
    })
  })

  it('writes sitemap with course detail URLs', () => {
    const xml = fs.readFileSync(sitemapPath, 'utf8')
    expect(xml).toContain('https://example.test/')
    expect(xml).toContain('https://example.test/courses/')
    expect(xml).toContain('/categories/')
    expect(xml).toContain('/blog/')
    expect(xml).not.toContain('prima-institute.example')
  })
})
