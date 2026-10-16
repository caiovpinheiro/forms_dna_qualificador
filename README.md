# DNAWork — Avaliação Comportamental

Formulário de avaliação de perfil profissional e comportamental para candidatos da DNAWork.

As respostas são enviadas para o webhook n8n configurado em `src/services/assessmentService.ts`.

## Rodar localmente

1. `npm install`
2. `npm run dev`

## Deploy

Push na `main` dispara o workflow **Build & Deploy**:

1. Build da imagem e push para `ghcr.io/caiovpinheiro/forms_dna_qualificador` (`latest` e o SHA do commit).
2. POST no secret `WEBHOOK_DEPLOY_FORMS` para o EasyPanel publicar a imagem.
