'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, Shield, AlertTriangle, CheckCircle, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface LoginFormProps {
  onAuthenticated: () => void
}

export default function AdminLoginForm({ onAuthenticated }: LoginFormProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [retryAfter, setRetryAfter] = useState(0)

  useEffect(() => {
    // Verificar si ya está autenticado
    checkAuthStatus()
  }, [])

  useEffect(() => {
    // Countdown para desbloqueo
    if (retryAfter > 0) {
      const timer = setInterval(() => {
        setRetryAfter(prev => {
          if (prev <= 1) {
            setIsBlocked(false)
            setError('')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [retryAfter])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      if (response.ok) {
        onAuthenticated()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim() || isLoading || isBlocked) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setPassword('')
        onAuthenticated()
      } else {
        if (data.blocked) {
          setIsBlocked(true)
          setRetryAfter(data.retryAfter)
          setError(`Demasiados intentos fallidos. Acceso bloqueado por ${Math.ceil(data.retryAfter / 60)} minutos.`)
        } else {
          setError(data.error || 'Contraseña incorrecta')
        }
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Back to Home Button - Fixed Position */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
        title="Volver al portfolio principal"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Volver al Inicio</span>
      </Link>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Security Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-2xl">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-blue-200">Panel de Administración Seguro</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contraseña Secreta
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña de administrador"
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  disabled={isLoading || isBlocked}
                  maxLength={100}
                />
                <Lock size={20} className="absolute left-4 top-3.5 text-gray-300" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-300 hover:text-white transition-colors"
                  disabled={isLoading || isBlocked}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className={`flex items-center gap-2 p-4 rounded-xl ${
                    isBlocked 
                      ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                      : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-200'
                  }`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertTriangle size={20} />
                  <span className="text-sm">{error}</span>
                  {isBlocked && (
                    <div className="ml-auto font-mono text-lg">
                      {formatTime(retryAfter)}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!password.trim() || isLoading || isBlocked}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : isBlocked ? (
                <>
                  <Lock size={20} />
                  Acceso Bloqueado
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Acceder al Panel
                </>
              )}
            </motion.button>
          </form>

          {/* Security Info */}
          <motion.div
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <CheckCircle size={16} />
              <span>Protección multicapa activada</span>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-blue-300">
              <li>• Verificación de IP autorizada</li>
              <li>• Autenticación con contraseña secreta</li>
              <li>• Protección contra ataques de fuerza bruta</li>
              <li>• Sesión temporal con renovación automática</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-sm text-gray-400 mb-4">
            Solo usuarios autorizados • Todos los accesos son registrados
          </p>
          
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-200 rounded-lg hover:bg-blue-600/30 transition-all border border-blue-500/30"
            >
              <Home size={16} />
              Volver al Portfolio
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
