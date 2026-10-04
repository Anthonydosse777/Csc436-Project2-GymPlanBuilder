import { useEffect, useRef, useState } from 'react'

function shouldShowImmediately() {
  return (
    typeof IntersectionObserver === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Returns a ref and whether its element has scrolled into view (once only).
function useReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(shouldShowImmediately)

  useEffect(() => {
    const node = ref.current
    if (isVisible || !node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  return [ref, isVisible]
}

export default useReveal
