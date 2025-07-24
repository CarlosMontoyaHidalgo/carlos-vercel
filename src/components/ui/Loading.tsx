'use client'

import { useEffect, useState } from 'react'

interface LoadingProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export default function Loading({ 
  type = 'gradient', 
  size = 'md', 
  text = 'Cargando...', 
  fullScreen = false 
}: LoadingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (type === 'gradient') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0
          return prev + Math.random() * 10
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [type])

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'
    : 'flex items-center justify-center p-8'

  const renderSpinner = () => (
    <div className={`loading-spinner ${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full`}></div>
  )

  const renderDots = () => (
    <div className="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} bg-blue-600 rounded-full`} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
  )

  const renderGradient = () => (
    <div className="relative w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full gradient-bg rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
    </div>
  )

  const renderLoading = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner()
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'gradient':
        return renderGradient()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        {renderLoading()}
        {text && (
          <p className="text-white dark:text-white text-sm font-medium animate-pulse">
            {text}
          </p>
        )}
        {type === 'gradient' && (
          <p className="text-xs text-white dark:text-white">
            {Math.round(progress)}%
          </p>
        )}
      </div>
    </div>
  )
}

// Hook personalizado para manejar estados de carga
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return { isLoading, startLoading, stopLoading }
}
