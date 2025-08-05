'use client'

import { motion } from 'framer-motion'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/providers/LanguageProvider'
import ContactHeader from './contact/ContactHeader'
import ContactGrid from './contact/ContactGrid'
import SocialLinks from './contact/SocialLinks'
import DownloadCVButton from './contact/DownloadCVButton'

export default function Contact() {
  const portfolioData = usePortfolioData()
  const { contact } = portfolioData
  const { t } = useLanguage()

  // Crear la información de contacto para ContactGrid
  const contactInfo = [
    {
      icon: '📧',
      title: t('contact.email'),
      value: contact.email,
      link: `mailto:${contact.email}`
    },
    {
      icon: '📍',
      title: t('contact.location'),
      value: t('contact.locationValue'),
      link: '#'
    },
    {
      icon: '⚡',
      title: t('contact.availabilityTitle'),
      value: t('contact.availabilityValue'),
      link: '#'
    }
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ContactHeader 
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
          />
          <div className="max-w-4xl mx-auto">
            <ContactGrid contactInfo={contactInfo} />
            
            {/* Botón de descarga del CV */}
            <div className="mt-12 text-center">
              <DownloadCVButton />
            </div>
            
            <div className="mt-12 text-center">
              <SocialLinks socialLinks={contact.socialLinks.map(link => ({
                ...link,
                icon: link.icon,
                color: '#6366f1' // Color por defecto
              }))} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
