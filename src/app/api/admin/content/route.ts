import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Verificar IP autorizada
function isAuthorizedIP(request: NextRequest): boolean {
  const AUTHORIZED_IPS = [
    '127.0.0.1',
    '::1',
    '192.168.1.35', // Cambia por tu IP real
  ]

  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const connectingIP = request.headers.get('cf-connecting-ip')
  
  const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
  
  return AUTHORIZED_IPS.includes(ip.trim())
}

// Cargar contenido editable desde los archivos JSON
function loadEditableContent() {
  try {
    const portfolioPath = path.join(process.cwd(), 'src/data/portfolio.json')
    const experiencePath = path.join(process.cwd(), 'src/data/experience.json')
    
    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
    const experienceData = JSON.parse(fs.readFileSync(experiencePath, 'utf8'))

    return [
      // Contenido básico
      {
        id: 'hero-description',
        title: 'Descripción Principal (Hero)',
        content: portfolioData.hero.description,
        type: 'text'
      },
      {
        id: 'about-description',
        title: 'Descripción Sobre Mí',
        content: portfolioData.about.description,
        type: 'text'
      },
      {
        id: 'about-philosophy',
        title: 'Filosofía Personal',
        content: portfolioData.about.philosophy,
        type: 'text'
      },
      {
        id: 'technologies-subtitle',
        title: 'Subtítulo de Tecnologías',
        content: portfolioData.technologies.subtitle,
        type: 'text'
      },
      {
        id: 'projects-subtitle',
        title: 'Subtítulo de Proyectos',
        content: portfolioData.projects.subtitle,
        type: 'text'
      },
      {
        id: 'contact-description',
        title: 'Descripción de Contacto',
        content: portfolioData.contact.description,
        type: 'text'
      },
      // Tecnologías
      {
        id: 'technologies',
        title: 'Gestión de Tecnologías',
        content: JSON.stringify(portfolioData.technologies.categories, null, 2),
        type: 'technologies'
      },
      // Experiencia profesional
      {
        id: 'work-experience',
        title: 'Experiencia Profesional',
        content: JSON.stringify(experienceData.experience.items || [], null, 2),
        type: 'experience'
      }
    ]
  } catch (error) {
    console.error('Error loading content:', error)
    return []
  }
}

// Guardar contenido editado
function saveEditableContent(sectionId: string, content: string) {
  try {
    const portfolioPath = path.join(process.cwd(), 'src/data/portfolio.json')
    const experiencePath = path.join(process.cwd(), 'src/data/experience.json')
    
    switch (sectionId) {
      case 'hero-description':
        const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        portfolioData.hero.description = content
        fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2))
        break
      case 'about-description':
        const aboutData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        aboutData.about.description = content
        fs.writeFileSync(portfolioPath, JSON.stringify(aboutData, null, 2))
        break
      case 'about-philosophy':
        const philosophyData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        philosophyData.about.philosophy = content
        fs.writeFileSync(portfolioPath, JSON.stringify(philosophyData, null, 2))
        break
      case 'technologies-subtitle':
        const techSubData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        techSubData.technologies.subtitle = content
        fs.writeFileSync(portfolioPath, JSON.stringify(techSubData, null, 2))
        break
      case 'projects-subtitle':
        const projSubData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        projSubData.projects.subtitle = content
        fs.writeFileSync(portfolioPath, JSON.stringify(projSubData, null, 2))
        break
      case 'contact-description':
        const contactData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        contactData.contact.description = content
        fs.writeFileSync(portfolioPath, JSON.stringify(contactData, null, 2))
        break
      case 'technologies':
        const techData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
        techData.technologies.categories = JSON.parse(content)
        fs.writeFileSync(portfolioPath, JSON.stringify(techData, null, 2))
        break
      case 'work-experience':
        const expData = JSON.parse(fs.readFileSync(experiencePath, 'utf8'))
        expData.experience.items = JSON.parse(content)
        fs.writeFileSync(experiencePath, JSON.stringify(expData, null, 2))
        break
      default:
        throw new Error('Sección no válida')
    }

    return true
  } catch (error) {
    console.error('Error saving content:', error)
    return false
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedIP(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const content = loadEditableContent()
  return NextResponse.json(content)
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedIP(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { sectionId, content } = await request.json()
    
    if (!sectionId || content === undefined) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    const success = saveEditableContent(sectionId, content)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in POST:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
