'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle, { MobileThemeToggle } from '@/components/ui/ThemeToggle'
import LanguageToggle from '@/components/ui/LanguageToggle'
import NavigationSettings from '@/components/ui/NavigationSettings'
import { useNavigation } from '@/providers/NavigationProvider'
import { useNavigationItems } from '@/hooks/useNavigationItems'
import Sidebar from './Sidebar'
import { scrollToSection } from '@/utils/helpers'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { navigationType, isSidebarOpen, setIsSidebarOpen } = useNavigation()
  const navItems = useNavigationItems()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToSection = (href: string) => {
    scrollToSection(href)
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
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg glass-effect hamburger-sidebar transition-transform duration-200 hover:scale-110"
          style={{ 
            color: 'var(--foreground)',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)'
          }}
          aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <div className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
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
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="text-xl sm:text-2xl font-bold text-gradient">
            Carlos
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollToSection(item.href)}
                className="nav-link text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-base"
                style={{ 
                  color: 'var(--foreground)', 
                  opacity: 0.8 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--foreground)'
                  e.currentTarget.style.opacity = '0.8'
                }}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-2 lg:space-x-3">
              <LanguageToggle />
              <ThemeToggle />
              <NavigationSettings />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
            <LanguageToggle />
            <MobileThemeToggle />
            <NavigationSettings />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors duration-200"
              style={{ color: 'var(--foreground)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--foreground)'
              }}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 glass-effect rounded-lg mt-2 mx-2 sm:mx-4">
            <div className="flex flex-col space-y-3 sm:space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScrollToSection(item.href)}
                  className="text-left font-medium py-2 transition-colors duration-200 text-sm sm:text-base"
                  style={{ 
                    color: 'var(--foreground)', 
                    opacity: 0.8 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary)'
                    e.currentTarget.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--foreground)'
                    e.currentTarget.style.opacity = '0.8'
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
