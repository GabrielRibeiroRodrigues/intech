# Deploy em VPS com Docker + Nginx

Este projeto foi preparado para rodar em produção com:
- app Next.js containerizada
- Nginx como proxy reverso
- orquestração com Docker Compose

## 1) Requisitos na VPS

- Docker Engine instalado
- Docker Compose (plugin `docker compose`) instalado
- Porta de entrada liberada no firewall (`8080` por padrao, ou `80` se configurar)

## 2) Subir o projeto

No servidor, dentro da pasta do projeto:

```bash
docker compose up -d --build
```

Por padrao, o Nginx publica na porta `8080` do host para evitar conflito com servicos ja rodando na `80`.
Se quiser usar `80`, execute:

```bash
NGINX_PORT=80 docker compose up -d --build
```

Verificar status:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f app
docker compose logs -f nginx
```

## 3) Atualizar versão em produção

Após `git pull` no servidor:

```bash
docker compose up -d --build
```

## 4) Parar serviços

```bash
docker compose down
```

## 5) HTTPS (recomendado)

A configuração atual expõe apenas HTTP (`80`).
Para usar HTTPS em produção, você pode:
- colocar um proxy externo (Cloudflare, Traefik, etc.), ou
- adicionar Certbot/Nginx com certificados na própria VPS.

## Estrutura criada

- `Dockerfile`: build multi-stage da aplicação Next.js
- `docker-compose.yml`: serviços `app` e `nginx`
- `infra/nginx/default.conf`: proxy reverso para o container da app
- `.dockerignore`: reduz contexto de build

## Observações

- O Next.js foi configurado com `output: 'standalone'` em `next.config.ts` para imagem menor e startup mais simples.
- A app roda internamente na porta `3000` e o Nginx publica na porta `8080` por padrao.
