import { motion } from 'framer-motion'
import { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
  index: number
}

const ANIMATION_DELAY_MULTIPLIER = 0.1
const ANIMATION_DURATION = 0.8

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION, delay: index * ANIMATION_DELAY_MULTIPLIER }}
      viewport={{ once: true }}
      className="p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Indicador de aprendiendo */}
      {skill.learning && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-blue-400 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
          Aprendiendo
        </div>
      )}

      <div className="mb-4 flex justify-center" style={{ color: 'var(--primary)' }}>
        {skill.icon}
      </div>
      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
        {skill.title}
      </h4>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        {skill.description}
      </p>
    </motion.div>
  )
}
