// Tipos compartidos para todo el proyecto
export interface Skill {
  icon: React.ReactNode
  title: string
  description: string
  learning?: boolean
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
  featured?: boolean
}

export interface ContactInfo {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

// Tipos para animaciones
export interface AnimationConfig {
  initial?: object
  animate?: object
  whileInView?: object
  transition?: object
  viewport?: object
}

// Constantes para animaciones comunes
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true }
}

export const FADE_IN_LEFT = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true }
}

export const STAGGER_CHILDREN = {
  transition: { staggerChildren: 0.1 }
}
