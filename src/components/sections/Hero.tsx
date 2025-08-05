'use client'

import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react'
import { useHeroData, usePersonalInfo, useContactData } from '@/hooks/usePortfolioData'
import { useAnimationConfig } from '@/hooks/useConfig'
import { useLanguage } from '@/providers/LanguageProvider'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import { clarityTrack } from '@/components/analytics/MicrosoftClarity'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const heroData = useHeroData()
  const personalInfo = usePersonalInfo()
  const contactData = useContactData()
  const animationConfig = useAnimationConfig()
  const { t, language } = useLanguage()
  const sectionRef = useSectionTracking('hero')
  
  const typingText = t('hero.typing')

  // Función para manejar la descarga del CV
  const handleDownloadCV = () => {
    clarityTrack.portfolio.cvDownload(language)
    const cvFile = language === 'es' ? '/cv-carlos-montoya-es.pdf' : '/cv-carlos-montoya-en.pdf'
    const link = document.createElement('a')
    link.href = cvFile
    link.download = `CV-Carlos-Montoya-${language === 'es' ? 'ES' : 'EN'}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Función para manejar clicks en botones
  const handleButtonClick = (button: any) => {
    if (button.href === 'download-cv') {
      handleDownloadCV()
    } else {
      document.querySelector(button.href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  useEffect(() => {
    if (!animationConfig.enableHeroTyping) {
      setDisplayText(typingText)
      return
    }

    let index = 0
    const timer = setInterval(() => {
      setDisplayText(typingText.slice(0, index))
      index++
      if (index > typingText.length) {
        clearInterval(timer)
      }
    }, animationConfig.typingSpeed)
    
    return () => clearInterval(timer)
  }, [typingText, animationConfig.enableHeroTyping, animationConfig.typingSpeed])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 px-4 sm:px-6 lg:px-8">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Elementos decorativos - responsivos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center hero-content">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#ffffff' }}>
              {t('hero.greeting')}{' '}
              <span className="drop-shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            
            <div className="h-12 sm:h-16 flex items-center justify-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium drop-shadow-lg" style={{ color: '#ffffff' }}>
                {displayText}
                <span className="animate-pulse ml-1" style={{ color: '#fef08a' }}>|</span>
              </p>
            </div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-md" style={{ color: '#ffffff' }}>
            {t('hero.description')}
          </p>
          
          {/* Social Links - más pequeños en móvil */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8 social-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-3 sm:p-4 rounded-full hover:scale-110 transition-all duration-300"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fef08a' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff' }}
              aria-label="GitHub"
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-3 sm:p-4 rounded-full hover:scale-110 transition-all duration-300"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#93c5fd' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff' }}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="glass-effect p-3 sm:p-4 rounded-full hover:scale-110 transition-all duration-300"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#86efac' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff' }}
              aria-label="Email"
            >
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 cta-buttons">
            {heroData.ctaButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button)}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 z-10 flex items-center gap-2 justify-center ${
                  button.type === 'primary' 
                    ? 'shadow-lg border' 
                    : button.href === 'download-cv'
                    ? 'shadow-lg border-2 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'glass-effect border-2'
                }`}
                style={button.type === 'primary' ? { 
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                } : button.href === 'download-cv' ? {
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                } : { 
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => { 
                  if (button.type === 'primary') {
                    e.currentTarget.style.backgroundColor = '#374151'
                  } else if (button.href === 'download-cv') {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.8)'
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                  }
                }}
                onMouseLeave={(e) => { 
                  if (button.type === 'primary') {
                    e.currentTarget.style.backgroundColor = '#000000'
                  } else if (button.href === 'download-cv') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  } else {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                {button.href === 'download-cv' && <Download size={20} />}
                {button.href === '#projects' ? t('hero.viewProjects') : 
                 button.href === '#contact' ? t('hero.contact') : 
                 button.href === 'download-cv' ? t('hero.downloadCV') :
                 button.text}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator - movido fuera del div principal */}
        <br />
        <br />
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-colors animate-bounce z-10 scroll-indicator drop-shadow-lg"
          style={{ color: '#ffffff' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fef08a' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff' }}
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  )
}
