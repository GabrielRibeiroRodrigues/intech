'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Erro ao enviar mensagem.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <>
      {status === 'success' && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Mensagem enviada com sucesso!
          <button
            type="button"
            className="btn-close"
            onClick={() => setStatus('idle')}
            aria-label="Fechar"
          />
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMsg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setStatus('idle')}
            aria-label="Fechar"
          />
        </div>
      )}

      <form
        className="row justify-content-center"
        onSubmit={handleSubmit}
        aria-label="Formulário de contato"
      >
        <div className="col-md-6">
          <input
            type="text"
            name="nome"
            className="form-control mb-3"
            placeholder="Seu nome"
            required
            aria-label="Seu nome"
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Seu e-mail"
            required
            aria-label="Seu e-mail"
          />
          <textarea
            name="mensagem"
            className="form-control mb-3"
            rows={4}
            placeholder="Sua mensagem"
            required
            aria-label="Sua mensagem"
          />
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={status === 'loading'}
            aria-label="Enviar mensagem"
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </>
  )
}
