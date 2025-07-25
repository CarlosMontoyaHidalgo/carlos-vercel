import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      )
    }

    // Obtener IP y User Agent
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const connectingIP = request.headers.get('cf-connecting-ip')
    const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    // Intentar autenticar
    const token = adminAuth.authenticate(password, ip, userAgent)
    
    if (!token) {
      // Verificar si está bloqueado
      if (adminAuth.isIPBlocked(ip)) {
        return NextResponse.json(
          { 
            error: 'Too many failed attempts. Access temporarily blocked.',
            blocked: true,
            retryAfter: 15 * 60 // 15 minutos en segundos
          },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Respuesta exitosa con token
    const response = NextResponse.json({
      success: true,
      message: 'Authenticated successfully'
    })

    // Configurar cookie segura con el token
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60, // 2 horas
      path: '/admin'
    })

    return response
    
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar sesión actual
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const connectingIP = request.headers.get('cf-connecting-ip')
    const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    const isValid = adminAuth.verifySession(token, ip, userAgent)
    
    if (!isValid) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Renovar sesión
    adminAuth.renewSession(token)

    return NextResponse.json({ 
      authenticated: true,
      stats: adminAuth.getSecurityStats()
    })
    
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value
    
    if (token) {
      adminAuth.logout(token)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete('admin-token')
    
    return response
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
