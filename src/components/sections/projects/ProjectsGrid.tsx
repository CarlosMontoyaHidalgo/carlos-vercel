import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.title}
          project={project}
          index={index}
        />
      ))}
    </motion.div>
  )
}
