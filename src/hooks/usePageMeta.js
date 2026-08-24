import { useEffect } from 'react'

const DEFAULTS = {
  title: 'Prima Institute',
  description:
    'PRIMA Institute — Excellence in Culinary Arts, Bakery & Pastry, Beauty & Hair Dressing, Fashion Design, and Computer Training.',
}

export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const pageTitle = title ? `${title} | Prima Institute` : DEFAULTS.title
    document.title = pageTitle

    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) {
      descTag.setAttribute('content', description || DEFAULTS.description)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', pageTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description || DEFAULTS.description)
  }, [title, description])
}
