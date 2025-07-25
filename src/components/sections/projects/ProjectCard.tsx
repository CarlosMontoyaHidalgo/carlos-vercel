import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        
        <div className="absolute top-4 left-4">
          <span 
            className="px-3 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          {project.title}
        </h3>
        <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 text-xs rounded"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
          >
            <Github size={16} />
            <span className="text-sm">{t('projects.viewCode')}</span>
          </a>
          
          {/* Enlace de demo desactivado temporalmente */}
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors opacity-50 cursor-not-allowed"
            style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
            title={t('projects.demoNotAvailable')}
          >
            <ExternalLink size={16} />
            <span className="text-sm">{t('projects.demoComingSoon')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
