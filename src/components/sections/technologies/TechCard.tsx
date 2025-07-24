import { motion } from 'framer-motion'

interface Technology {
  name: string
  category: string
  icon: string
  description: string
}

interface TechCardProps {
  tech: Technology
  index: number
}

export default function TechCard({ tech, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {tech.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
        {tech.name}
      </h3>
      <span 
        className="inline-block px-3 py-1 text-xs rounded-full mb-3"
        style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
      >
        {tech.category}
      </span>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {tech.description}
      </p>
    </motion.div>
  )
}
