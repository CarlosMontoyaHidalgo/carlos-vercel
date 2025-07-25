import { motion, AnimatePresence } from 'framer-motion'
import TechCard from './TechCard'

interface Technology {
  name: string
  category: string
  icon: string
  level: '' | 'learning'
  description: string
}

interface TechGridProps {
  technologies: Technology[]
}

export default function TechGrid({ technologies }: TechGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
      <AnimatePresence mode="popLayout">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              layout: { duration: 0.3 }
            }}
          >
            <TechCard 
              tech={tech}
              index={index}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
