'use client'

import { X } from 'lucide-react'
import { useNavigation } from './NavigationProvider'
import { useNavigation as useNavigationData, usePersonalInfo } from '@/hooks/usePortfolioData'

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigation()
  const navItems = useNavigationData()
  const personalInfo = usePersonalInfo()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsSidebarOpen(false)
  }

  return (
    <>
      {/* Overlay oscuro */}
      {isSidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '280px',
          backgroundColor: '#ffffff',
          borderRight: '2px solid #e5e7eb',
          zIndex: 999,
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1e40af'
          }}>
            {personalInfo?.name || 'Carlos'}
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '20px' }}>
          {navItems?.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.href)}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                marginBottom: '8px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                color: '#334155',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLElement
                target.style.backgroundColor = '#3b82f6'
                target.style.color = '#ffffff'
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLElement
                target.style.backgroundColor = '#f1f5f9'
                target.style.color = '#334155'
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#64748b',
            textAlign: 'center'
          }}>
            Portfolio - {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  )
}
