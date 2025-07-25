import CryptoJS from 'crypto-js'

// Configuración de seguridad
const ADMIN_CONFIG = {
  // Contraseña secreta (cámbiala por una muy segura)
  SECRET_PASSWORD: process.env.ADMIN_SECRET_PASSWORD || 'carlosAdmin2025!SecretKey',
  
  // Salt para encriptación
  ENCRYPTION_SALT: process.env.ENCRYPTION_SALT || 'carlos-portfolio-salt-2025',
  
  // Duración de sesión (en milisegundos) - 2 horas
  SESSION_DURATION: 2 * 60 * 60 * 1000,
  
  // Máximo intentos fallidos antes de bloqueo temporal
  MAX_FAILED_ATTEMPTS: 3,
  
  // Tiempo de bloqueo tras intentos fallidos (15 minutos)
  LOCKOUT_DURATION: 15 * 60 * 1000
}

interface AuthSession {
  token: string
  expiresAt: number
  ip: string
  userAgent: string
}

interface FailedAttempt {
  ip: string
  timestamp: number
  userAgent: string
}

class AdminAuthManager {
  private sessions: Map<string, AuthSession> = new Map()
  private failedAttempts: Map<string, FailedAttempt[]> = new Map()

  // Generar token seguro
  private generateSecureToken(): string {
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substring(2)
    return CryptoJS.SHA256(timestamp + random + ADMIN_CONFIG.ENCRYPTION_SALT).toString()
  }

  // Verificar si IP está bloqueada temporalmente
  isIPBlocked(ip: string): boolean {
    const attempts = this.failedAttempts.get(ip) || []
    const recentAttempts = attempts.filter(
      attempt => Date.now() - attempt.timestamp < ADMIN_CONFIG.LOCKOUT_DURATION
    )
    
    return recentAttempts.length >= ADMIN_CONFIG.MAX_FAILED_ATTEMPTS
  }

  // Registrar intento fallido
  registerFailedAttempt(ip: string, userAgent: string): void {
    const attempts = this.failedAttempts.get(ip) || []
    attempts.push({
      ip,
      timestamp: Date.now(),
      userAgent
    })
    
    // Mantener solo intentos recientes
    const recentAttempts = attempts.filter(
      attempt => Date.now() - attempt.timestamp < ADMIN_CONFIG.LOCKOUT_DURATION
    )
    
    this.failedAttempts.set(ip, recentAttempts)
    
    // Log de seguridad
    console.warn(`🚨 ADMIN ACCESS DENIED - IP: ${ip} - UserAgent: ${userAgent} - Attempts: ${recentAttempts.length}`)
  }

  // Autenticar con contraseña
  authenticate(password: string, ip: string, userAgent: string): string | null {
    // Verificar si IP está bloqueada
    if (this.isIPBlocked(ip)) {
      console.warn(`🔒 IP BLOCKED - ${ip} - Too many failed attempts`)
      return null
    }

    // Verificar contraseña
    const hashedPassword = CryptoJS.SHA256(password + ADMIN_CONFIG.ENCRYPTION_SALT).toString()
    const expectedHash = CryptoJS.SHA256(ADMIN_CONFIG.SECRET_PASSWORD + ADMIN_CONFIG.ENCRYPTION_SALT).toString()
    
    if (hashedPassword !== expectedHash) {
      this.registerFailedAttempt(ip, userAgent)
      return null
    }

    // Crear sesión
    const token = this.generateSecureToken()
    const session: AuthSession = {
      token,
      expiresAt: Date.now() + ADMIN_CONFIG.SESSION_DURATION,
      ip,
      userAgent
    }

    this.sessions.set(token, session)
    
    // Log exitoso
    console.log(`✅ ADMIN AUTHENTICATED - IP: ${ip} - Token: ${token.substring(0, 8)}...`)
    
    return token
  }

  // Verificar token de sesión
  verifySession(token: string, ip: string, userAgent: string): boolean {
    const session = this.sessions.get(token)
    
    if (!session) return false
    
    // Verificar expiración
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token)
      return false
    }
    
    // Verificar IP y User Agent (protección contra robo de sesión)
    if (session.ip !== ip || session.userAgent !== userAgent) {
      this.sessions.delete(token)
      console.warn(`🚨 SESSION HIJACK ATTEMPT - Token: ${token.substring(0, 8)}... - Expected IP: ${session.ip} - Actual IP: ${ip}`)
      return false
    }
    
    return true
  }

  // Renovar sesión
  renewSession(token: string): boolean {
    const session = this.sessions.get(token)
    if (session && this.verifySession(token, session.ip, session.userAgent)) {
      session.expiresAt = Date.now() + ADMIN_CONFIG.SESSION_DURATION
      return true
    }
    return false
  }

  // Cerrar sesión
  logout(token: string): void {
    this.sessions.delete(token)
  }

  // Limpiar sesiones expiradas (ejecutar periódicamente)
  cleanupExpiredSessions(): void {
    const now = Date.now()
    for (const [token, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(token)
      }
    }
  }

  // Obtener estadísticas de seguridad
  getSecurityStats(): {
    activeSessions: number
    blockedIPs: number
    totalFailedAttempts: number
  } {
    const now = Date.now()
    let blockedIPs = 0
    let totalFailedAttempts = 0

    for (const [ip, attempts] of this.failedAttempts.entries()) {
      const recentAttempts = attempts.filter(
        attempt => now - attempt.timestamp < ADMIN_CONFIG.LOCKOUT_DURATION
      )
      if (recentAttempts.length >= ADMIN_CONFIG.MAX_FAILED_ATTEMPTS) {
        blockedIPs++
      }
      totalFailedAttempts += attempts.length
    }

    return {
      activeSessions: this.sessions.size,
      blockedIPs,
      totalFailedAttempts
    }
  }
}

// Instancia singleton
export const adminAuth = new AdminAuthManager()

// Limpiar sesiones cada 10 minutos
setInterval(() => {
  adminAuth.cleanupExpiredSessions()
}, 10 * 60 * 1000)

export default adminAuth
