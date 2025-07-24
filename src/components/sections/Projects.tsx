'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      title: 'Pokédex Kanto',
      description: 'Una aplicación web interactiva que muestra información detallada de los Pokémon de la primera generación.',
      image: '/placeholder-pokedex.jpg',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API REST'],
      github: 'https://github.com/CarlosMontoyaHidalgo/pokedex',
      demo: 'https://your-pokedex-demo.vercel.app',
      category: 'Web App'
    },
    {
      title: 'Portfolio Personal',
      description: 'Mi sitio web personal desarrollado con las últimas tecnologías web modernas.',
      image: '/placeholder-portfolio.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/CarlosMontoyaHidalgo/portfolio',
      demo: 'https://carlos-portfolio.vercel.app',
      category: 'Website'
    },
    {
      title: 'Sistema de Gestión',
      description: 'Aplicación full-stack para gestión de usuarios con autenticación y base de datos.',
      image: '/placeholder-management.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/CarlosMontoyaHidalgo/management-system',
      demo: 'https://management-demo.vercel.app',
      category: 'Full Stack'
    },
    {
      title: 'E-commerce Platform',
      description: 'Plataforma de comercio electrónico con carrito de compras y procesamiento de pagos.',
      image: '/placeholder-ecommerce.jpg',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
      github: 'https://github.com/CarlosMontoyaHidalgo/ecommerce',
      demo: 'https://ecommerce-demo.vercel.app',
      category: 'E-commerce'
    },
    {
      title: 'Task Manager',
      description: 'Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real.',
      image: '/placeholder-tasks.jpg',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      github: 'https://github.com/CarlosMontoyaHidalgo/task-manager',
      demo: 'https://tasks-demo.vercel.app',
      category: 'Productivity'
    },
    {
      title: 'Weather App',
      description: 'Aplicación del clima con predicciones y mapas interactivos.',
      image: '/placeholder-weather.jpg',
      technologies: ['Vue.js', 'Weather API', 'Chart.js', 'Leaflet'],
      github: 'https://github.com/CarlosMontoyaHidalgo/weather-app',
      demo: 'https://weather-demo.vercel.app',
      category: 'Mobile App'
    }
  ]

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Proyectos
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Una selección de proyectos que demuestran mis habilidades y experiencia en desarrollo web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-2">
                      {project.category === 'Web App' && '🎮'}
                      {project.category === 'Website' && '🌐'}
                      {project.category === 'Full Stack' && '💻'}
                      {project.category === 'E-commerce' && '🛒'}
                      {project.category === 'Productivity' && '📋'}
                      {project.category === 'Mobile App' && '📱'}
                    </div>
                    <div className="text-sm opacity-80">{project.category}</div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Código</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ¿Interesado en ver más de mi trabajo?
          </p>
          <a
            href="https://github.com/CarlosMontoyaHidalgo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
          >
            <Github className="mr-2 w-5 h-5" />
            Ver todos mis proyectos
          </a>
        </motion.div>
      </div>
    </section>
  )
}
