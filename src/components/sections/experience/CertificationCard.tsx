'use client'

import { Certification } from '@/hooks/usePortfolioData'
import { ExternalLink } from 'lucide-react'

interface CertificationCardProps {
  certification: Certification
  formatDate: (dateString: string) => string
}

export default function CertificationCard({ certification, formatDate }: CertificationCardProps) {
  return (
    <div 
      className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-lg group"
      style={{ 
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)'
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-bold flex-1" style={{ color: 'var(--foreground)' }}>
          {certification.name}
        </h4>
        <a
          href={certification.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--primary)' }}
        >
          <ExternalLink size={18} />
        </a>
      </div>
      
      <div className="mb-3" style={{ color: 'var(--primary)' }}>
        <span className="font-semibold">{certification.issuer}</span>
      </div>
      
      <div className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
        <span>Obtenida: {formatDate(certification.date)}</span>
      </div>
      
      <div className="mb-4">
        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          ID: {certification.credentialId}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {certification.skills.map((skill, skillIndex) => (
          <span 
            key={skillIndex}
            className="px-2 py-1 rounded text-xs"
            style={{ 
              backgroundColor: 'var(--muted)',
              color: 'var(--muted-foreground)'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
