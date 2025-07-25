'use client'

import { WorkExperience } from '@/hooks/usePortfolioData'
import { Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

interface WorkExperienceCardProps {
  experience: WorkExperience
  formatDate: (dateString: string) => string
}

export default function WorkExperienceCard({ experience, formatDate }: WorkExperienceCardProps) {
  const { t } = useLanguage()
  
  return (
    <div 
      className="glass-effect rounded-xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)'
      }}
    >
      {/* Indicador de destacado */}
      {experience.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-300 text-black px-3 py-1 text-xs font-semibold rounded-bl-lg">
          {t('common.featured')}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
        <div className="flex-1 mb-4 lg:mb-0">
          <h4 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            {experience.position}
          </h4>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <span className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
              {experience.company}
            </span>
            <div className="flex items-center" style={{ color: 'var(--muted-foreground)' }}>
              <MapPin size={16} className="mr-1" />
              {experience.location}
            </div>
            <span className="px-3 py-1 rounded-full text-sm" style={{ 
              backgroundColor: 'var(--muted)',
              color: 'var(--muted-foreground)'
            }}>
              {experience.type}
            </span>
          </div>
          <div className="flex items-center mb-4" style={{ color: 'var(--muted-foreground)' }}>
            <Calendar size={16} className="mr-2" />
            <span>
              {formatDate(experience.startDate)} - {formatDate(experience.endDate)} ({experience.duration})
            </span>
          </div>
        </div>
      </div>

      <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
        {experience.description}
      </p>

      {/* Logros */}
      <div className="mb-6">
        <h5 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
          {t('experience.mainAchievements')}
        </h5>
        <ul className="space-y-2">
          {experience.achievements.map((achievement, achIndex) => (
            <li key={achIndex} className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span style={{ color: 'var(--muted-foreground)' }}>
                {achievement}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tecnologías */}
      <div>
        <h5 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
          {t('experience.usedTechnologies')}
        </h5>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
