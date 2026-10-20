# Desentop Bairro — desentopbairro.com.br

Site em **Astro 7** (estático), reconstruído a partir do backup WordPress/Elementor de 21/09/2026.

## Comandos

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # gera dist/
node scripts/validate.mjs   # QA pós-build (title, description, H1, canonical, JSON-LD, links, termos proibidos, telefone único)
```

## Estrutura

- `src/config/site.ts`: NAP (nome e telefone) em um único lugar.
- `src/content/paginas/*.md`: todas as páginas (schema Zod em `src/content.config.ts`).
- `src/pages/[slug].astro`: template único; `index.astro` é a home.
- `vercel.json`: redirects 301 das URLs antigas, headers de segurança e cache.
- URLs antigas dos serviços foram **mantidas** (sem perda de autoridade).

## Redirects 301 (vercel.json)

| Antiga | Nova |
| --- | --- |
| /desentupidora-em-sao-paulo-sp/ | / |
| /regioes-atendidas/, /cidades-atendidas/ (duplicadas) | /areas-atendidas/ |
| 2 posts de Registro (duplicados) | /desentupidora-registro-sp/ |
| /privacy-policy/ | /politica-de-privacidade/ |
| /sitemap_index.xml, /wp-sitemap.xml etc. | /sitemap-index.xml |

Configure o redirecionamento **www → apex** em *Vercel > Domains* (o status é definido ali, não no vercel.json).

## Pendências antes de escalar (CONFIRMAR com o dono)

1. **Horário:** o texto "24 horas, todos os dias" veio do site antigo; o schema declara 00:00–23:59.
2. **Cobertura:** "Grande SP, interior e litoral" e a lista de cidades do Vale do Ribeira vieram do site antigo.
3. **Telefone único:** (15) 99778-2797. O site antigo tinha também (11) 96196-3382 e (13) 99777-8162, removidos.
4. **Endereço:** modelo SAB, sem `address` no schema. Se houver endereço real, adicione e cadastre o Perfil da Empresa no Google.
5. **Licenças:** limpa fossa, lamas, poço e resíduos exigem destinação autorizada (órgão ambiental). Confirme as licenças antes de reforçar essas páginas.
6. **Fotos próprias:** o site antigo usava imagens de banco/terceiros e um selo falso "Google 5 estrelas". Nada disso foi reaproveitado. Só a logo foi mantida. Adicione fotos reais de equipe e equipamentos.
7. **Razão social/CNPJ** na política de privacidade e rodapé.
8. **Search Console e GA4:** verificar o domínio e enviar `/sitemap-index.xml`.

## O que foi removido do site antigo (e por quê)

- Marcas de outra empresa copiadas nos textos ("Desentupimax", "Urgência", "Desentupima").
- Alegações sem prova: "número 1 no Google", "mais bem avaliada", "milhares de clientes", "chegamos em 30 minutos", "não cobramos visita", 15/20/30 anos de experiência (três versões diferentes), "única sem reclamações".
- Placeholders do template Envato ("Time has changed", "Create your own").
- Duplicidade: duas páginas idênticas de regiões/cidades; dois posts de Registro; página de Itararé com ~99 linhas repetidas e keyword stuffing.
