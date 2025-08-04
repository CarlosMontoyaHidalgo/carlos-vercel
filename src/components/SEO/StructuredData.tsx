import Script from 'next/script'
import { structuredData } from '@/lib/seo'
import { getLocalizedStructuredData } from '@/lib/seo-localized'

interface StructuredDataProps {
  data?: object
  language?: 'es' | 'en'
}

export default function StructuredData({ data, language = 'es' }: StructuredDataProps) {
  // Usar datos localizados si no se proporcionan datos específicos
  const schemaData = data || getLocalizedStructuredData(language)

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  )
}
