'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type NavigationType = 'header' | 'sidebar'
export type DesignTheme = 'modern' | 'classic' | 'minimal' | 'creative'

interface NavigationContextType {
  navigationType: NavigationType
  setNavigationType: (type: NavigationType) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  designTheme: DesignTheme
  setDesignTheme: (theme: DesignTheme) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigationType, setNavigationType] = useState<NavigationType>('header')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [designTheme, setDesignTheme] = useState<DesignTheme>('modern')

  // Forzar siempre modo header inicialmente
  useEffect(() => {
    setNavigationType('header')
    localStorage.setItem('navigation-type', 'header')
  }, [])

  useEffect(() => {
    // Siempre mantener header
    localStorage.setItem('navigation-type', 'header')
  }, [navigationType])

  useEffect(() => {
    localStorage.setItem('design-theme', designTheme)
  }, [designTheme])

  // Cerrar sidebar al cambiar a header
  useEffect(() => {
    if (navigationType === 'header') {
      setIsSidebarOpen(false)
    }
  }, [navigationType])

  // Aplicar clase de tema de diseño al body
  useEffect(() => {
    document.body.classList.remove('theme-modern', 'theme-classic', 'theme-minimal', 'theme-creative')
    document.body.classList.add(`theme-${designTheme}`)
  }, [designTheme])

  return (
    <NavigationContext.Provider value={{
      navigationType,
      setNavigationType,
      isSidebarOpen,
      setIsSidebarOpen,
      designTheme,
      setDesignTheme
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
