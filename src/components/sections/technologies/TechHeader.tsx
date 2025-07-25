import { motion } from 'framer-motion'

interface TechHeaderProps {
  title: string
  subtitle: string
}

export default function TechHeader({ title, subtitle }: TechHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
        {title}
      </h2>
      <p className="text-lg max-w-3xl mx-auto mb-6" style={{ color: 'var(--muted-foreground)' }}>
        {subtitle}
      </p>
      
      {/* Leyenda de tags */}
      <div className="flex items-center justify-center gap-6 text-sm" style={{ color: 'var(--muted-foreground)' }}>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
            Principal
          </span>
          <span>Tecnologías que domino</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white">
            Aprendiendo
          </span>
          <span>En proceso de aprendizaje</span>
        </div>
      </div>
    </motion.div>
  )
}
