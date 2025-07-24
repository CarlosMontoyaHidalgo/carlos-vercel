import configData from '@/data/config.json'

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  keywords: string[]
  author: string
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark'
  enableThemeToggle: boolean
  colors: {
    primary: string
    secondary: string
    accent: string
    success: string
    warning: string
    error: string
  }
}

export interface Features {
  enableContactForm: boolean
  enableBlog: boolean
  enableMultiLanguage: boolean
  enableAnalytics: boolean
  showLastUpdated: boolean
}

export interface SocialConfig {
  showInFooter: boolean
  showInHero: boolean
  showInContact: boolean
}

export interface AnimationConfig {
  enableHeroTyping: boolean
  typingSpeed: number
  enableHoverEffects: boolean
  enableScrollAnimations: boolean
}

export interface LayoutConfig {
  enableSidebar: boolean
  defaultNavigationType: 'header' | 'sidebar'
  enableMobileMenu: boolean
}

export interface Config {
  siteConfig: SiteConfig
  theme: ThemeConfig
  features: Features
  social: SocialConfig
  animations: AnimationConfig
  layout: LayoutConfig
}

// Hook principal para la configuración
export const useConfig = (): Config => {
  return configData as Config
}

// Hooks específicos para cada sección de configuración
export const useSiteConfig = (): SiteConfig => {
  return configData.siteConfig as SiteConfig
}

export const useThemeConfig = (): ThemeConfig => {
  return configData.theme as ThemeConfig
}

export const useFeatures = (): Features => {
  return configData.features as Features
}

export const useSocialConfig = (): SocialConfig => {
  return configData.social as SocialConfig
}

export const useAnimationConfig = (): AnimationConfig => {
  return configData.animations as AnimationConfig
}

export const useLayoutConfig = (): LayoutConfig => {
  return configData.layout as LayoutConfig
}
