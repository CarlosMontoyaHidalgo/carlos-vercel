'use client'

import { useNavigation } from './NavigationProvider'

interface ContentWrapperProps {
  children: React.ReactNode
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  const { navigationType } = useNavigation()

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      navigationType === 'sidebar' ? 'lg:ml-64' : ''
    }`}>
      {children}
    </div>
  )
}
