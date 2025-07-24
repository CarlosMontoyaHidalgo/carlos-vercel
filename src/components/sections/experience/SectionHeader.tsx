interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
}

export default function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center mb-8">
      {icon}
      <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h3>
    </div>
  )
}
