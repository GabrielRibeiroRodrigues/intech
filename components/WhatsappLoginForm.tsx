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
    if (loading) return

    setLoading(true)
    setError(false)

    try {
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
    } catch {
      setError(true)
      setLoading(false)
    }
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

      {error && (
        <p className="whatsapp-portal__error" aria-live="polite">
          Senha incorreta.
        </p>
      )}

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
