'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone, GraduationCap, Apple } from 'lucide-react'

export default function About() {
  const skills = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, Tailwind CSS'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Node.js, Express, MongoDB, PostgreSQL'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Android Development',
      description: 'Kotlin, Java, Android Studio, Material Design'
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: 'iOS Development',
      description: 'Swift, SwiftUI, Xcode (Aprendiendo)'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'DevOps & Tools',
      description: 'Git, Docker, AWS, Vercel'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Investigación',
      description: 'TFG en desarrollo, Machine Learning'
    }
  ]

  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Sobre mí
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Soy un desarrollador apasionado por la tecnología y la innovación. 
            Me encanta crear soluciones digitales que resuelvan problemas reales 
            y mejoren la experiencia de los usuarios.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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
                Estoy trabajando en mi Trabajo de Fin de Grado (TFG), enfocado en 
                aplicaciones innovadoras de machine learning y desarrollo móvil, 
                lo que me permite combinar investigación académica con implementación práctica.
              </p>
              <p>
                Me mantengo constantemente actualizado con las últimas tecnologías 
                y mejores prácticas, participando en la comunidad de desarrolladores 
                y contribuyendo a proyectos open source.
              </p>
            </div>
          </motion.div>

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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}
