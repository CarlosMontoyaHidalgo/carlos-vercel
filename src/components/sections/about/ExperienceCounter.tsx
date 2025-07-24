import { motion } from 'framer-motion'

export default function ExperienceCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-1">
        <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--card)' }}>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>3+</div>
            <div style={{ color: 'var(--muted-foreground)' }}>Años de experiencia</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
