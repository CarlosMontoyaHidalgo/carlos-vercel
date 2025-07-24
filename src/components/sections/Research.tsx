'use client'

import { motion } from 'framer-motion'
import { Brain, Smartphone, Database, MessageCircle, BarChart3, CheckCircle2 } from 'lucide-react'

export default function Research() {
  const researchHighlights = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Aplicación Android Nativa',
      description: 'Desarrollada con Jetpack Compose y arquitectura MVVM para una experiencia fluida',
      technologies: ['Jetpack Compose', 'MVVM', 'Android Studio', 'Kotlin']
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Inteligencia Artificial Integrada',
      description: 'Chatbot entrenado con Dialogflow para asistencia personalizada en ejercicios',
      technologies: ['Dialogflow', 'NLP', 'Machine Learning']
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend Completo',
      description: 'Servidor robusto con Node.js y Express, integrado con Firebase para datos en tiempo real',
      technologies: ['Node.js', 'Express', 'Firebase', 'REST API']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Sistema de Seguimiento',
      description: 'Monitoreo de progreso del usuario con métricas detalladas y visualizaciones',
      technologies: ['Analytics', 'Progress Tracking', 'Data Visualization', 'User Metrics']
    }
  ]

  const projectFeatures = [
    'Creación y gestión de rutinas de ejercicio personalizadas',
    'Chatbot inteligente para resolver dudas sobre ejercicios',
    'Seguimiento detallado del progreso del usuario',
    'Interfaz moderna y fluida con Jetpack Compose',
    'Sincronización en tiempo real con Firebase',
    'Arquitectura escalable y mantenible con MVVM'
  ]

  return (
    <section id="research" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Trabajo de Fin de Grado
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-green-500 font-semibold">Proyecto Aprobado y Presentado</span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aplicación Android con Inteligencia Artificial para asistencia en rutinas de ejercicio y seguimiento de progreso
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
            Componentes Técnicos Principales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchHighlights.map((highlight, index) => (
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
                  {highlight.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  {highlight.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {highlight.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {highlight.technologies.map((tech, techIndex) => (
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
            Funcionalidades Principales
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projectFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.div>
            ))}
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
              <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Innovación en UX
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Integración de IA conversacional para mejorar la experiencia del usuario y reducir fricciones
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--card)' }}>
              <Smartphone className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Desarrollo Completo
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Experiencia full-stack desde frontend móvil hasta backend con IA, demostrando versatilidad técnica
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--card)' }}>
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Arquitectura Escalable
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Uso de patrones modernos como MVVM y tecnologías cloud-native para proyectos empresariales
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
