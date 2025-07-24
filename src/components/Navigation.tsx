'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle, { MobileThemeToggle } from './ThemeToggle'
import NavigationSettings from './NavigationSettings'
import { useNavigation } from './NavigationProvider'
import Sidebar from './Sidebar'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { navigationType, isSidebarOpen, setIsSidebarOpen } = useNavigation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setIsOpen(false)
  }

  // Si es sidebar, mostrar solo el componente Sidebar
  if (navigationType === 'sidebar') {
    return (
      <>
        <Sidebar />
        
        {/* Botón hamburguesa para mobile cuando es sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg glass-effect hamburger-sidebar"
          style={{ 
            color: 'var(--foreground)',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)'
          }}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </>
    )
  }

  // Navegación tipo header (modo original)
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gradient" style={{ 
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            fontWeight: '700'
          }}>
            Carlos
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium cursor-pointer px-3 py-2 rounded-lg"
                style={{ 
                  color: '#ffffff',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1e40af'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <NavigationSettings />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <MobileThemeToggle />
            <NavigationSettings />
                        <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors duration-200 cursor-pointer"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1e40af'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff'
              }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 glass-effect rounded-lg mt-2 mx-4">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left font-medium py-3 px-3 transition-all duration-200 cursor-pointer rounded-lg"
                  style={{ 
                    color: '#ffffff',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1e40af'
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
