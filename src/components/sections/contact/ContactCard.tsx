import { motion } from 'framer-motion'

interface ContactInfo {
  icon: React.ReactNode
  title: string
  value: string
  link: string
}

interface ContactCardProps {
  contact: ContactInfo
  index: number
}

export default function ContactCard({ contact, index }: ContactCardProps) {
  return (
    <motion.a
      href={contact.link}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="block p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--primary)' }}>
        {contact.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
        {contact.title}
      </h3>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {contact.value}
      </p>
    </motion.a>
  )
}
