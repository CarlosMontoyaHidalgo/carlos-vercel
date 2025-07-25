import { useLanguage } from '@/providers/LanguageProvider'

interface Technology {
  name: string
  category: string
  icon: string
  level: '' | 'learning'
  description: string
}

interface TechCardProps {
  tech: Technology
  index: number
}

export default function TechCard({ tech, index }: TechCardProps) {
  const { t } = useLanguage()
  
  const getCategoryTranslation = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Frontend': t('technologies.frontend'),
      'Backend': t('technologies.backend'),
      'DevOps & Tools': t('technologies.devops'),
      'Móvil': t('technologies.mobile'),
      'Automatización': t('technologies.automationCategory')
    }
    return categoryMap[category] || category
  }
  
  const getLevelTag = (level: '' | 'learning') => {
    if (level === 'learning') {
      return {
        text: t('research.learning'),
        bgColor: 'bg-amber-500',
        textColor: 'text-white'
      }
    } else {
      return null // Sin etiqueta
    }
  }

  const levelTag = getLevelTag(tech.level)

  return (
    <div
      className="group p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 relative w-full h-full"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Tag en la esquina superior derecha - solo si hay levelTag */}
      {levelTag && (
        <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold rounded-full ${levelTag.bgColor} ${levelTag.textColor}`}>
          {levelTag.text}
        </div>
      )}
      
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {tech.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
        {tech.name}
      </h3>
      <span 
        className="inline-block px-3 py-1 text-xs rounded-full mb-3"
        style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
      >
        {getCategoryTranslation(tech.category)}
      </span>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {tech.description}
      </p>
    </div>
  )
}
