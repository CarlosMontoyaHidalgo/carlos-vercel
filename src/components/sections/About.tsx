'use client'

import { Code, Database, Globe, Smartphone, GraduationCap, Apple } from 'lucide-react'
import AboutHeader from './about/AboutHeader'
import AboutStory from './about/AboutStory'
import ExperienceCounter from './about/ExperienceCounter'
import SkillsGrid from './about/SkillsGrid'

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
      description: 'Swift, SwiftUI, Xcode',
      learning: true
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'DevOps & Tools',
      description: 'Git, Docker, AWS, Vercel'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Investigación',
      description: 'TFG en desarrollo, Machine Learning',
      learning: true
    }
  ]

  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHeader 
          title="Sobre mí"
          description="Soy un desarrollador apasionado por la tecnología y la innovación. Me encanta crear soluciones digitales que resuelvan problemas reales y mejoren la experiencia de los usuarios."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AboutStory />
          <ExperienceCounter />
        </div>

        <SkillsGrid skills={skills} />
      </div>
    </section>
  )
}
