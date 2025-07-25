import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const portfolioPath = path.join(process.cwd(), 'src/data/portfolio.json')

export async function GET() {
  try {
    const data = fs.readFileSync(portfolioPath, 'utf8')
    const portfolio = JSON.parse(data)
    return NextResponse.json(portfolio.projects?.items || [])
  } catch (error) {
    console.error('Error reading projects:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projects = await request.json()
    
    // Leer el archivo actual
    const data = fs.readFileSync(portfolioPath, 'utf8')
    const portfolio = JSON.parse(data)
    
    // Asegurar que la estructura de proyectos existe
    if (!portfolio.projects) {
      portfolio.projects = {
        title: "Proyectos",
        subtitle: "Algunos de mis trabajos recientes",
        items: []
      }
    }
    
    // Actualizar los proyectos
    portfolio.projects.items = projects
    
    // Escribir de vuelta al archivo
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving projects:', error)
    return NextResponse.json({ error: 'Error saving projects' }, { status: 500 })
  }
}
