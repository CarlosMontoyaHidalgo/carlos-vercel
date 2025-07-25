'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminPage from '../admin/page'

export default function SecretAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Verificar si tiene el parámetro secreto correcto
    const secretKey = searchParams.get('key')
    const expectedKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || 'clave-acceso-secreta-carlos'
    
    // Si no tiene la clave correcta, redirigir a 404
    if (secretKey !== expectedKey) {
      router.push('/404')
      return
    }

    // Si tiene la clave correcta, continuar normalmente
  }, [searchParams, router])

  // Renderizar el panel de admin normal
  return <AdminPage />
}
