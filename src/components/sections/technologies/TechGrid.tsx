import { motion } from 'framer-motion'
import TechCard from './TechCard'

interface Technology {
  name: string
  category: string
  icon: string
  description: string
}

interface TechGridProps {
  technologies: Technology[]
}

export default function TechGrid({ technologies }: TechGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
    >
      {technologies.map((tech, index) => (
        <TechCard 
          key={tech.name}
          tech={tech}
          index={index}
        />
      ))}
    </motion.div>
  )
}
