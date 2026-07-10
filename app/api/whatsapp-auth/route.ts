import { NextRequest, NextResponse } from 'next/server'
import {
  WHATSAPP_SESSION_COOKIE,
  createSessionToken,
  verifyPassword,
} from '@/lib/whatsappAuth'

export async function POST(request: NextRequest) {
  let password: string
  try {
    const body = await request.json()
    if (typeof body.password !== 'string') {
      return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
    }
    password = body.password
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'invalid_password' }, { status: 401 })
  }

  let token: string
  try {
    token = createSessionToken()
  } catch {
    return NextResponse.json({ error: 'server_not_configured' }, { status: 500 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(WHATSAPP_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/whatsapp',
  })
  return response
}
