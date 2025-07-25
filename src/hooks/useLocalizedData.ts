import { useLanguage } from '@/providers/LanguageProvider'
import { useEffect, useState } from 'react'

// Tipos para los datos de experiencia
export interface ExperienceItem {
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

export interface EducationItem {
  id: number
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  duration: string
  description: string
  achievements: string[]
  gpa?: string
  status: string
}

export interface ExperienceData {
  title: string
  subtitle: string
  items: ExperienceItem[]
}

export interface EducationData {
  title: string
  subtitle: string
  items: EducationItem[]
}

export interface LocalizedExperienceData {
  experience: ExperienceData
  education: EducationData
}

export const useLocalizedExperienceData = () => {
  const { language } = useLanguage()
  const [data, setData] = useState<LocalizedExperienceData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const experienceModule = await import(`@/data/experience-${language}.json`)
        setData(experienceModule.default)
      } catch (error) {
        console.error(`Error loading experience data for ${language}:`, error)
        // Fallback a español
        try {
          const fallbackModule = await import('@/data/experience-es.json')
          setData(fallbackModule.default)
        } catch (fallbackError) {
          console.error('Error loading fallback experience data:', fallbackError)
        }
      }
    }

    loadData()
  }, [language])

  return data
}

export const useLocalizedExperience = () => {
  const data = useLocalizedExperienceData()
  return data?.experience || null
}

export const useLocalizedEducation = () => {
  const data = useLocalizedExperienceData()
  return data?.education || null
}
