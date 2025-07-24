'use client'

import { Settings, Layout, Menu, Palette, Zap, Layers, Circle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@/providers/NavigationProvider'

export default function NavigationSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'navigation' | 'design'>('navigation')
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { 
    navigationType, 
    setNavigationType, 
    designTheme, 
    setDesignTheme 
  } = useNavigation()

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      
      if (spaceAbove > spaceBelow || spaceBelow < 300) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }
    }
  }, [isOpen])

  const navigationOptions = [
    {
      id: 'header' as const,
      icon: <Layout size={18} />,
      title: 'Header',
      description: 'Navegación superior'
    },
    {
      id: 'sidebar' as const,
      icon: <Menu size={18} />,
      title: 'Sidebar',
      description: 'Barra lateral (Próximamente)',
      disabled: true
    }
  ]

  const designThemeOptions = [
    {
      id: 'modern' as const,
      icon: <Zap size={18} />,
      title: 'Modern',
      description: 'Gradientes y efectos',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'classic' as const,
      icon: <Layout size={18} />,
      title: 'Classic',
      description: 'Diseño tradicional',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'minimal' as const,
      icon: <Circle size={18} />,
      title: 'Minimal',
      description: 'Limpio y simple',
      color: 'from-slate-400 to-slate-600'
    },
    {
      id: 'creative' as const,
      icon: <Palette size={18} />,
      title: 'Creative',
      description: 'Colores vibrantes',
      color: 'from-pink-500 to-orange-500'
    }
  ]

  const tabs = [
    { id: 'navigation' as const, label: 'Navegación', icon: <Menu size={16} /> },
    { id: 'design' as const, label: 'Diseño', icon: <Palette size={16} /> }
  ]

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
        style={{ 
          color: 'var(--foreground)',
          backgroundColor: 'var(--muted)',
          border: '1px solid var(--border)'
        }}
        title="Configurar interfaz"
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel de configuración expandido */}
          <div 
            className={`absolute ${dropdownPosition === 'top' ? 'bottom-12' : 'top-12'} right-0 glass-effect rounded-lg p-0 min-w-80 max-w-sm z-50 shadow-xl overflow-hidden`}
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          >
            {/* Header */}
            <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                Configuración de Interfaz
              </h3>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'border-b-2 border-blue-500' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={{ 
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
                    backgroundColor: activeTab === tab.id ? 'var(--muted)' : 'transparent'
                  }}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-4 max-h-80 overflow-y-auto">
              {activeTab === 'navigation' && (
                <div className="space-y-2">
                  <h4 className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    Tipo de Navegación
                  </h4>
                  {navigationOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (!option.disabled) {
                          setNavigationType(option.id)
                        }
                      }}
                      disabled={option.disabled}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        navigationType === option.id
                          ? 'bg-blue-500/20 border-blue-500/50' 
                          : option.disabled
                          ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={{ 
                        color: navigationType === option.id ? 'var(--primary)' : option.disabled ? 'var(--muted-foreground)' : 'var(--foreground)',
                        border: navigationType === option.id ? '1px solid var(--primary)' : '1px solid var(--border)'
                      }}
                    >
                      {option.icon}
                      <div className="text-left">
                        <div className="font-medium">{option.title}</div>
                        <div className="text-sm opacity-70">{option.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'design' && (
                <div className="space-y-2">
                  <h4 className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>
                    Tema de Diseño
                  </h4>
                  {designThemeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setDesignTheme(option.id)
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        designTheme === option.id
                          ? 'bg-purple-500/20 border-purple-500/50' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={{ 
                        color: designTheme === option.id ? '#8b5cf6' : 'var(--foreground)',
                        border: designTheme === option.id ? '1px solid #8b5cf6' : '1px solid var(--border)'
                      }}
                    >
                      <div className={`p-2 rounded bg-gradient-to-r ${option.color} text-white`}>
                        {option.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{option.title}</div>
                        <div className="text-sm opacity-70">{option.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-gray-50 dark:bg-gray-800/50" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-3 py-2 text-sm rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                Aplicar Cambios
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
