'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/providers/LanguageProvider'
import TechHeader from './technologies/TechHeader'
import TechGrid from './technologies/TechGrid'

export default function Technologies() {
  const portfolioData = usePortfolioData()
  const { technologies } = portfolioData
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)

  // Función para traducir categorías
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

  // Convertir las categorías en un array plano de tecnologías
  const allTechnologies = technologies.categories.flatMap(category =>
    category.skills.map(skill => ({
      name: skill.name,
      category: getCategoryTranslation(category.name),
      icon: skill.icon,
      level: (skill.level || '') as '' | 'learning',
      description: `${skill.name} ${t('common.in')} ${getCategoryTranslation(category.name)}`
    }))
  )

  // Tecnologías destacadas que se muestran inicialmente
  const featuredTechNames = [
    'React',
    'Next.js', 
    'TypeScript',
    'Kotlin',
    'Jetpack Compose',
    'Firebase',
    'Node.js',
    'Git',
    'Tailwind CSS',
    'JavaScript',
    'PostgreSQL'
  ]

  // Separar tecnologías destacadas del resto
  const featuredTechnologies = allTechnologies.filter(tech => 
    featuredTechNames.includes(tech.name)
  )
  
  const remainingTechnologies = allTechnologies.filter(tech => 
    !featuredTechNames.includes(tech.name)
  )
  
  // Mostrar solo tecnologías destacadas inicialmente, o todas si showAll es true
  const technologiesToShow = showAll ? allTechnologies : featuredTechnologies
  const hasMoreTechs = remainingTechnologies.length > 0

  return (
    <section id="technologies" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TechHeader 
            title={t('technologies.title')}
            subtitle={t('technologies.subtitle')}
          />
          <TechGrid technologies={technologiesToShow} />
          
          {/* Botón para mostrar más/menos */}
          {hasMoreTechs && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
              >
                {showAll ? (
                  <>
                    <span>{t('common.showLess')}</span>
                    <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>{t('common.showMore')} ({remainingTechnologies.length} {t('common.more')})</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
