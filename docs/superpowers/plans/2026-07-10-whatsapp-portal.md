# Portal /whatsapp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a password-gated `/whatsapp` page where the sales team opens the company WhatsApp Web session, per `docs/superpowers/specs/2026-07-10-whatsapp-route-design.md`.

**Architecture:** A signed-cookie session gate. `lib/whatsappAuth.ts` holds the crypto (sign/verify token, verify password) as pure functions. `app/api/whatsapp-auth/route.ts` is the only place a password is ever checked and a cookie is ever set. `app/whatsapp/page.tsx` is a Server Component that reads the cookie directly via `cookies()` (Next 15, async) and renders either the login form or the launch button — no client-side routing needed. `components/WhatsappLoginForm.tsx` is the only Client Component, and it just POSTs the password and calls `router.refresh()` on success so the Server Component re-evaluates.

**Deviation from the approved design doc:** the design doc lists `middleware.ts` as a component. During planning this turned out to be redundant — `middleware.ts` can only allow/redirect/rewrite a request, and both the "show login form" and "show launch button" states live at the *same* URL (`/whatsapp`) with the *same* rendering decision the page itself already has to make by reading the cookie. Adding a middleware that reads the cookie, decides "valid", and then calls `NextResponse.next()` either way does nothing a Server Component reading `cookies()` doesn't already do. This plan skips `middleware.ts` and puts the check directly in `app/whatsapp/page.tsx`. Security properties (httpOnly, signed, sameSite, fail-closed) are unchanged.

**Tech Stack:** Next.js 15 (App Router, Route Handlers), React 19, TypeScript, Node's built-in `crypto` (HMAC-SHA256) — no new dependencies.

---

## File Structure

| File | Responsibility |
|---|---|
| `lib/whatsappAuth.ts` | Create/verify signed session tokens; verify the shared password. Pure functions, no I/O. |
| `app/api/whatsapp-auth/route.ts` | `POST` handler: verifies password, sets the session cookie. |
| `components/WhatsappLoginForm.tsx` | Client component: password form, posts to the API route, refreshes on success. |
| `app/whatsapp/page.tsx` | Server component: reads the cookie, renders login form or the "Abrir WhatsApp Web" button. |
| `app/globals.css` | New `.whatsapp-portal*` rules appended as a new numbered section (24). |
| `.env.local.example`, `.env.production.example` | Document `WHATSAPP_PORTAL_PASSWORD` and `WHATSAPP_PORTAL_SECRET`. |

---

### Task 1: Env var documentation

**Files:**
- Modify: `.env.local.example`
- Modify: `.env.production.example`

- [ ] **Step 1: Add the two new variables to `.env.local.example`**

Current content:
```
# Copie este arquivo para .env.local e preencha os valores

EMAIL_HOST_USER=seuemail@gmail.com
EMAIL_HOST_PASSWORD=sua_senha_de_app_gmail
```

New content:
```
# Copie este arquivo para .env.local e preencha os valores

EMAIL_HOST_USER=seuemail@gmail.com
EMAIL_HOST_PASSWORD=sua_senha_de_app_gmail

# Portal interno /whatsapp (acesso da equipe de vendas ao WhatsApp Web)
WHATSAPP_PORTAL_PASSWORD=defina_uma_senha_forte
WHATSAPP_PORTAL_SECRET=uma_string_aleatoria_longa_para_assinar_o_cookie
```

- [ ] **Step 2: Add the same two variables to `.env.production.example`**

Current content:
```
# SMTP configuration used by contact form API, if applicable.
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password

# Public sender email shown in forms/emails.
NEXT_PUBLIC_CONTACT_EMAIL=contato@example.com
```

New content:
```
# SMTP configuration used by contact form API, if applicable.
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password

# Public sender email shown in forms/emails.
NEXT_PUBLIC_CONTACT_EMAIL=contato@example.com

# Portal interno /whatsapp (acesso da equipe de vendas ao WhatsApp Web)
WHATSAPP_PORTAL_PASSWORD=defina_uma_senha_forte
WHATSAPP_PORTAL_SECRET=uma_string_aleatoria_longa_para_assinar_o_cookie
```

- [ ] **Step 3: Commit**

```bash
git add .env.local.example .env.production.example
git commit -m "docs: document WhatsApp portal env vars"
```

---

### Task 2: Auth utility (`lib/whatsappAuth.ts`)

**Files:**
- Create: `lib/whatsappAuth.ts`

No test runner is configured in this project (`package.json` has no test script/dependency — confirmed: only `next`, `react`, `react-dom`, `nodemailer` as deps). This task is verified manually in Task 2 Step 3 via `node`, not an automated test suite.

- [ ] **Step 1: Write `lib/whatsappAuth.ts`**

```typescript
import { createHmac, timingSafeEqual } from 'crypto'

export const WHATSAPP_SESSION_COOKIE = 'whatsapp_session'

const SESSION_PAYLOAD = 'authenticated'

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
  const bufA = Buffer.from(a, 'hex')
  const bufB = Buffer.from(b, 'hex')
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function createSessionToken(): string {
  return `${SESSION_PAYLOAD}.${sign(SESSION_PAYLOAD)}`
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
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
```

- [ ] **Step 2: Verify it fails closed with no env vars set**

Run:
```bash
node -e "
process.env.WHATSAPP_PORTAL_SECRET = ''
const { isValidSessionToken, verifyPassword } = require('./lib/whatsappAuth.ts')
"
```

This won't run directly (`.ts` needs a loader) — instead verify via `npx tsx`:

```bash
npx --yes tsx -e "
delete process.env.WHATSAPP_PORTAL_SECRET
delete process.env.WHATSAPP_PORTAL_PASSWORD
import('./lib/whatsappAuth.ts').then(async (m) => {
  console.log('verifyPassword (no env):', m.verifyPassword('anything'))
  console.log('isValidSessionToken (bad token):', m.isValidSessionToken('garbage'))

  process.env.WHATSAPP_PORTAL_SECRET = 'test-secret'
  process.env.WHATSAPP_PORTAL_PASSWORD = 'test-password'
  const token = m.createSessionToken()
  console.log('token:', token)
  console.log('isValidSessionToken (real token):', m.isValidSessionToken(token))
  console.log('isValidSessionToken (tampered):', m.isValidSessionToken(token + 'x'))
  console.log('verifyPassword (correct):', m.verifyPassword('test-password'))
  console.log('verifyPassword (wrong):', m.verifyPassword('nope'))
})
"
```

Expected output:
```
verifyPassword (no env): false
isValidSessionToken (bad token): false
token: authenticated.<64 hex chars>
isValidSessionToken (real token): true
isValidSessionToken (tampered): false
verifyPassword (correct): true
verifyPassword (wrong): false
```

- [ ] **Step 3: Commit**

```bash
git add lib/whatsappAuth.ts
git commit -m "feat: add signed session token helpers for WhatsApp portal"
```

---

### Task 3: Auth API route

**Files:**
- Create: `app/api/whatsapp-auth/route.ts`

- [ ] **Step 1: Write the route handler**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import {
  WHATSAPP_SESSION_COOKIE,
  createSessionToken,
  verifyPassword,
} from '@/lib/whatsappAuth'

export async function POST(request: NextRequest) {
  let password = ''
  try {
    const body = await request.json()
    password = typeof body.password === 'string' ? body.password : ''
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
```

- [ ] **Step 2: Manual verification with the dev server**

```bash
npm run dev
```

In another terminal, with `WHATSAPP_PORTAL_PASSWORD`/`WHATSAPP_PORTAL_SECRET` set in `.env.local`:

```bash
curl -i -X POST http://localhost:3000/api/whatsapp-auth \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong"}'
```
Expected: `HTTP/1.1 401` and body `{"error":"invalid_password"}`.

```bash
curl -i -X POST http://localhost:3000/api/whatsapp-auth \
  -H "Content-Type: application/json" \
  -d '{"password":"<the real WHATSAPP_PORTAL_PASSWORD value>"}'
```
Expected: `HTTP/1.1 200`, body `{"ok":true}`, and a `Set-Cookie: whatsapp_session=authenticated.<hex>; Path=/whatsapp; HttpOnly; SameSite=Lax` header.

- [ ] **Step 3: Commit**

```bash
git add app/api/whatsapp-auth/route.ts
git commit -m "feat: add /api/whatsapp-auth route to issue the portal session cookie"
```

---

### Task 4: Login form component

**Files:**
- Create: `components/WhatsappLoginForm.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WhatsappLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const response = await fetch('/api/whatsapp-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      setError(true)
      setLoading(false)
      return
    }

    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="whatsapp-portal__form" aria-label="Login do portal WhatsApp">
      <div className="form-group">
        <label className="form-label" htmlFor="whatsapp-password">
          Senha
        </label>
        <input
          id="whatsapp-password"
          type="password"
          name="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          autoComplete="current-password"
        />
      </div>

      {error && <p className="whatsapp-portal__error">Senha incorreta.</p>}

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WhatsappLoginForm.tsx
git commit -m "feat: add WhatsApp portal login form"
```

(This component is only exercised end-to-end once Task 5 wires it into the page — verification happens there.)

---

### Task 5: `/whatsapp` page

**Files:**
- Create: `app/whatsapp/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import {
  WHATSAPP_SESSION_COOKIE,
  isValidSessionToken,
} from '@/lib/whatsappAuth'
import WhatsappLoginForm from '@/components/WhatsappLoginForm'

export const metadata: Metadata = {
  title: 'Portal WhatsApp — Intech Jr.',
  robots: { index: false, follow: false },
}

export default async function WhatsappPortalPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(WHATSAPP_SESSION_COOKIE)?.value
  const authenticated = isValidSessionToken(token)

  return (
    <main className="whatsapp-portal">
      <div className="whatsapp-portal__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Logo.png" alt="Intech Jr." className="whatsapp-portal__logo" />
        <h1 className="whatsapp-portal__title">Portal WhatsApp</h1>

        {authenticated ? (
          <>
            <p className="whatsapp-portal__text">
              Clique abaixo para abrir o WhatsApp Web da empresa.
            </p>
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-portal__button"
            >
              <i className="bi bi-whatsapp" aria-hidden="true" /> Abrir WhatsApp Web
            </a>
          </>
        ) : (
          <>
            <p className="whatsapp-portal__text">Acesso restrito à equipe de vendas.</p>
            <WhatsappLoginForm />
          </>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Manual verification in the browser**

With `npm run dev` running and `.env.local` populated with `WHATSAPP_PORTAL_PASSWORD`/`WHATSAPP_PORTAL_SECRET`:

1. Open `http://localhost:3000/whatsapp` in a browser with no cookies for the site → expect the password form.
2. Submit the wrong password → expect "Senha incorreta." to appear, form stays.
3. Submit the correct password → expect the page to switch (via `router.refresh()`) to the "Abrir WhatsApp Web" button without a full page reload.
4. Click "Abrir WhatsApp Web" → expect a new tab to open `https://web.whatsapp.com`.
5. Close the browser entirely, reopen, and revisit `/whatsapp` → expect the password form again (cookie was session-only, no `Max-Age`).
6. In DevTools → Application → Cookies, confirm `whatsapp_session` has no `Expires` value shown (session cookie) and `HttpOnly` is checked.

- [ ] **Step 3: Commit**

```bash
git add app/whatsapp/page.tsx
git commit -m "feat: add /whatsapp portal page"
```

---

### Task 6: Styling

**Files:**
- Modify: `app/globals.css` (append new section at end of file, after line 2291 / section 23)

- [ ] **Step 1: Append the new CSS section**

Add at the very end of `app/globals.css`:

```css

/* =============================================
   24. WhatsApp Portal (/whatsapp)
   ============================================= */
.whatsapp-portal {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: var(--bg-primary);
}

.whatsapp-portal__card {
  width: 100%;
  max-width: 380px;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 40px 32px;
  text-align: center;
}

.whatsapp-portal__logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  margin: 0 auto 16px;
}

.whatsapp-portal__title {
  color: var(--text-primary);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.whatsapp-portal__text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 24px;
}

.whatsapp-portal__form {
  text-align: left;
}

.whatsapp-portal__error {
  color: #f87171;
  font-size: 0.85rem;
  margin: -8px 0 16px;
}

.whatsapp-portal__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 20px;
  border-radius: 10px;
  background: #25d366;
  color: #0b141a;
  font-weight: 600;
  text-decoration: none;
  transition: filter 0.2s ease;
}

.whatsapp-portal__button:hover {
  filter: brightness(1.08);
}
```

- [ ] **Step 2: Manual verification**

Reload `http://localhost:3000/whatsapp` in the browser (both logged-out and logged-in states from Task 5) and confirm the card is centered, readable in the site's dark theme, and the button uses WhatsApp's green.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add WhatsApp portal page styles"
```

---

### Task 7: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add a note about the new route and API route**

In the "Architecture" section of `CLAUDE.md`, after the bullet list of components, add:

```markdown
- **`/whatsapp`** — internal, password-gated page (not linked from the public nav) that lets the sales team open the company WhatsApp Web session. Session is a signed, httpOnly, browser-session-only cookie (`whatsapp_session`), checked directly in `app/whatsapp/page.tsx` via `cookies()`. Auth logic lives in `lib/whatsappAuth.ts`; the only API route in the project, `app/api/whatsapp-auth/route.ts`, verifies the shared password (`WHATSAPP_PORTAL_PASSWORD` env var) and issues the cookie (signed with `WHATSAPP_PORTAL_SECRET`). WhatsApp Web can't be embedded in an iframe (it sends frame-denying headers), so this page only links out to `web.whatsapp.com` in a new tab — it relies on WhatsApp's own multi-device linking for concurrent sales-team access.
```

Also update the "Environment variables" section to mention the two new vars aren't stale (unlike the SMTP ones) — add a line:

```markdown
- `WHATSAPP_PORTAL_PASSWORD` / `WHATSAPP_PORTAL_SECRET` — required by the `/whatsapp` portal (see Architecture above). Unlike the SMTP vars, these are actively used.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: document the /whatsapp portal in CLAUDE.md"
```

---

## Self-Review Notes

- **Spec coverage:** shared password ✅ (Task 2/3), browser-session cookie with no `Max-Age` ✅ (Task 3), post-login button opening `web.whatsapp.com` in new tab ✅ (Task 5), fail-closed when env vars missing ✅ (Task 2 `getSecret()` throws, Task 3 catches and returns 500, `verifyPassword` returns `false` when unset), env vars documented ✅ (Task 1), no other components touched ✅.
- **Deviation flagged above:** `middleware.ts` dropped as redundant; functional behavior matches the spec's intent unchanged.
- **Type consistency:** `WHATSAPP_SESSION_COOKIE` name and `isValidSessionToken`/`createSessionToken`/`verifyPassword` signatures are identical across Task 2 (definition), Task 3 (API route), and Task 5 (page) — no drift.
