import { motion } from 'framer-motion'

interface ContactHeaderProps {
  title: string
  subtitle: string
}

export default function ContactHeader({ title, subtitle }: ContactHeaderProps) {
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
      <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
        {subtitle}
      </p>
    </motion.div>
  )
}
