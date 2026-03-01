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
    <form onSubmit={handleSubmit} aria-label="Formulário de contato">
      {status === 'success' && (
        <div className="form-alert form-alert--success" role="alert">
          <i className="bi bi-check-circle-fill"></i>
          <span>Mensagem enviada! Entraremos em contato em breve.</span>
          <button
            type="button"
            className="form-alert__close"
            onClick={() => setStatus('idle')}
            aria-label="Fechar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="form-alert form-alert--error" role="alert">
          <i className="bi bi-exclamation-circle-fill"></i>
          <span>{errorMsg}</span>
          <button
            type="button"
            className="form-alert__close"
            onClick={() => setStatus('idle')}
            aria-label="Fechar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="nome">
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          name="nome"
          className="form-input"
          placeholder="Ex: Maria Silva"
          required
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder="Ex: maria@empresa.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="mensagem">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          className="form-input"
          rows={5}
          placeholder="Conte sobre seu projeto ou tire suas dúvidas..."
          required
          style={{ resize: 'vertical', minHeight: '120px' }}
        />
      </div>

      <button
        type="submit"
        className="form-submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <i className="bi bi-hourglass-split"></i> Enviando...
          </>
        ) : (
          <>
            <i className="bi bi-send-fill"></i> Enviar mensagem
          </>
        )}
      </button>
    </form>
  )
}
