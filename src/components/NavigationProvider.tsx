'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type NavigationType = 'header' | 'sidebar'

interface NavigationContextType {
  navigationType: NavigationType
  setNavigationType: (type: NavigationType) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigationType, setNavigationType] = useState<NavigationType>('header')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Guardar preferencia en localStorage
  useEffect(() => {
    const savedType = localStorage.getItem('navigation-type') as NavigationType
    if (savedType && (savedType === 'header' || savedType === 'sidebar')) {
      setNavigationType(savedType)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('navigation-type', navigationType)
  }, [navigationType])

  // Cerrar sidebar al cambiar a header
  useEffect(() => {
    if (navigationType === 'header') {
      setIsSidebarOpen(false)
    }
  }, [navigationType])

  return (
    <NavigationContext.Provider value={{
      navigationType,
      setNavigationType,
      isSidebarOpen,
      setIsSidebarOpen
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
