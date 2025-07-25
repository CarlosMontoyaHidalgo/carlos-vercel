import { NextRequest, NextResponse } from 'next/server'

// Tu IP autorizada (reemplaza con tu IP real)
const AUTHORIZED_IPS = [
  '127.0.0.1', // localhost
  '::1', // localhost IPv6
  '192.168.1.35', // Tu IP local actual (cámbiala por la tuya)
  // Agrega aquí otras IPs autorizadas si necesitas
]

// Lista de User Agents sospechosos (bots, scrapers)
const BLOCKED_USER_AGENTS = [
  'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python-requests',
  'postman', 'insomnia', 'httpie', 'nikto', 'sqlmap', 'nmap', 'masscan'
]

// Rutas que intentan acceder a admin de forma sospechosa
const SUSPICIOUS_PATTERNS = [
  '/admin.php', '/administrator', '/wp-admin', '/admin/', '/backend',
  '/dashboard', '/panel', '/admin/login', '/admin/panel'
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Verificar patrones sospechosos
  if (SUSPICIOUS_PATTERNS.some(pattern => pathname.includes(pattern))) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('cf-connecting-ip') || 
                     'unknown'
    console.warn(`🚨 SUSPICIOUS ACCESS ATTEMPT: ${pathname} from ${clientIP}`)
    return NextResponse.redirect(new URL('/404', request.url))
  }
  
  // Solo aplicar middleware de seguridad estricta a rutas de admin
  if (pathname.startsWith('/admin')) {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const connectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
    
    const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''

    console.log('Admin access attempt from IP:', ip, 'UserAgent:', userAgent)

    // Verificar IP autorizada
    if (!AUTHORIZED_IPS.includes(ip.trim())) {
      console.warn(`🚨 UNAUTHORIZED IP: ${ip} attempted to access ${pathname}`)
      // Redirigir a 404 para ocultar que existe la ruta
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Verificar User Agent sospechoso
    const lowerUserAgent = userAgent.toLowerCase()
    if (BLOCKED_USER_AGENTS.some(blocked => lowerUserAgent.includes(blocked))) {
      console.warn(`🚨 BLOCKED USER AGENT: ${userAgent} from IP: ${ip}`)
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Verificar si el User Agent está vacío (muy sospechoso)
    if (!userAgent.trim()) {
      console.warn(`🚨 EMPTY USER AGENT from IP: ${ip}`)
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Verificar métodos HTTP sospechosos
    if (!['GET', 'POST', 'DELETE'].includes(request.method)) {
      console.warn(`🚨 SUSPICIOUS METHOD: ${request.method} from IP: ${ip}`)
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Header de seguridad adicional
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'no-referrer')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
