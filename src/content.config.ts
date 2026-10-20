import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    title: z.string(),            // H1
    seoTitle: z.string().max(62), // <title>
    description: z.string().min(80).max(160),
    kind: z.enum(['hub', 'servico', 'local', 'institucional']),
    group: z.enum(['desentupimento', 'esgotamento', 'hidraulica', 'local', 'institucional']),
    order: z.number().default(100),
    intro: z.string(),            // lead acima da dobra
    cardText: z.string().optional(),
    related: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    areaServed: z.array(z.string()).default([]),
    noindex: z.boolean().default(false),
    updated: z.coerce.date().default(new Date('2026-10-20')),
  }),
});

export const collections = { paginas };
