interface ChatResponse {
  answer: string
  confidence: number
  category: string
}

interface KnowledgeBase {
  [key: string]: {
    keywords: string[]
    responses: string[]
    followUp?: string[]
  }
}

const knowledgeBase: KnowledgeBase = {
  experience: {
    keywords: ['experiencia', 'trabajo', '2coders', 'prácticas', 'freelance', 'experience', 'work'],
    responses: [
      'Tengo experiencia práctica en 2Coders S.L. donde trabajé como desarrollador web, implementando nuevas funcionalidades y optimizando el rendimiento de aplicaciones. También trabajo como freelance desarrollando tiendas online con Shopify.',
      'Mi experiencia incluye prácticas profesionales en 2Coders S.L. y trabajo freelance. He colaborado en equipos, desarrollado componentes reutilizables y entregado proyectos llave en mano.'
    ],
    followUp: ['¿Te gustaría saber sobre algún proyecto específico?', '¿Quieres conocer qué tecnologías utilicé en cada experiencia?']
  },
  
  technologies: {
    keywords: ['tecnologías', 'stack', 'programación', 'lenguajes', 'frameworks', 'react', 'next', 'kotlin', 'technologies'],
    responses: [
      'Mi stack principal incluye: React, Next.js, TypeScript y Tailwind CSS para frontend. Node.js, Express y PostgreSQL para backend. Para móvil trabajo con Kotlin y Jetpack Compose, y estoy aprendiendo Swift.',
      'Domino tecnologías modernas como React/Next.js para web, Kotlin para Android, Node.js para backend. También manejo herramientas de automatización como Dialogflow, Make.io y n8n.'
    ],
    followUp: ['¿Hay alguna tecnología específica que te interese?', '¿Quieres ver ejemplos de proyectos con estas tecnologías?']
  },

  projects: {
    keywords: ['proyectos', 'portfolio', 'pokédex', 'tfg', 'app', 'projects'],
    responses: [
      'He desarrollado varios proyectos destacados: una Pokédex web interactiva con JavaScript vanilla y API REST, mi portfolio personal con Next.js y TypeScript, y mi TFG que es una app Android con IA para fitness.',
      'Mis proyectos principales incluyen aplicaciones web como la Pokédx Kanto y mi portfolio, además de mi proyecto de tesis: una app Android con inteligencia artificial para rutinas de ejercicio usando Jetpack Compose, MVVM, Firebase y Dialogflow.'
    ],
    followUp: ['¿Te gustaría ver el código en GitHub?', '¿Quieres saber más detalles sobre el TFG?']
  },

  tfg: {
    keywords: ['tfg', 'tesis', 'android', 'fitness', 'ia', 'dialogflow', 'jetpack', 'thesis'],
    responses: [
      'Mi TFG es una aplicación Android completa para fitness que integra inteligencia artificial. Utiliza Jetpack Compose para la UI, arquitectura MVVM, Firebase para backend y Dialogflow para un chatbot inteligente que ayuda con rutinas personalizadas.',
      'El proyecto de tesis fue muy ambicioso: desarrollé una app Android nativa que combina IA para crear rutinas de ejercicio personalizadas, seguimiento de progreso y un asistente virtual. Tecnologías: Kotlin, Jetpack Compose, Firebase, Dialogflow.'
    ],
    followUp: ['¿Quieres saber más sobre la arquitectura?', '¿Te interesa conocer cómo implementé la IA?']
  },

  contact: {
    keywords: ['contacto', 'email', 'disponibilidad', 'trabajo', 'contratar', 'contact', 'hire'],
    responses: [
      'Puedes contactarme en carlosmh561@gmail.com. Estoy buscando trabajo a tiempo completo y respondo en menos de 24 horas. También puedes encontrarme en LinkedIn y GitHub.',
      'Puedes contactarme en carlosmh561@gmail.com. Estoy disponible para oportunidades laborales remotas o presenciales y respondo en menos de 24 horas. También puedes encontrarme en LinkedIn y GitHub.'
    ],
    followUp: ['¿Te gustaría agendar una llamada?', '¿Hay algún puesto específico que te interese discutir?']
  },

  education: {
    keywords: ['educación', 'universidad', 'carrera', 'grado', 'studies', 'education'],
    responses: [
      'Soy graduado en Ingeniería Informática. Durante la carrera me especialicé en desarrollo web y móvil. Mi TFG combinó machine learning con desarrollo Android nativo.',
      'Completé mi grado en Ingeniería Informática con enfoque en tecnologías web y móviles. El proyecto final fue especialmente interesante: una app de fitness con IA que demuestra mis habilidades técnicas y de investigación.'
    ],
    followUp: ['¿Quieres saber más sobre mi TFG?', '¿Te interesa conocer qué materias fueron más relevantes?']
  },

  skills: {
    keywords: ['habilidades', 'skills', 'frontend', 'backend', 'mobile', 'móvil'],
    responses: [
      'Mis principales habilidades incluyen desarrollo frontend con React/Next.js, backend con Node.js, desarrollo móvil con Kotlin, y automatización. También tengo experiencia en UI/UX y optimización de rendimiento.',
      'Soy full-stack con especialización en tecnologías modernas: React ecosystem para web, Kotlin para Android, Node.js para APIs, y herramientas de automatización como Dialogflow.'
    ],
    followUp: ['¿Quieres ejemplos específicos de estas habilidades?', '¿Te interesa algún área en particular?']
  },

  personality: {
    keywords: ['persona', 'personalidad', 'como eres', 'quien eres', 'about'],
    responses: [
      'Soy una persona apasionada por la tecnología y siempre dispuesta a aprender. Mi filosofía es adaptarme y crecer profesionalmente según los desafíos que se presenten. Me encanta crear soluciones que mejoren la vida de las personas.',
      'Me defino como un desarrollador curioso y proactivo. Aunque mi especialización principal es web y móvil, siempre estoy abierto a aprender nuevas tecnologías según las necesidades del proyecto o empresa.'
    ],
    followUp: ['¿Quieres saber más sobre mi filosofía de trabajo?', '¿Te interesa conocer cómo trabajo en equipo?']
  }
}

export function findBestResponse(message: string): ChatResponse {
  const normalizedMessage = message.toLowerCase()
  let bestMatch = { category: '', score: 0 }

  // Buscar la mejor coincidencia
  Object.entries(knowledgeBase).forEach(([category, data]) => {
    const score = data.keywords.reduce((acc, keyword) => {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        // Dar más peso a coincidencias exactas
        const wordBoundary = new RegExp(`\\b${keyword.toLowerCase()}\\b`)
        return wordBoundary.test(normalizedMessage) ? acc + 2 : acc + 1
      }
      return acc
    }, 0)

    if (score > bestMatch.score) {
      bestMatch = { category, score }
    }
  })

  if (bestMatch.score > 0) {
    const categoryData = knowledgeBase[bestMatch.category]
    const randomResponse = categoryData.responses[
      Math.floor(Math.random() * categoryData.responses.length)
    ]
    const followUp = categoryData.followUp ? 
      categoryData.followUp[Math.floor(Math.random() * categoryData.followUp.length)] : ''

    return {
      answer: `${randomResponse}\n\n${followUp}`,
      confidence: Math.min((bestMatch.score / 3) * 100, 95),
      category: bestMatch.category
    }
  }

  // Respuestas inteligentes por defecto
  const defaultResponses = [
    '¡Hola! Soy Carlos Montoya. Pregúntame sobre mi experiencia profesional, proyectos, habilidades técnicas o cualquier información sobre mi perfil profesional.',
    'No estoy seguro de entender esa pregunta específica. ¿Podrías preguntar sobre mi experiencia en 2Coders, mis proyectos como la Pokédx o mi TFG, mis tecnologías, o información de contacto?',
    'Puedo ayudarte con información detallada sobre mi background profesional, stack tecnológico, proyectos desarrollados, o mis datos de contacto. ¿Qué te gustaría saber?'
  ]

  return {
    answer: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    confidence: 15,
    category: 'default'
  }
}
