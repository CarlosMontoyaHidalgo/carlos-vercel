'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SecretAdminAccess() {
  const [clickCount, setClickCount] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickCount === 4) { // 5 clics para mostrar hint
      setShowHint(true)
      setTimeout(() => setShowHint(false), 5000)
    }
    
    if (clickCount === 9) { // 10 clics para acceder
      const secretPath = process.env.ADMIN_SECRET_PATH || 'mi-panel-secreto-2025'
      const secretKey = process.env.ADMIN_SECRET_KEY || 'clave-acceso-secreta-carlos'
      
      // Redirigir a la URL secreta
      window.location.href = `/${secretPath}?key=${secretKey}`
    }

    // Reset después de 3 segundos sin clics
    setTimeout(() => {
      setClickCount(0)
    }, 3000)
  }

  if (process.env.NODE_ENV === 'production') {
    return null // No mostrar en producción
  }

  return (
    <>
      {/* Botón secreto invisible */}
      <button
        onClick={handleSecretClick}
        className="fixed bottom-2 right-2 w-4 h-4 opacity-0 cursor-default z-50"
        title={clickCount > 0 ? `Admin access: ${clickCount}/10` : ''}
      />
      
      {/* Hint para acceso admin */}
      {showHint && (
        <motion.div
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <p className="text-sm">💡 Sigue haciendo clic para acceso admin</p>
        </motion.div>
      )}
    </>
  )
}
