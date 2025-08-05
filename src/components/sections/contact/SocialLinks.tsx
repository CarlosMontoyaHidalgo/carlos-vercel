import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { clarityTrack } from '@/components/analytics/MicrosoftClarity'

interface SocialLink {
  icon: React.ReactNode
  name: string
  url: string
  color: string
}

interface SocialLinksProps {
  socialLinks: SocialLink[]
}

const getIconComponent = (name: string) => {
  const normalizedName = name.toLowerCase()
  
  if (normalizedName.includes('github')) return <Github size={24} />
  if (normalizedName.includes('linkedin')) return <Linkedin size={24} />
  if (normalizedName.includes('email') || normalizedName.includes('mail')) return <Mail size={24} />
  
  // Fallback al icono original si no coincide con ninguno
  return null
}

const getColorClass = (name: string) => {
  const normalizedName = name.toLowerCase()
  
  if (normalizedName.includes('github')) return 'hover:bg-gray-700 hover:text-white'
  if (normalizedName.includes('linkedin')) return 'hover:bg-blue-600 hover:text-white'
  if (normalizedName.includes('email') || normalizedName.includes('mail')) return 'hover:bg-red-500 hover:text-white'
  
  return 'hover:bg-blue-500 hover:text-white'
}

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex justify-center space-x-6"
    >
      {socialLinks.map((social, index) => {
        const IconComponent = getIconComponent(social.name)
        const colorClass = getColorClass(social.name)
        
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => clarityTrack.portfolio.contactClick(social.name)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${colorClass}`}
            style={{ 
              backgroundColor: 'var(--card)', 
              border: '1px solid var(--border)',
              color: 'var(--foreground)'
            }}
            aria-label={social.name}
          >
            {IconComponent || social.icon}
          </motion.a>
        )
      })}
    </motion.div>
  )
}
