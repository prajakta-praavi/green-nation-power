import { useEffect } from 'react'

function ensureMetaTag(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function ensureCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', href)
}

function SeoMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    ensureMetaTag('name', 'description', description)
    ensureMetaTag('property', 'og:title', title)
    ensureMetaTag('property', 'og:description', description)
    ensureMetaTag('name', 'twitter:title', title)
    ensureMetaTag('name', 'twitter:description', description)
    ensureCanonical(window.location.href)
  }, [description, title])

  return null
}

export default SeoMeta
