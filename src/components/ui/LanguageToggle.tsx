import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/providers/LanguageProvider'

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
      style={{ 
        backgroundColor: 'var(--muted)', 
        color: 'var(--foreground)',
        border: '1px solid var(--border)'
      }}
      title={t('common.language')}
      aria-label={`${t('common.language')}: ${language.toUpperCase()}`}
    >
      <Globe size={16} />
      <span className="text-sm font-medium">
        {language.toUpperCase()}
      </span>
    </button>
  )
}

export default LanguageToggle
