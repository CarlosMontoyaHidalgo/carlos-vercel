import { NextRequest, NextResponse } from 'next/server'

// Tu IP autorizada (reemplaza con tu IP real)
const AUTHORIZED_IPS = [
  '127.0.0.1', // localhost
  '::1', // localhost IPv6
  '192.168.1.35', // Tu IP local actual (cámbiala por la tuya)
  // Agrega aquí otras IPs autorizadas si necesitas
]

export function middleware(request: NextRequest) {
  // Solo aplicar middleware a rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const connectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
    
    const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'

    console.log('Admin access attempt from IP:', ip)

    if (!AUTHORIZED_IPS.includes(ip.trim())) {
      // Redirigir a 404 para ocultar que existe la ruta
      return NextResponse.redirect(new URL('/404', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
