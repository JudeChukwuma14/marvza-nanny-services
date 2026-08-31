import { useEffect } from 'react'

const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "name": "Marvza Private Nannies & Mannies",
  "url": "https://marvza.com",
  "telephone": "+447944219712",
  "email": "hello@marvza.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "GB"
  },
  "areaServed": "London",
  "description": "Premium London agency for private nannies and mannies, matching families with trusted childcare professionals."
}

/**
 * SEO meta tag manager — updates <head> tags per page.
 * Usage: <SEOMeta title="..." description="..." />
 */
export default function SEOMeta({
  title,
  description,
  canonical,
  ogImage,
  schema,
}) {
  const siteTitle = title 
    ? (title.includes('Marvza') ? title : `${title} | Marvza Private Nannies & Mannies`) 
    : 'Marvza Private Nannies & Mannies'
  const siteDesc = description || 'Marvza is a premium London agency for private nannies and mannies, matching families with trusted, experienced childcare professionals for full-time, live-in, live-out, backup, emergency and event childcare.'

  useEffect(() => {
    document.title = siteTitle

    function setMeta(name, content, isProperty = false) {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', siteDesc)
    setMeta('og:title', siteTitle, true)
    setMeta('og:description', siteDesc, true)
    if (ogImage) setMeta('og:image', ogImage, true)
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    } else {
      const existingLink = document.querySelector('link[rel="canonical"]')
      if (existingLink) existingLink.remove()
    }

    // Inject Schema.org JSON-LD
    let script = document.querySelector('#seo-schema')
    if (!script) {
      script = document.createElement('script')
      script.id = 'seo-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    const jsonLd = schema ? [BASE_SCHEMA, schema] : BASE_SCHEMA
    script.textContent = JSON.stringify(jsonLd)

  }, [siteTitle, siteDesc, canonical, ogImage, schema])

  return null
}
