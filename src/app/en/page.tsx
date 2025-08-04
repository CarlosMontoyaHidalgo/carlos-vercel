import { Metadata } from 'next'
import { getLocalizedMetadata } from '@/lib/seo-localized'
import StructuredData from '@/components/SEO/StructuredData'

// Metadata específica para la versión en inglés
export const metadata: Metadata = getLocalizedMetadata('en')

export default function EnglishPage() {
  return (
    <>
      {/* Structured Data en inglés */}
      <StructuredData language="en" />
      
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Carlos Montoya Hidalgo
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
            Full Stack & Android Developer | ULPGC Graduate
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional portfolio of Carlos Montoya Hidalgo. Full Stack and Android Developer 
            graduated from the University of Las Palmas de Gran Canaria (ULPGC). 
            Specialized in React, Next.js, TypeScript, Java, Kotlin and native mobile development.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">React</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">Next.js</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">TypeScript</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">Android</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">Kotlin</span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">Java</span>
          </div>
          
          <div className="flex justify-center gap-4">
            <a 
              href="/" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Ver Portfolio (Español)
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
