'use client'

import { motion } from 'framer-motion'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import TechHeader from './technologies/TechHeader'
import TechGrid from './technologies/TechGrid'

export default function Technologies() {
  const portfolioData = usePortfolioData()
  const { technologies } = portfolioData

  // Convertir las categorías en un array plano de tecnologías
  const allTechnologies = technologies.categories.flatMap(category =>
    category.skills.map(skill => ({
      name: skill.name,
      category: category.name,
      icon: skill.icon,
      description: `${skill.name} en ${category.name}`
    }))
  )

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
            title={technologies.title}
            subtitle={technologies.subtitle}
          />
          <TechGrid technologies={allTechnologies} />
        </motion.div>
      </div>
    </section>
  )
}
