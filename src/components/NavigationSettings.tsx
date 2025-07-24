'use client'

import { Settings, Layout, Menu } from 'lucide-react'
import { useState } from 'react'
import { useNavigation } from './NavigationProvider'

export default function NavigationSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const { navigationType, setNavigationType } = useNavigation()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
        style={{ 
          color: 'var(--foreground)',
          backgroundColor: 'var(--muted)',
          border: '1px solid var(--border)'
        }}
        title="Configurar navegación"
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menú de configuración */}
          <div 
            className="absolute top-12 right-0 glass-effect rounded-lg p-4 min-w-48 z-50 shadow-xl"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Tipo de Navegación
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  setNavigationType('header')
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  navigationType === 'header' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={{ 
                  color: navigationType === 'header' ? 'var(--primary)' : 'var(--foreground)',
                  border: navigationType === 'header' ? '1px solid var(--primary)' : '1px solid var(--border)'
                }}
              >
                <Layout size={18} />
                <div className="text-left">
                  <div className="font-medium">Header</div>
                  <div className="text-sm opacity-70">Navegación superior</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setNavigationType('sidebar')
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  navigationType === 'sidebar' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={{ 
                  color: navigationType === 'sidebar' ? 'var(--primary)' : 'var(--foreground)',
                  border: navigationType === 'sidebar' ? '1px solid var(--primary)' : '1px solid var(--border)'
                }}
              >
                <Menu size={18} />
                <div className="text-left">
                  <div className="font-medium">Sidebar</div>
                  <div className="text-sm opacity-70">Barra lateral</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
