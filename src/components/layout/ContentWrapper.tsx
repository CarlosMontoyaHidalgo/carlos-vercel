'use client'

import { useNavigation } from '@/providers/NavigationProvider'
import Navigation from './Navigation'
import Sidebar from './Sidebar'

interface ContentWrapperProps {
  children: React.ReactNode
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  const { navigationType, designTheme } = useNavigation()

  const containerClasses = `view-transition theme-${designTheme} min-h-screen transition-all duration-300 ${
    navigationType === 'sidebar' ? 'lg:ml-64' : ''
  }`

  return (
    <div className={containerClasses}>
      {/* Navegación normal */}
      {navigationType === 'header' ? (
        <div className="min-h-screen">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
        </div>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 transition-all duration-300">
            {children}
          </main>
        </div>
      )}
    </div>
  )
}
