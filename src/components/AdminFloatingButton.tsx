'use client'

import { useState, useEffect } from 'react'
import { Settings } from 'lucide-react'

export default function AdminFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar si el usuario tiene acceso de admin
    const checkAdminAccess = async () => {
      try {
        const response = await fetch('/api/admin/content')
        if (response.ok) {
          setIsVisible(true)
        }
      } catch (error) {
        // No mostrar nada si no tiene acceso
      }
    }

    checkAdminAccess()
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="/admin"
        className="group bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        title="Modo Edición"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </a>
    </div>
  )
}
