import portfolioData from '@/data/portfolio.json'

// Tipos TypeScript para mejor desarrollo
export interface PersonalInfo {
  name: string
  fullName: string
  title: string
  description: string
  email: string
  github: string
  linkedin: string
  location: string
}

export interface NavigationItem {
  name: string
  href: string
}

export interface CTAButton {
  text: string
  href: string
  type: 'primary' | 'secondary'
}

export interface HeroData {
  greeting: string
  typingText: string
  description: string
  ctaButtons: CTAButton[]
}

export interface AboutData {
  title: string
  description: string
  highlights: string[]
  experience: {
    years: string
    description: string
  }
}

export interface Skill {
  name: string
  level: number
  icon: string
}

export interface TechCategory {
  name: string
  icon: string
  skills: Skill[]
}

export interface TechnologiesData {
  title: string
  subtitle: string
  categories: TechCategory[]
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string | null
  featured: boolean
}

export interface ProjectsData {
  title: string
  subtitle: string
  items: Project[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ContactData {
  title: string
  subtitle: string
  description: string
  email: string
  phone: string
  location: string
  availability: string
  responseTime: string
  socialLinks: SocialLink[]
}

export interface WorkExperience {
  id: number
  position: string
  company: string
  location: string
  type: string
  startDate: string
  endDate: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
  featured: boolean
}

export interface Education {
  id: number
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
  relevantCourses?: string[]
  certificateId?: string
  skills?: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId: string
  url: string
  skills: string[]
}

export interface ExperienceData {
  title: string
  subtitle: string
  items: WorkExperience[]
  education: Education[]
  certifications: Certification[]
}

export interface PortfolioData {
  personal: PersonalInfo
  navigation: NavigationItem[]
  hero: HeroData
  about: AboutData
  experience: ExperienceData
  technologies: TechnologiesData
  projects: ProjectsData
  contact: ContactData
}

// Hook personalizado para usar los datos del portfolio
export const usePortfolioData = (): PortfolioData => {
  return portfolioData as PortfolioData
}

// Hooks específicos para cada sección
export const usePersonalInfo = (): PersonalInfo => {
  return portfolioData.personal as PersonalInfo
}

export const useNavigation = (): NavigationItem[] => {
  return portfolioData.navigation as NavigationItem[]
}

export const useHeroData = (): HeroData => {
  return portfolioData.hero as HeroData
}

export const useAboutData = (): AboutData => {
  return portfolioData.about as AboutData
}

export const useExperienceData = (): ExperienceData => {
  return portfolioData.experience as ExperienceData
}

export const useTechnologiesData = (): TechnologiesData => {
  return portfolioData.technologies as TechnologiesData
}

export const useProjectsData = (): ProjectsData => {
  return portfolioData.projects as ProjectsData
}

export const useContactData = (): ContactData => {
  return portfolioData.contact as ContactData
}

// Funciones helper para obtener datos específicos
export const getFeaturedProjects = (): Project[] => {
  return portfolioData.projects.items.filter(project => project.featured)
}

export const getAllProjects = (): Project[] => {
  return portfolioData.projects.items
}

export const getProjectById = (id: number): Project | undefined => {
  return portfolioData.projects.items.find(project => project.id === id)
}

export const getTechnologiesByCategory = (category: string): Skill[] => {
  const techCategory = portfolioData.technologies.categories.find(
    cat => cat.name.toLowerCase() === category.toLowerCase()
  )
  return techCategory?.skills || []
}

// Funciones helper para experiencia
export const getFeaturedExperience = (): WorkExperience[] => {
  return portfolioData.experience.items.filter(exp => exp.featured)
}

export const getAllExperience = (): WorkExperience[] => {
  return portfolioData.experience.items
}

export const getExperienceById = (id: number): WorkExperience | undefined => {
  return portfolioData.experience.items.find(exp => exp.id === id)
}

export const getEducation = (): Education[] => {
  return portfolioData.experience.education
}

export const getCertifications = (): Certification[] => {
  return portfolioData.experience.certifications
}

export const getRecentExperience = (limit: number = 3): WorkExperience[] => {
  return portfolioData.experience.items
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, limit)
}
