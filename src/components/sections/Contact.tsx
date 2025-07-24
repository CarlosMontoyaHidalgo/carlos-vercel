'use client'

import { motion } from 'framer-motion'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import ContactHeader from './contact/ContactHeader'
import ContactGrid from './contact/ContactGrid'
import SocialLinks from './contact/SocialLinks'

export default function Contact() {
  const portfolioData = usePortfolioData()
  const { contact } = portfolioData

  // Crear la información de contacto para ContactGrid
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: contact.email,
      link: `mailto:${contact.email}`
    },
    {
      icon: '',
      title: 'Location',
      value: contact.location,
      link: '#'
    },
    {
      icon: '⚡',
      title: 'Availability',
      value: contact.availability,
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
            title={contact.title}
            subtitle={contact.subtitle}
          />
          <div className="max-w-4xl mx-auto">
            <ContactGrid contactInfo={contactInfo} />
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
