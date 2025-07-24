'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Technologies() {
  const technologies = [
    {
      name: 'React',
      category: 'Frontend',
      icon: '⚛️',
      description: 'Biblioteca para construir interfaces de usuario'
    },
    {
      name: 'Next.js',
      category: 'Framework',
      icon: '▲',
      description: 'Framework de React para producción'
    },
    {
      name: 'TypeScript',
      category: 'Language',
      icon: '🔷',
      description: 'JavaScript con tipado estático'
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling',
      icon: '🎨',
      description: 'Framework CSS utility-first'
    },
    {
      name: 'Node.js',
      category: 'Backend',
      icon: '🟢',
      description: 'Runtime de JavaScript para el servidor'
    },
    {
      name: 'MongoDB',
      category: 'Database',
      icon: '🍃',
      description: 'Base de datos NoSQL'
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      icon: '🐘',
      description: 'Base de datos relacional'
    },
    {
      name: 'Kotlin',
      category: 'Mobile',
      icon: '🤖',
      description: 'Lenguaje para desarrollo Android'
    },
    {
      name: 'Swift',
      category: 'Mobile',
      icon: '🍎',
      description: 'Lenguaje para desarrollo iOS (Aprendiendo)'
    },
    {
      name: 'Android Studio',
      category: 'Tools',
      icon: '📱',
      description: 'IDE para desarrollo Android'
    },
    {
      name: 'Xcode',
      category: 'Tools',
      icon: '🔨',
      description: 'IDE para desarrollo iOS'
    },
    {
      name: 'Python',
      category: 'Language',
      icon: '🐍',
      description: 'Para Machine Learning y TFG'
    },
    {
      name: 'TensorFlow',
      category: 'ML',
      icon: '🧠',
      description: 'Framework de Machine Learning'
    },
    {
      name: 'Git',
      category: 'Tools',
      icon: '📚',
      description: 'Control de versiones'
    },
    {
      name: 'Docker',
      category: 'DevOps',
      icon: '🐋',
      description: 'Containerización de aplicaciones'
    },
    {
      name: 'AWS',
      category: 'Cloud',
      icon: '☁️',
      description: 'Servicios en la nube'
    },
    {
      name: 'Vercel',
      category: 'Deployment',
      icon: '▲',
      description: 'Plataforma de deployment'
    },
    {
      name: 'Firebase',
      category: 'Backend',
      icon: '🔥',
      description: 'Plataforma de desarrollo de Google'
    }
  ]

  const categories = ['All', ...Array.from(new Set(technologies.map(tech => tech.category)))]

  return (
    <section id="technologies" className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Tecnologías
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Las herramientas y tecnologías que uso para crear experiencias digitales excepcionales.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                  {tech.name}
                </h3>
                <div className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: 'var(--primary)' }}>
                  {tech.category}
                </div>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Nivel de Experiencia
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { skill: 'Frontend Development', level: 90 },
              { skill: 'Backend Development', level: 85 },
              { skill: 'Database Design', level: 80 },
              { skill: 'DevOps & Deployment', level: 75 }
            ].map((item, index) => (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.skill}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {item.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
