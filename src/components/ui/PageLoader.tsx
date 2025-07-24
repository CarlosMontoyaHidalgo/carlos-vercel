'use client'

import { useEffect, useState } from 'react'
import Loading from './Loading'

interface PageLoaderProps {
  children: React.ReactNode
  loadingTime?: number
}

export default function PageLoader({ children, loadingTime = 2000 }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('Cargando...')

  useEffect(() => {
    const texts = [
      'Cargando...',
      'Preparando componentes...',
      'Configurando tema...',
      '¡Ya casi está listo!'
    ]
    
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < texts.length - 1) {
        currentIndex++
        setLoadingText(texts[currentIndex])
      }
    }, 500)

    const timer = setTimeout(() => {
      setIsLoading(false)
      clearInterval(interval)
    }, loadingTime)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [loadingTime])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 gradient-bg flex items-center justify-center">
        <div className="text-center">
          {/* Logo o nombre */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              Carlos
            </h1>
            <p className="text-white/80 text-lg">
              Desarrollador Full Stack
            </p>
          </div>
          
          {/* Loading component */}
          <Loading 
            type="gradient" 
            text={loadingText}
            size="lg"
          />
          
          {/* Elementos decorativos */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
