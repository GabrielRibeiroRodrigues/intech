# Design: rota /whatsapp (portal interno de acesso ao WhatsApp Web)

## Contexto

A equipe de vendas da Intech Jr. usa o WhatsApp Web da empresa para atender clientes. Hoje não existe uma forma fácil e protegida de acessar isso a partir do site. O pedido é uma rota `/whatsapp` que sirva como "portal" interno: acesso restrito por senha, com um botão para abrir o WhatsApp Web.

## Restrição técnica confirmada

O WhatsApp Web envia headers (`X-Frame-Options` / `Content-Security-Policy: frame-ancestors`) que impedem ser embutido em `<iframe>`. Por isso a rota não embute o WhatsApp Web dentro do layout do site — ela apenas autentica o usuário e oferece um link que abre `https://web.whatsapp.com` em nova aba.

O WhatsApp Web nativamente suporta múltiplos dispositivos vinculados à mesma conta (até 4 sessões simultâneas). Isso resolve o requisito de "duas pessoas acessando ao mesmo tempo" sem nenhum trabalho extra do nosso lado — cada vendedor só escaneia o QR code (ou já usa uma sessão previamente vinculada) na própria máquina/navegador.

## Requisitos confirmados com o usuário

- Rota: `/whatsapp`.
- Protegida por **senha única compartilhada** entre a equipe de vendas (não é login individual).
- Sessão dura enquanto o navegador estiver aberto (cookie de sessão, sem `max-age` — expira ao fechar o navegador).
- Após autenticar, mostra uma página com a marca da Intech Jr. e um botão **"Abrir WhatsApp Web"** que abre `https://web.whatsapp.com` em nova aba.
- Não precisa suportar múltiplos números de WhatsApp nem múltiplas contas — é sempre o WhatsApp Web da empresa.

## Arquitetura

### Fluxo

1. Usuário acessa `/whatsapp`.
2. `middleware.ts` intercepta a rota (matcher restrito a `/whatsapp`), lê o cookie `whatsapp_session` e valida sua assinatura.
3. **Sem cookie válido:** a página `/whatsapp` renderiza o formulário de senha.
4. O formulário envia `POST /api/whatsapp-auth` com a senha digitada.
5. A API compara a senha recebida com `WHATSAPP_PORTAL_PASSWORD` (env var). Se bater, gera um cookie assinado (`HMAC-SHA256` usando `WHATSAPP_PORTAL_SECRET`), `httpOnly`, `sameSite=lax`, `secure` em produção, **sem `max-age`**.
6. **Com cookie válido:** `/whatsapp` renderiza a página "logada", com o botão "Abrir WhatsApp Web" (`target="_blank"`, `href="https://web.whatsapp.com"`).

### Componentes novos

| Arquivo | Papel |
|---|---|
| `middleware.ts` (raiz) | Intercepta `/whatsapp`; valida cookie de sessão; deixa passar ou força exibição do form de senha. `matcher: ['/whatsapp']`. |
| `app/whatsapp/page.tsx` | Server component. Lê o cookie via `cookies()` e decide entre `WhatsappLoginForm` e a tela com o botão de lançamento. |
| `app/api/whatsapp-auth/route.ts` | `POST` — valida a senha, seta o cookie assinado. Primeira API route do projeto (hoje o projeto não tem nenhuma). |
| `components/WhatsappLoginForm.tsx` | Client component. Form de senha; mostra mensagem de erro genérica se a senha estiver incorreta. |

Nenhum componente existente (`ContactForm.tsx`, `Navbar.tsx`, `page.tsx` público, etc.) é alterado — o portal é uma área isolada do site público.

### Cookie e assinatura

- Nome: `whatsapp_session`.
- Valor: token assinado (HMAC-SHA256, `WHATSAPP_PORTAL_SECRET`) — não é apenas um valor fixo, para dificultar forjar o cookie manualmente.
- Flags: `httpOnly`, `sameSite=lax`, `secure` (produção), sem `Max-Age`/`Expires` (cookie de sessão de navegador).
- O middleware, em cada request para `/whatsapp`, valida a assinatura do cookie — não confia em apenas a presença do cookie.

### Variáveis de ambiente novas

Adicionar a `.env.local.example` e `.env.production.example`:

```
WHATSAPP_PORTAL_PASSWORD=defina_uma_senha_forte
WHATSAPP_PORTAL_SECRET=uma_string_aleatoria_longa_para_assinar_o_cookie
```

## Tratamento de erros

- Senha incorreta → mensagem de erro genérica no formulário ("Senha incorreta"), sem detalhes que ajudem enumeração.
- Sem rate-limiting nesta v1: o risco é baixo (portal interno, senha não é exposta em nenhum lugar público do site, não há usuário/e-mail associado para enumerar). Pode ser adicionado depois se necessário (ex: limite de tentativas por IP).
- Se `WHATSAPP_PORTAL_PASSWORD` ou `WHATSAPP_PORTAL_SECRET` não estiverem definidas em produção, a rota deve falhar de forma segura (negar acesso), não abrir a porta por omissão.

## Fora de escopo (YAGNI)

- Login individual por vendedor.
- Múltiplos números/contas de WhatsApp.
- Rate-limiting / bloqueio por tentativas.
- Qualquer tentativa de embutir o WhatsApp Web via iframe/proxy (bloqueado pelo próprio WhatsApp; contornar isso via proxy violaria os termos de uso e seria frágil).
