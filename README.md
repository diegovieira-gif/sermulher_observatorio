# SERMULHER Observatório

Landing page moderna e responsiva para apresentar o observatório e suas
iniciativas de cuidado coletivo.

## Rodar localmente

```bash
npm run dev
```

Abra o navegador em http://localhost:3000.

## Integração com Directus

Defina as variáveis no arquivo `.env.local`:

```bash
DIRECTUS_API_URL=http://localhost:8055
DIRECTUS_TOKEN=seu_token_aqui
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

- `DIRECTUS_API_URL`: URL base da API do Directus (server-side).
- `DIRECTUS_TOKEN`: token usado pelo servidor Next.js para leitura das coleções `obser_*`.
- `NEXT_PUBLIC_DIRECTUS_URL`: fallback de URL caso `DIRECTUS_API_URL` não esteja definida.

Se o Directus estiver indisponível ou sem dados, o app usa fallback para os dados estáticos de `src/components/observatorio/data.ts`.

## Estrutura principal

- Edite a página em `src/app/page.tsx`.
- Estilos globais estão em `src/app/globals.css`.
- Fontes usadas: Sora (texto) e Fraunces (destaques).
- Integração de dados Directus: `src/lib/observatorio-directus.ts`.

## Build de produção

```bash
npm run build
```
