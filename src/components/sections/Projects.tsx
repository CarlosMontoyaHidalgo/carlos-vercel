'use client'

import ProjectsHeader from './projects/ProjectsHeader'
import ProjectsGrid from './projects/ProjectsGrid'

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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        <ProjectsHeader 
          title="Proyectos"
          subtitle="Una selección de proyectos que demuestran mis habilidades y experiencia en desarrollo web."
        />
        
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  )
}
