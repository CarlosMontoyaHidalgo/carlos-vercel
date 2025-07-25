'use client'

import { X } from 'lucide-react'
import { useNavigation } from '@/providers/NavigationProvider'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageToggle from '@/components/ui/LanguageToggle'
import NavigationSettings from '@/components/ui/NavigationSettings'
import { useEffect } from 'react'
import { useNavigationItems } from '@/hooks/useNavigationItems'
import { ANIMATION_DURATIONS } from '@/utils/constants'
import { scrollToSection } from '@/utils/helpers'

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigation()
  const navItems = useNavigationItems()

  const handleNavigation = (href: string) => {
    scrollToSection(href, () => {
      // Cerrar el sidebar después de navegar (especialmente en móvil)
      setIsSidebarOpen(false)
    })
  }

  // Cerrar sidebar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSidebarOpen, setIsSidebarOpen])

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 sidebar-overlay z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full sidebar-mobile lg:sidebar-desktop z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
        style={{ 
          backgroundColor: 'var(--card)',
          borderRight: '1px solid var(--border)',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xl lg:text-2xl font-bold text-gradient">
              Carlos
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              style={{ color: 'var(--foreground)' }}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 overflow-y-auto">
            <ul className="space-y-1 lg:space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 font-medium hover:scale-105 text-sm lg:text-base"
                    style={{ 
                      color: 'var(--foreground)',
                      opacity: 0.8
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--muted)'
                      e.currentTarget.style.color = 'var(--primary)'
                      e.currentTarget.style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--foreground)'
                      e.currentTarget.style.opacity = '0.8'
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer con controles */}
          <div className="p-3 lg:p-4 border-t space-y-3 lg:space-y-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Navegación
              </span>
              <NavigationSettings />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Idioma
              </span>
              <LanguageToggle />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Tema
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
