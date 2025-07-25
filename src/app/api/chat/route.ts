import { NextRequest, NextResponse } from 'next/server'
import { findBestResponse } from '@/lib/smartChatbot'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Simular tiempo de procesamiento realista (500ms - 1.5s)
    const processingTime = 500 + Math.random() * 1000
    await new Promise(resolve => setTimeout(resolve, processingTime))

    const response = findBestResponse(message)

    // Logging opcional para analytics
    console.log(`Chat query: "${message}" -> Category: ${response.category}, Confidence: ${response.confidence}%`)

    return NextResponse.json({
      message: response.answer,
      confidence: response.confidence,
      category: response.category,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error en chat:', error)
    return NextResponse.json(
      { 
        error: 'Lo siento, hubo un problema procesando tu mensaje. ¿Podrías intentar de nuevo?',
        message: 'Error interno del servidor'
      },
      { status: 500 }
    )
  }
}
