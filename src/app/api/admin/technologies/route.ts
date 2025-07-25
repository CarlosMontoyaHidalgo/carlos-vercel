import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Verificar IP autorizada
function isAuthorizedIP(request: NextRequest): boolean {
  const AUTHORIZED_IPS = [
    '127.0.0.1',
    '::1',
    '192.168.1.35', // Cambia por tu IP real
  ]

  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const connectingIP = request.headers.get('cf-connecting-ip')
  
  const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'
  
  return AUTHORIZED_IPS.includes(ip.trim())
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedIP(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const portfolioPath = path.join(process.cwd(), 'src/data/portfolio.json')
    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
    
    return NextResponse.json(portfolioData.technologies.categories || [])
  } catch (error) {
    console.error('Error loading technologies:', error)
    return NextResponse.json({ error: 'Failed to load technologies' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedIP(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { technologies } = await request.json()
    
    if (!technologies || !Array.isArray(technologies)) {
      return NextResponse.json({ error: 'Invalid technologies data' }, { status: 400 })
    }

    const portfolioPath = path.join(process.cwd(), 'src/data/portfolio.json')
    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))
    
    // Actualizar las categorías de tecnologías
    portfolioData.technologies.categories = technologies
    
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving technologies:', error)
    return NextResponse.json({ error: 'Failed to save technologies' }, { status: 500 })
  }
}
