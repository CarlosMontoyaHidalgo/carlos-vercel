'use client'

import { useLocalizedExperience, useLocalizedEducation } from '@/hooks/useLocalizedData'
import { useLanguage } from '@/providers/LanguageProvider'
import { GraduationCap, Briefcase } from 'lucide-react'
import WorkExperienceCard from './experience/WorkExperienceCard'
import EducationCard from './experience/EducationCard'
import SectionHeader from './experience/SectionHeader'

export default function Experience() {
  const experienceData = useLocalizedExperience()
  const educationData = useLocalizedEducation()
  const { t, language } = useLanguage()

  const formatDate = (dateString: string) => {
    if (dateString === 'Actualidad' || dateString === 'Present') return t('experience.current')
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  if (!experienceData || !educationData) {
    return <div>{t('common.loading')}</div>
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            {t('experience.title')}
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--muted-foreground)' }}>
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Experiencia Laboral */}
        <div className="mb-20">
          <SectionHeader 
            icon={<Briefcase className="mr-3" size={28} style={{ color: 'var(--primary)' }} />}
            title={t('experience.workExperience')}
          />

          <div className="space-y-8">
            {experienceData.items.map((exp) => (
              <WorkExperienceCard 
                key={exp.id}
                experience={exp}
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>

        {/* Educación */}
        <div className="mb-20">
          <SectionHeader 
            icon={<GraduationCap className="mr-3" size={28} style={{ color: 'var(--primary)' }} />}
            title={t('experience.education')}
          />

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {educationData.items.map((edu) => (
              <EducationCard 
                key={edu.id}
                education={edu}
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
