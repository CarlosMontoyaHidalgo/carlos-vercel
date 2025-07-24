/**
 * Utility functions for the application
 */

/**
 * Scroll to a section smoothly
 * @param href - The target element selector (e.g., '#about')
 * @param callback - Optional callback to execute after scrolling
 */
export const scrollToSection = (href: string, callback?: () => void) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    if (callback) {
      // Execute callback after a delay to ensure scroll is complete
      setTimeout(callback, 300)
    }
  }
}

/**
 * Debounce function to limit how often a function can be called
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if the user prefers reduced motion
 * @returns Boolean indicating if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get a random number between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Format a date string
 * @param date - Date to format
 * @param locale - Locale for formatting (default: 'es-ES')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, locale: string = 'es-ES'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Check if an element is in viewport
 * @param element - Element to check
 * @returns Boolean indicating if element is in viewport
 */
export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
