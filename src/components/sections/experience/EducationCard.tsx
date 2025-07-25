'use client'

import { Education } from '@/hooks/usePortfolioData'
import { Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

interface EducationCardProps {
  education: Education
  formatDate: (dateString: string) => string
}

export default function EducationCard({ education, formatDate }: EducationCardProps) {
  const { t } = useLanguage()
  
  return (
    <div 
      className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
      style={{ 
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)'
      }}
    >
      {/* Indicador de destacado */}
      {education.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-300 text-black px-3 py-1 text-xs font-semibold rounded-bl-lg">
          {t('common.featured')}
        </div>
      )}

      <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
        {education.degree}
      </h4>
      <div className="flex items-center mb-2" style={{ color: 'var(--primary)' }}>
        <span className="font-semibold">{education.institution}</span>
      </div>
      <div className="flex items-center mb-3" style={{ color: 'var(--muted-foreground)' }}>
        <MapPin size={16} className="mr-1" />
        {education.location}
      </div>
      <div className="flex items-center mb-4" style={{ color: 'var(--muted-foreground)' }}>
        <Calendar size={16} className="mr-2" />
        <span>
          {formatDate(education.startDate)} - {formatDate(education.endDate)}
        </span>
      </div>

      {education.relevantCourses && education.relevantCourses.length > 0 && (
        <div>
          <h5 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            {t('experience.relevantCourses')}
          </h5>
          <div className="flex flex-wrap gap-2">
            {education.relevantCourses.map((course, index) => (
              <span 
                key={index}
                className="px-2 py-1 rounded text-sm"
                style={{ 
                  backgroundColor: 'var(--muted)',
                  color: 'var(--muted-foreground)'
                }}
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}

      {education.skills && education.skills.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {education.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-lg text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
