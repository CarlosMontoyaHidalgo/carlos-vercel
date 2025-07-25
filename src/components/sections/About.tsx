'use client'

import { Code, Database, Globe, Smartphone, GraduationCap, Apple, Zap } from 'lucide-react'
import { Skill } from '@/types'
import { useLanguage } from '@/providers/LanguageProvider'
import AboutHeader from './about/AboutHeader'
import AboutStory from './about/AboutStory'
import ExperienceCounter from './about/ExperienceCounter'
import SkillsGrid from './about/SkillsGrid'

export default function About() {
  const { t } = useLanguage()
  
  const skills: Skill[] = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('technologies.frontendDev'),
      description: 'React, Next.js, TypeScript, Vue.js, Angular, Tailwind CSS'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t('technologies.backendDev'),
      description: 'Node.js, Express, Firebase, MySQL, WordPress, Shopify'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t('technologies.mobileDev'),
      description: 'Kotlin, Java, Android Studio, Material Design, Jetpack Compose'
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: t('technologies.mobileDev'),
      description: 'Swift, SwiftUI, Xcode',
      learning: true
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: t('technologies.devopsTools'),
      description: 'Git, GitHub, VS Code, Azure DevOps'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: t('technologies.academicFormation'),
      description: 'Grado completado con TFG aprobado',
      learning: false
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('technologies.automation'),
      description: 'Make.io, Arduino, Automatización IA',
      learning: true
    }
  ]

  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHeader 
          title={t('about.title')}
          description={t('about.description')}
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
