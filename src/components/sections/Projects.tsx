'use client'

import { useProjectsData, Project } from '@/hooks/usePortfolioData'
import ProjectsHeader from './projects/ProjectsHeader'
import ProjectsGrid from './projects/ProjectsGrid'

export default function Projects() {
  const projectsData = useProjectsData()

  if (!projectsData) {
    return null
  }

  // Convertir los proyectos del JSON al formato esperado por ProjectsGrid
  const projects = projectsData.items.map((project: Project) => ({
    title: project.title,
    description: project.description,
    image: project.image || '/placeholder-project.jpg',
    technologies: project.technologies,
    github: project.github || '',
    demo: project.demo || '',
    category: project.featured ? 'Destacado' : 'Proyecto'
  }))

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        <ProjectsHeader 
          title={projectsData.title}
          subtitle={projectsData.subtitle}
        />
        
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  )
}
