import ContactCard from './ContactCard'

interface ContactInfo {
  icon: React.ReactNode
  title: string
  value: string
  link: string
}

interface ContactGridProps {
  contactInfo: ContactInfo[]
}

export default function ContactGrid({ contactInfo }: ContactGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {contactInfo.map((contact, index) => (
        <ContactCard 
          key={contact.title}
          contact={contact}
          index={index}
        />
      ))}
    </div>
  )
}
