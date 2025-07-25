'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Tipos para las traducciones
export type Language = 'es' | 'en'

interface Translations {
  [key: string]: any
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: Translations
}

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Función para obtener valor anidado de un objeto usando notación de punto
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path
  }, obj)
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es')
  const [translations, setTranslations] = useState<Translations>({})

  // Cargar traducciones
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`@/locales/${language}.json`)
        setTranslations(translationModule.default)
      } catch (error) {
        console.error(`Error loading translations for ${language}:`, error)
        // Fallback a español si no se pueden cargar las traducciones
        if (language !== 'es') {
          const fallbackModule = await import('@/locales/es.json')
          setTranslations(fallbackModule.default)
        }
      }
    }

    loadTranslations()
  }, [language])

  // Cargar idioma guardado del localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
  }, [language])

  // Función de traducción
  const t = (key: string): string => {
    const translation = getNestedValue(translations, key)
    return translation || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
