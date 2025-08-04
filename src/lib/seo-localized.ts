import { Metadata } from 'next'

// Configuración SEO específica por idioma
export const seoTranslations = {
  es: {
    title: "Carlos Montoya - Desarrollador Full Stack & Android Developer | Titulado ULPGC | Dispuesto a Aprender",
    description: "Portfolio profesional de Carlos Montoya Hidalgo. Desarrollador Full Stack y Android Developer titulado por la ULPGC. Especializado en React, Next.js, TypeScript, Java, Kotlin. Profesional proactivo, dispuesto a aprender nuevas tecnologías y enfrentar desafíos.",
    keywords: [
      "Carlos Montoya Hidalgo",
      "desarrollador full stack",
      "Android developer",
      "titulado ULPGC",
      "Universidad Las Palmas Gran Canaria",
      "React developer",
      "Next.js specialist", 
      "TypeScript expert",
      "JavaScript developer",
      "Kotlin developer",
      "Java developer",
      "desarrollo móvil Android",
      "frontend developer",
      "backend developer",
      "portfolio desarrollador",
      "web developer España",
      "programador React",
      "desarrollador web profesional",
      "desarrollador apps móviles",
      "ingeniero informático ULPGC",
      "dispuesto a aprender",
      "proactivo",
      "adaptable",
      "nuevas tecnologías",
      "aprendizaje continuo",
      "motivado",
      "flexible",
      "resolutivo",
      "trabajo en equipo",
      "autodidacta",
      "innovador",
      "creativo",
      "responsable"
    ],
    jobTitle: "Desarrollador Full Stack & Android Developer",
    ogDescription: "Descubre mi trabajo como desarrollador Full Stack y Android Developer. Titulado por la ULPGC, especializado en React, Next.js, TypeScript, Kotlin. Profesional proactivo y dispuesto a aprender nuevas tecnologías.",
    twitterDescription: "Portfolio profesional de Carlos Montoya. Desarrollador Full Stack y Android Developer titulado por la ULPGC. Dispuesto a aprender y crecer profesionalmente.",
    structuredData: {
      jobTitle: "Desarrollador Full Stack & Android Developer",
      description: "Desarrollador Full Stack y Android Developer titulado por la ULPGC. Especializado en desarrollo web moderno y aplicaciones móviles nativas. Profesional proactivo, dispuesto a aprender nuevas tecnologías y adaptarse a los desafíos del desarrollo de software.",
      alumniOf: "Universidad de Las Palmas de Gran Canaria (ULPGC)"
    }
  },
  en: {
    title: "Carlos Montoya - Full Stack & Android Developer | ULPGC Graduate | Eager to Learn",
    description: "Professional portfolio of Carlos Montoya Hidalgo. Full Stack and Android Developer graduated from ULPGC. Specialized in React, Next.js, TypeScript, Java, Kotlin. Proactive professional, eager to learn new technologies and tackle challenges.",
    keywords: [
      "Carlos Montoya Hidalgo",
      "full stack developer",
      "Android developer",
      "ULPGC graduate",
      "University of Las Palmas de Gran Canaria",
      "React developer",
      "Next.js developer",
      "TypeScript developer",
      "JavaScript developer",
      "Kotlin developer", 
      "Java developer",
      "mobile app developer",
      "frontend developer",
      "backend developer",
      "web developer Spain",
      "software engineer",
      "mobile development expert",
      "computer science graduate",
      "Android native apps",
      "React Native developer",
      "eager to learn",
      "proactive",
      "adaptable",
      "new technologies",
      "continuous learning",
      "motivated",
      "flexible",
      "problem solver",
      "team player",
      "self-taught",
      "innovative",
      "creative",
      "responsible",
      "growth mindset",
      "quick learner"
    ],
    jobTitle: "Full Stack & Android Developer",
    ogDescription: "Discover my work as a Full Stack and Android Developer. ULPGC graduate specialized in React, Next.js, TypeScript, Kotlin. Proactive professional eager to learn new technologies.",
    twitterDescription: "Professional portfolio of Carlos Montoya. Full Stack and Android Developer graduated from ULPGC. Eager to learn and grow professionally.",
    structuredData: {
      jobTitle: "Full Stack & Android Developer",
      description: "Full Stack and Android Developer graduated from ULPGC. Specialized in modern web development and native mobile applications. Proactive professional, eager to learn new technologies and adapt to software development challenges.",
      alumniOf: "University of Las Palmas de Gran Canaria (ULPGC)"
    }
  }
}

// Función para obtener metadata por idioma
export function getLocalizedMetadata(language: 'es' | 'en' = 'es'): Metadata {
  const config = seoTranslations[language]
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  
  return {
    title: {
      default: config.title,
      template: `%s | Carlos Montoya`
    },
    description: config.description,
    keywords: config.keywords.join(", "),
    authors: [{ 
      name: "Carlos Montoya Hidalgo", 
      url: baseUrl 
    }],
    creator: "Carlos Montoya Hidalgo",
    publisher: "Carlos Montoya Hidalgo",
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    alternates: {
      canonical: language === 'es' ? '/' : '/en',
      languages: {
        'es-ES': '/',
        'en-US': '/en',
      },
    },
    
    openGraph: {
      type: 'website',
      locale: language === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: language === 'es' ? 'en_US' : 'es_ES',
      url: language === 'es' ? '/' : '/en',
      title: config.title,
      description: config.ogDescription,
      siteName: "Carlos Montoya Portfolio",
      images: [
        {
          url: `/og-image-${language}.png`,
          width: 1200,
          height: 630,
          alt: `Carlos Montoya - ${config.jobTitle}`,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.twitterDescription,
      creator: "@carlosmontoya",
      images: [`/og-image-${language}.png`],
    },
    
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
    
    category: 'technology',
    
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'dark light',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  }
}

// Structured data por idioma
export function getLocalizedStructuredData(language: 'es' | 'en' = 'es') {
  const config = seoTranslations[language]
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos Montoya Hidalgo",
    "url": baseUrl,
    "jobTitle": config.structuredData.jobTitle,
    "description": config.structuredData.description,
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": language === 'es' ? "Universidad de Las Palmas de Gran Canaria (ULPGC)" : "University of Las Palmas de Gran Canaria (ULPGC)",
      "alternateName": "ULPGC",
      "url": "https://www.ulpgc.es",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Las Palmas de Gran Canaria",
        "addressRegion": "Canarias",
        "addressCountry": language === 'es' ? "España" : "Spain"
      }
    },
    "knowsAbout": [
      // Web Technologies
      "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "HTML5", "CSS3", "Tailwind CSS",
      // Mobile Development
      "Android Development", "Kotlin", "Java", "Android Studio", "Mobile App Development",
      // General terms
      language === 'es' ? "Desarrollo Web" : "Web Development",
      language === 'es' ? "Desarrollo Móvil" : "Mobile Development",
      language === 'es' ? "Ingeniería de Software" : "Software Engineering",
      "Frontend Development", "Backend Development", "Full Stack Development",
      // Soft Skills & Professional Qualities
      language === 'es' ? "Aprendizaje Continuo" : "Continuous Learning",
      language === 'es' ? "Adaptabilidad" : "Adaptability",
      language === 'es' ? "Resolución de Problemas" : "Problem Solving",
      language === 'es' ? "Trabajo en Equipo" : "Team Collaboration",
      language === 'es' ? "Nuevas Tecnologías" : "New Technologies",
      language === 'es' ? "Metodologías Ágiles" : "Agile Methodologies",
      language === 'es' ? "Comunicación Técnica" : "Technical Communication"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": language === 'es' ? "Título Universitario" : "University Degree",
        "educationalLevel": "University",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": language === 'es' ? "Universidad de Las Palmas de Gran Canaria" : "University of Las Palmas de Gran Canaria"
        }
      }
    ],
    "sameAs": [
      "https://linkedin.com/in/carlos-montoya-hidalgo",
      "https://twitter.com/carlosmontoya",
      "https://github.com/CarlosMontoyaHidalgo"
    ]
  }
}
