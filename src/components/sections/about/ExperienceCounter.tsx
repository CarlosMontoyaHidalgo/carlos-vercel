import { motion } from 'framer-motion'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/providers/LanguageProvider'

export default function ExperienceCounter() {
  const { about } = usePortfolioData()
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-1">
        <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--card)' }}>
          <div className="text-center px-4">
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              {t('experience.internshipsTfg')}
            </div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {t('experience.practicalExperience')}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
