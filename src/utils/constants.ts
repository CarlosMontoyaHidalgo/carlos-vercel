/**
 * Application constants
 */

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Tecnologías', href: '#technologies' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Contacto', href: '#contact' },
  { name: 'Experiencia', href: '#experience'}
] as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/CarlosMontoyaHidalgo',
  linkedin: 'https://www.linkedin.com/in/carlos-alberto-montoya-hidalgo-258a57313/',
  email: 'carlosmh561@gmail.com',
} as const

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export const THEME_STORAGE_KEY = 'portfolio-theme'
export const NAVIGATION_STORAGE_KEY = 'navigation-type'

export const TYPING_SPEED = 100 // milliseconds per character
export const SCROLL_OFFSET = 80 // pixels
