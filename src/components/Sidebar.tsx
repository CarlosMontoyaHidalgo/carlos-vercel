'use client'

import { X } from 'lucide-react'
import { useNavigation } from './NavigationProvider'
import ThemeToggle from './ThemeToggle'
import NavigationSettings from './NavigationSettings'

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigation()

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Tecnologías', href: '#technologies' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsSidebarOpen(false)
  }

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
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
      style={{ 
        backgroundColor: 'var(--card)',
        borderRight: '1px solid var(--border)'
      }}
      >
        <div className="flex flex-col h-full">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="text-2xl font-bold text-gradient">
              Carlos
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--foreground)' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium hover:scale-105"
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
          <div className="p-4 border-t space-y-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Tema
              </span>
              <ThemeToggle />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Navegación
              </span>
              <NavigationSettings />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
