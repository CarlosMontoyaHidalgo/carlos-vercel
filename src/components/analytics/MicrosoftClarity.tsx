'use client'

import { useEffect } from 'react'

interface MicrosoftClarityProps {
  projectId?: string
  enabled?: boolean
}

declare global {
  interface Window {
    clarity: any
  }
}

export default function MicrosoftClarity({ 
  projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  enabled = process.env.NODE_ENV === 'production' 
}: MicrosoftClarityProps) {
  
  useEffect(() => {
    // Solo cargar en producción y si tenemos Project ID
    if (!enabled || !projectId) {
      console.log('Microsoft Clarity disabled:', { enabled, projectId: !!projectId })
      return
    }

    // Evitar cargar múltiples veces
    if (window.clarity) {
      return
    }

    // Crear el script de Clarity
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");
    `

    // Añadir el script al head
    document.head.appendChild(script)

    // Log para desarrollo
    console.log('Microsoft Clarity initialized with project:', projectId)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [projectId, enabled])

  return null
}

// Funciones helper para tracking personalizado
export const clarityTrack = {
  // Tracking de eventos personalizados
  event: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventName, properties)
    }
  },

  // Identificar usuarios (opcional)
  identify: (userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('identify', userId, properties)
    }
  },

  // Etiquetar sesiones
  tag: (tagName: string) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('tag', tagName)
    }
  },

  // Eventos específicos del portfolio
  portfolio: {
    cvDownload: (language: string) => {
      clarityTrack.event('cv_download', { language })
    },
    
    projectView: (projectName: string) => {
      clarityTrack.event('project_view', { project: projectName })
    },
    
    contactClick: (method: string) => {
      clarityTrack.event('contact_click', { method })
    },
    
    sectionView: (section: string) => {
      clarityTrack.event('section_view', { section })
    },
    
    languageChange: (language: string) => {
      clarityTrack.event('language_change', { language })
    },
    
    themeChange: (theme: string) => {
      clarityTrack.event('theme_change', { theme })
    }
  }
}
