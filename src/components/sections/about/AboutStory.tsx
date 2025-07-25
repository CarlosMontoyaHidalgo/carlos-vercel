import { motion } from 'framer-motion'
import { useAboutData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/providers/LanguageProvider'

export default function AboutStory() {
  const aboutData = useAboutData()
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
        {t('about.myStory')}
      </h3>
      <div className="space-y-4" style={{ color: 'var(--muted-foreground)' }}>
        <p>
          {t('about.story1')}
        </p>
        <p>
          {t('about.story2')}
        </p>
        <p>
          {t('about.story3')}
        </p>
        <p>
          {t('about.story4')}
        </p>
        <p className="font-medium text-lg mt-6 p-4 rounded-lg" style={{ 
          backgroundColor: 'var(--muted)', 
          color: 'var(--foreground)',
          border: '1px solid var(--border)'
        }}>
          💡 {t('about.philosophy')}
        </p>
      </div>
    </motion.div>
  )
}
