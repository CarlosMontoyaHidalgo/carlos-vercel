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
    const experiencePath = path.join(process.cwd(), 'src/data/experience.json')
    const experienceData = JSON.parse(fs.readFileSync(experiencePath, 'utf8'))
    
    return NextResponse.json(experienceData.experience.items || [])
  } catch (error) {
    console.error('Error loading experiences:', error)
    return NextResponse.json({ error: 'Failed to load experiences' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedIP(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { experiences } = await request.json()
    
    if (!experiences || !Array.isArray(experiences)) {
      return NextResponse.json({ error: 'Invalid experiences data' }, { status: 400 })
    }

    const experiencePath = path.join(process.cwd(), 'src/data/experience.json')
    const experienceData = JSON.parse(fs.readFileSync(experiencePath, 'utf8'))
    
    // Actualizar solo los items de experiencia
    experienceData.experience.items = experiences
    
    fs.writeFileSync(experiencePath, JSON.stringify(experienceData, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving experiences:', error)
    return NextResponse.json({ error: 'Failed to save experiences' }, { status: 500 })
  }
}
