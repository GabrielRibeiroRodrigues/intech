import { createHmac, timingSafeEqual } from 'crypto'

export const WHATSAPP_SESSION_COOKIE = 'whatsapp_session'

const SESSION_PAYLOAD = 'authenticated'

// Throws (not a sentinel return) so a misconfigured server fails loudly when issuing a session, rather than silently minting an unverifiable cookie.
function getSecret(): string {
  const secret = process.env.WHATSAPP_PORTAL_SECRET
  if (!secret) {
    throw new Error('WHATSAPP_PORTAL_SECRET is not set')
  }
  return secret
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex')
}

function safeEqualHex(a: string, b: string): boolean {
  if (!/^[0-9a-fA-F]+$/.test(a) || !/^[0-9a-fA-F]+$/.test(b)) return false
  if (a.length !== b.length) return false
  const bufA = Buffer.from(a, 'hex')
  const bufB = Buffer.from(b, 'hex')
  return timingSafeEqual(bufA, bufB)
}

export function createSessionToken(): string {
  return `${SESSION_PAYLOAD}.${sign(SESSION_PAYLOAD)}`
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, signature] = parts
  if (payload !== SESSION_PAYLOAD) return false

  let expected: string
  try {
    expected = sign(payload)
  } catch {
    return false
  }
  return safeEqualHex(expected, signature)
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.WHATSAPP_PORTAL_PASSWORD
  if (!expected) return false

  const expectedBuf = Buffer.from(expected)
  const actualBuf = Buffer.from(password)
  if (expectedBuf.length !== actualBuf.length) return false
  return timingSafeEqual(expectedBuf, actualBuf)
}
