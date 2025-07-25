import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const connectingIP = request.headers.get('cf-connecting-ip')
  
  const ip = forwarded?.split(',')[0] || realIP || connectingIP || '127.0.0.1'

  return NextResponse.json({
    ip: ip.trim(),
    headers: {
      'x-forwarded-for': forwarded,
      'x-real-ip': realIP,
      'cf-connecting-ip': connectingIP,
    }
  })
}
