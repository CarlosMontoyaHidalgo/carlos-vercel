'use client'

import { useProjectsData, Project } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/providers/LanguageProvider'
import ProjectsHeader from './projects/ProjectsHeader'
import ProjectsGrid from './projects/ProjectsGrid'

export default function Projects() {
  const projectsData = useProjectsData()
  const { t } = useLanguage()

  if (!projectsData) {
    return null
  }

  // Convertir los proyectos del JSON al formato esperado por ProjectsGrid
  const projects = projectsData.items.map((project: Project) => {
    // Usar traducciones para los títulos y descripciones de proyectos conocidos
    let title = project.title;
    let description = project.description;
    
    if (project.title === "Pokédex Kanto") {
      title = t('projects.pokedexTitle');
      description = t('projects.pokedexDesc');
    } else if (project.title === "Portfolio Personal") {
      title = t('projects.portfolioTitle');
      description = t('projects.portfolioDesc');
    }
    
    return {
      title: title,
      description: description,
      image: project.image || '/placeholder-project.jpg',
      technologies: project.technologies,
      github: project.github || '',
      demo: project.demo || '',
      category: project.featured ? t('common.featured') : t('projects.project')
    }
  })

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        <ProjectsHeader 
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />
        
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  )
}
