import { useEffect } from 'react'

/**
 * SEO meta tag manager — updates <head> tags per page.
 * Usage: <SEOMeta title="..." description="..." />
 */
export default function SEOMeta({
  title,
  description,
  canonical,
  ogImage,
}) {
  const siteTitle = title ? `${title} | Marvza` : 'Marvza | Private Nannies & Mannies · London'
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
    }
  }, [siteTitle, siteDesc, canonical, ogImage])

  return null
}
