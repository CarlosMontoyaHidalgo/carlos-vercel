'use client'

import { useEffect, useRef } from 'react'
import { clarityTrack } from '@/components/analytics/MicrosoftClarity'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  trackOnce?: boolean
}

export const useSectionTracking = (
  sectionName: string,
  options: UseIntersectionObserverOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null)
  const hasTracked = useRef(false)
  
  const {
    threshold = 0.5,
    rootMargin = '0px',
    trackOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Solo trackear una vez si trackOnce está activado
            if (trackOnce && hasTracked.current) return
            
            clarityTrack.portfolio.sectionView(sectionName)
            hasTracked.current = true
            
            // Si solo queremos trackear una vez, desconectar el observer
            if (trackOnce) {
              observer.unobserve(element)
            }
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [sectionName, threshold, rootMargin, trackOnce])

  return elementRef
}
