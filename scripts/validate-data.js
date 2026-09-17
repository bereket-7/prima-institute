import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))

const courses = readJson('src/data/courses.json')
const categories = readJson('src/data/categories.json')
const instructors = readJson('src/data/instructors.json')
const gallery = readJson('src/data/gallery.json')

const categoryIds = new Set(categories.map((c) => c.id))
const courseIds = new Set(courses.map((c) => c.id))
const instructorIds = new Set(instructors.map((i) => i.id))
const allowedGalleryCategories = new Set([...categoryIds, 'common'])

const errors = []

const courseSlugs = new Set()
for (const course of courses) {
  if (courseSlugs.has(course.slug)) {
    errors.push(`Duplicate course slug: ${course.slug}`)
  }
  courseSlugs.add(course.slug)

  if (!categoryIds.has(course.category)) {
    errors.push(`Course ${course.id} references unknown category: ${course.category}`)
  }

  if (course.instructor && !instructorIds.has(course.instructor)) {
    errors.push(`Course ${course.id} references unknown instructor: ${course.instructor}`)
  }
}

for (const instructor of instructors) {
  for (const courseId of instructor.courses) {
    if (!courseIds.has(courseId)) {
      errors.push(`Instructor ${instructor.id} references unknown course: ${courseId}`)
    }
  }
}

for (const category of categories) {
  const count = courses.filter((c) => c.category === category.id).length
  if (count !== category.stats.courses) {
    errors.push(
      `Category ${category.id} stats.courses is ${category.stats.courses} but catalog has ${count}`,
    )
  }
}

const galleryIds = new Set()
for (const item of gallery) {
  if (galleryIds.has(item.id)) {
    errors.push(`Duplicate gallery id: ${item.id}`)
  }
  galleryIds.add(item.id)

  if (!allowedGalleryCategories.has(item.category)) {
    errors.push(`Gallery item ${item.id} has unknown category: ${item.category}`)
  }

  if (!item.src || !item.src.startsWith('/assets/')) {
    errors.push(`Gallery item ${item.id} has invalid src: ${item.src}`)
  } else {
    const assetPath = path.join(root, 'public', item.src.replace(/^\//, ''))
    if (!fs.existsSync(assetPath)) {
      errors.push(`Gallery item ${item.id} image missing: ${item.src}`)
    }
  }
}

if (errors.length > 0) {
  console.error('Data validation failed:')
  errors.forEach((error) => console.error(`  - ${error}`))
  process.exit(1)
}

console.log('Data validation passed.')
