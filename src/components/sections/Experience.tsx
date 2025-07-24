'use client'

import { useExperienceData } from '@/hooks/usePortfolioData'
import { Calendar, MapPin, Award, ExternalLink, GraduationCap, Briefcase } from 'lucide-react'

export default function Experience() {
  const experienceData = useExperienceData()

  const formatDate = (dateString: string) => {
    if (dateString === 'Actualidad') return 'Actualidad'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            {experienceData.title}
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--muted-foreground)' }}>
            {experienceData.subtitle}
          </p>
        </div>

        {/* Experiencia Laboral */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <Briefcase className="mr-3" size={28} style={{ color: 'var(--primary)' }} />
            <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Experiencia Profesional
            </h3>
          </div>

          <div className="space-y-8">
            {experienceData.items.map((exp, index) => (
              <div 
                key={exp.id} 
                className="glass-effect rounded-xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Indicador de destacado */}
                {exp.featured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-300 text-black px-3 py-1 text-xs font-semibold rounded-bl-lg">
                    Destacado
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <h4 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                      {exp.position}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                        {exp.company}
                      </span>
                      <div className="flex items-center" style={{ color: 'var(--muted-foreground)' }}>
                        <MapPin size={16} className="mr-1" />
                        {exp.location}
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm" style={{ 
                        backgroundColor: 'var(--muted)',
                        color: 'var(--muted-foreground)'
                      }}>
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center mb-4" style={{ color: 'var(--muted-foreground)' }}>
                      <Calendar size={16} className="mr-2" />
                      <span>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)} ({exp.duration})
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  {exp.description}
                </p>

                {/* Logros */}
                <div className="mb-6">
                  <h5 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                    Logros principales:
                  </h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span style={{ color: 'var(--muted-foreground)' }}>
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tecnologías */}
                <div>
                  <h5 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                    Tecnologías utilizadas:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                        style={{ 
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educación */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <GraduationCap className="mr-3" size={28} style={{ color: 'var(--primary)' }} />
            <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Educación
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {experienceData.education.map((edu) => (
              <div 
                key={edu.id}
                className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              >
                <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  {edu.degree}
                </h4>
                <div className="flex items-center mb-2" style={{ color: 'var(--primary)' }}>
                  <span className="font-semibold">{edu.institution}</span>
                </div>
                <div className="flex items-center mb-3" style={{ color: 'var(--muted-foreground)' }}>
                  <MapPin size={16} className="mr-1" />
                  {edu.location}
                </div>
                <div className="flex items-center mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>

                {edu.gpa && (
                  <div className="mb-3">
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      Nota media: {edu.gpa}
                    </span>
                  </div>
                )}

                {edu.honors && edu.honors.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                      Honores:
                    </h5>
                    <ul className="space-y-1">
                      {edu.honors.map((honor, index) => (
                        <li key={index} className="flex items-start">
                          <Award size={16} className="mr-2 mt-1 text-yellow-500" />
                          <span style={{ color: 'var(--muted-foreground)' }}>
                            {honor}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                      Materias relevantes:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 rounded text-sm"
                          style={{ 
                            backgroundColor: 'var(--muted)',
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.skills && edu.skills.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-lg text-sm font-medium"
                          style={{ 
                            backgroundColor: 'var(--accent)',
                            color: 'var(--accent-foreground)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div>
          <div className="flex items-center mb-8">
            <Award className="mr-3" size={28} style={{ color: 'var(--primary)' }} />
            <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Certificaciones
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceData.certifications.map((cert, index) => (
              <div 
                key={index}
                className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-lg group"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold flex-1" style={{ color: 'var(--foreground)' }}>
                    {cert.name}
                  </h4>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--primary)' }}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                
                <div className="mb-3" style={{ color: 'var(--primary)' }}>
                  <span className="font-semibold">{cert.issuer}</span>
                </div>
                
                <div className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  <span>Obtenida: {formatDate(cert.date)}</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    ID: {cert.credentialId}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: 'var(--muted)',
                        color: 'var(--muted-foreground)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
