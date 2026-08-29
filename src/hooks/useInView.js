import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref + boolean `inView`.
 * When the ref'd element enters the viewport, inView becomes true.
 * Used for triggering entrance animations on scroll.
 */
export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}

/**
 * Returns staggered delay classes for children based on their index.
 * Usage: <div className={staggerDelay(index)}> ...
 */
export function staggerDelay(index, baseMs = 100) {
  const delays = [0, 100, 200, 300, 400, 500, 600, 700, 800]
  const ms = delays[index] ?? (index * baseMs)
  return `animation-delay-${ms}`
}
