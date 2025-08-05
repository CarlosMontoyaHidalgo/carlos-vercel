'use client'

import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useState } from 'react'

export default function DownloadCVButton() {
  const { t, language } = useLanguage()
  const [showOptions, setShowOptions] = useState(false)

  const handleDownloadPDF = () => {
    const cvFile = language === 'es' ? '/cv-carlos-montoya-es.pdf' : '/cv-carlos-montoya-en.pdf'
    const link = document.createElement('a')
    link.href = cvFile
    link.download = `CV-Carlos-Montoya-${language === 'es' ? 'ES' : 'EN'}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewCV = () => {
    const cvFile = language === 'es' ? '/cv-carlos-montoya-es.html' : '/cv-carlos-montoya-en.html'
    window.open(cvFile, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="relative"
    >
      {!showOptions ? (
        <motion.button
          onClick={() => setShowOptions(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          style={{ 
            backgroundColor: 'var(--primary)', 
            color: 'var(--primary-foreground)',
            border: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.borderColor = 'var(--primary)'
            e.currentTarget.style.color = 'var(--primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)'
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.color = 'var(--primary-foreground)'
          }}
        >
          <Download 
            size={24} 
            className="transition-transform duration-300 group-hover:animate-bounce" 
          />
          {t('hero.downloadCV')}
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.button
            onClick={handleViewCV}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--secondary)', 
              color: 'var(--secondary-foreground)',
              border: '1px solid var(--border)'
            }}
          >
            <Eye size={20} />
            {language === 'es' ? 'Ver CV Online' : 'View CV Online'}
          </motion.button>
          
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--primary-foreground)'
            }}
          >
            <Download size={20} />
            {language === 'es' ? 'Descargar PDF' : 'Download PDF'}
          </motion.button>

          <motion.button
            onClick={() => setShowOptions(false)}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--muted)', 
              color: 'var(--muted-foreground)'
            }}
          >
            ✕
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
