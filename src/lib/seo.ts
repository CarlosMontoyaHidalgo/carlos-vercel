import { Metadata } from 'next'

// Configuración base del sitio
export const siteConfig = {
  name: "Carlos Montoya",
  title: "Carlos Montoya - Desarrollador Full Stack & Android Developer | Titulado ULPGC",
  description: "Portfolio profesional de Carlos Montoya Hidalgo. Desarrollador Full Stack y Android Developer titulado por la ULPGC. Especializado en React, Next.js, TypeScript, Java, Kotlin y desarrollo móvil nativo.",
  url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  author: {
    name: "Carlos Montoya Hidalgo",
    email: "carlos@ejemplo.com", // Cambia por tu email real
    twitter: "@carlosmontoya", // Cambia por tu handle real
    linkedin: "carlos-montoya-hidalgo", // Cambia por tu LinkedIn
  },
  keywords: [
    // Español
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
    // English
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
    "computer science graduate"
  ]
}

// Metadata base optimizada para SEO
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(", "),
  
  authors: [{ 
    name: siteConfig.author.name, 
    url: siteConfig.url 
  }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  
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
    canonical: '/',
    languages: {
      'es-ES': '/',
      'en-US': '/en',
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Portfolio`,
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
    images: ['/og-image.png'],
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

// Función para generar metadata específica de página
export function generatePageMetadata({
  title,
  description,
  path = '/',
  images = ['/og-image.png'],
  type = 'website'
}: {
  title: string
  description?: string
  path?: string
  images?: string[]
  type?: 'website' | 'article'
}): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`
  const pageDescription = description || siteConfig.description
  const pageUrl = `${siteConfig.url}${path}`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      type,
      images: images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${title} - ${siteConfig.name}`,
      })),
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      images,
    },
  }
}

// Schema.org structured data
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteConfig.author.name,
  "url": siteConfig.url,
  "email": siteConfig.author.email,
  "jobTitle": "Desarrollador Full Stack & Android Developer",
  "description": "Desarrollador Full Stack y Android Developer titulado por la ULPGC. Especializado en desarrollo web moderno y aplicaciones móviles nativas.",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Universidad de Las Palmas de Gran Canaria (ULPGC)",
    "alternateName": "ULPGC",
    "url": "https://www.ulpgc.es",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Las Palmas de Gran Canaria",
      "addressRegion": "Canarias",
      "addressCountry": "España"
    }
  },
  "knowsAbout": [
    // Web Technologies
    "React",
    "Next.js", 
    "TypeScript",
    "JavaScript",
    "Node.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    // Mobile Development
    "Android Development",
    "Kotlin",
    "Java",
    "Android Studio",
    "Mobile App Development",
    // General
    "Desarrollo Web",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Desarrollo Móvil",
    "Software Engineering"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Degree",
      "educationalLevel": "University",
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "Universidad de Las Palmas de Gran Canaria"
      }
    }
  ],
  "sameAs": [
    `https://linkedin.com/in/${siteConfig.author.linkedin}`,
    `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
    "https://github.com/CarlosMontoyaHidalgo" // Cambia por tu GitHub real
  ]
}
