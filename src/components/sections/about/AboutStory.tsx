import { motion } from 'framer-motion'
import { useAboutData } from '@/hooks/usePortfolioData'

export default function AboutStory() {
  const aboutData = useAboutData()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
        Mi Historia
      </h3>
      <div className="space-y-4" style={{ color: 'var(--muted-foreground)' }}>
        <p>
          Comencé mi viaje en el desarrollo tecnológico hace varios años, 
          motivado por la curiosidad de entender cómo funcionan las 
          aplicaciones que usamos diariamente.
        </p>
        <p>
          Mi experiencia abarca desde desarrollo web con React y Next.js hasta 
          desarrollo móvil nativo para Android con Kotlin. Actualmente estoy 
          expandiendo mis conocimientos aprendiendo desarrollo iOS con Swift y SwiftUI.
        </p>
        <p>
          Terminé mi Trabajo de Fin de Grado (TFG), enfocado en 
          aplicaciones innovadoras de machine learning y desarrollo móvil, 
          lo que me permite combinar investigación académica con implementación práctica.
        </p>
        <p>
          Me mantengo constantemente actualizado con las últimas tecnologías 
          y mejores prácticas.
        </p>
        <p className="font-medium text-lg mt-6 p-4 rounded-lg" style={{ 
          backgroundColor: 'var(--muted)', 
          color: 'var(--foreground)',
          border: '1px solid var(--border)'
        }}>
          💡 {aboutData.philosophy}
        </p>
      </div>
    </motion.div>
  )
}
