'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Database, Lightbulb, Rocket } from 'lucide-react'

interface DevelopmentArea {
  icon: React.ReactNode
  title: string
  description: string
  technologies: string[]
}

const ANIMATION_DURATION = 0.6
const STAGGER_DELAY = 0.1

export default function Research() {
  
  const developmentAreas: DevelopmentArea[] = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Desarrollo Móvil',
      description: 'Creando aplicaciones nativas para Android e iOS con las últimas tecnologías',
      technologies: ['Jetpack Compose', 'Kotlin', 'Java', 'Android Studio', 'Swift (aprendiendo)']
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Desarrollo Web',
      description: 'Construyendo aplicaciones web modernas y responsivas con frameworks actuales',
      technologies: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS']
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend y APIs',
      description: 'Desarrollando servidores robustos y APIs escalables para aplicaciones completas',
      technologies: ['Node.js', 'Express', 'Firebase', 'PostgreSQL']
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Tecnologías Emergentes',
      description: 'Explorando IA, automatización y nuevas herramientas para mantenerse actualizado',
      technologies: ['Swift', 'Dialogflow', 'Make.io', 'n8n']
    }
  ]

  return (
    <section id="research" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Desarrollo Continuo
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-6 h-6 text-blue-500" />
            <span className="text-blue-500 font-semibold">Creando proyectos constantemente</span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Enfocado en desarrollar proyectos diversos que demuestren mis habilidades técnicas y capacidad de adaptación a nuevas tecnologías
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
            Áreas de Desarrollo
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {area.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  {area.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección TFG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
            Proyecto de Investigación - TFG
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                  <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Aplicación Android con IA para Fitness
                  </h4>
                  <p className="text-green-600 dark:text-green-400 font-semibold">Proyecto Presentado y Aprobado</p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Desarrollo completo de una aplicación Android que integra inteligencia artificial para asistencia en rutinas de ejercicio, 
                creación de planes personalizados y seguimiento de progreso del usuario.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Stack Técnico:</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Jetpack Compose', 'MVVM', 'Kotlin', 'Firebase', 'Node.js', 'Express', 'Dialogflow'].map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Características:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Chatbot inteligente con Dialogflow</li>
                    <li>• Rutinas personalizadas</li>
                    <li>• Seguimiento de progreso</li>
                    <li>• Arquitectura escalable MVVM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Valor para las Empresas
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--card)' }}>
              <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Adaptabilidad
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Capacidad de aprender rápidamente nuevas tecnologías y adaptarse a las necesidades específicas del proyecto
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--card)' }}>
              <Code className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Diversidad Técnica
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Experiencia en múltiples plataformas y tecnologías, desde desarrollo web hasta móvil y backend
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--card)' }}>
              <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Crecimiento Continuo
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Mentalidad de mejora constante y pasión por mantenerse actualizado con las últimas tendencias tecnológicas
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
