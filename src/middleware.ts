import { NextRequest, NextResponse } from 'next/server'

// Configuración de seguridad flexible para desarrollo y producción
const SECURITY_CONFIG = {
  // IPs autorizadas (principalmente para desarrollo local)
  AUTHORIZED_IPS: [
    '127.0.0.1', // localhost
    '::1', // localhost IPv6
    '192.168.1.35', // Tu IP local
    // En producción, esto se ignora si DISABLE_IP_CHECK está en true
  ],
  
  // En producción, desactivar verificación de IP por defecto
  DISABLE_IP_CHECK: process.env.NODE_ENV === 'production',
  
  // Rutas secretas permitidas
  SECRET_ADMIN_PATH: process.env.ADMIN_SECRET_PATH || 'mi-panel-secreto-2025',
  SECRET_KEY: process.env.ADMIN_SECRET_KEY || 'clave-acceso-secreta-carlos'
}

// Lista de User Agents sospechosos (bots, scrapers)
const BLOCKED_USER_AGENTS = [
  'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python-requests',
  'postman', 'insomnia', 'httpie', 'nikto', 'sqlmap', 'nmap', 'masscan'
]

// Rutas que intentan acceder a admin de forma sospechosa
const SUSPICIOUS_PATTERNS = [
  '/admin.php', '/administrator', '/wp-admin', '/backend',
  '/dashboard', '/panel', '/admin/login', '/admin/panel'
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  
  // Verificar patrones sospechosos
  if (SUSPICIOUS_PATTERNS.some(pattern => pathname.includes(pattern))) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('cf-connecting-ip') || 
                     'unknown'
    console.warn(`🚨 SUSPICIOUS ACCESS ATTEMPT: ${pathname} from ${clientIP}`)
    return NextResponse.redirect(new URL('/404', request.url))
  }

  // Verificar acceso a admin con URL secreta
  if (pathname === `/${SECURITY_CONFIG.SECRET_ADMIN_PATH}`) {
    const secretKey = searchParams.get('key')
    
    // Verificar que tenga la clave secreta correcta
    if (secretKey !== SECURITY_CONFIG.SECRET_KEY) {
      console.warn(`🚨 UNAUTHORIZED ACCESS TO SECRET PATH: ${pathname} without valid key`)
      return NextResponse.redirect(new URL('/404', request.url))
    }
    
    // Si tiene la clave correcta, permitir acceso sin más verificaciones
    console.log(`✅ AUTHORIZED ACCESS TO SECRET ADMIN PATH from ${request.headers.get('x-forwarded-for')}`)
    return NextResponse.next()
  }
  
  // Aplicar verificaciones estrictas solo a /admin tradicional
  if (pathname.startsWith('/admin')) {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const connectingIP = request.headers.get('cf-connecting-ip')
    
    const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''

    console.log('Admin access attempt from IP:', ip, 'UserAgent:', userAgent)

    // Verificar IP solo si no está desactivada la verificación
    if (!SECURITY_CONFIG.DISABLE_IP_CHECK && !SECURITY_CONFIG.AUTHORIZED_IPS.includes(ip.trim())) {
      console.warn(`🚨 UNAUTHORIZED IP: ${ip} attempted to access ${pathname}`)
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
