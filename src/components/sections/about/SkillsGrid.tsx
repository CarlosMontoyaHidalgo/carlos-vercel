import { motion } from 'framer-motion'
import SkillCard from './SkillCard'

interface Skill {
  icon: React.ReactNode
  title: string
  description: string
  learning?: boolean
}

interface SkillsGridProps {
  skills: Skill[]
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {skills.map((skill, index) => (
        <SkillCard 
          key={skill.title}
          skill={skill}
          index={index}
        />
      ))}
    </motion.div>
  )
}
