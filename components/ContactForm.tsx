'use client'

const WHATSAPP_NUMBER = '5535910010967'

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    const nome = data.get('nome') as string
    const email = data.get('email') as string
    const mensagem = data.get('mensagem') as string

    const text = [
      `Olá! Vim pelo site da Intech Jr.`,
      ``,
      `*Nome:* ${nome}`,
      `*E-mail:* ${email}`,
      ``,
      `*Mensagem:*`,
      mensagem,
    ].join('\n')

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )

    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Formulário de contato">
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

      <button type="submit" className="form-submit">
        <i className="bi bi-whatsapp"></i> Enviar pelo WhatsApp
      </button>
    </form>
  )
}
