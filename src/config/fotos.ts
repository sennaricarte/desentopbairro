import type { ImageMetadata } from 'astro';
import cabo from '../assets/fotos/maquina-de-cabo-calcada.jpg';
import ralo from '../assets/fotos/ralo-maquina-de-cabo.jpg';
import escavacao from '../assets/fotos/escavacao-acesso-tubulacao.jpg';
import parede from '../assets/fotos/reparo-abertura-parede.jpg';

export interface Foto { src: ImageMetadata; alt: string; caption: string }

// Fotos reais do atendimento. Alt descreve a cena (sem alegar local ou marca).
export const FOTOS = {
  cabo: {
    src: cabo,
    alt: 'Profissional operando máquina de cabo para desentupir a tubulação, na calçada de uma rua',
    caption: 'Desobstrução de tubulação com máquina de cabo. Atendimento por empresa parceira.',
  },
  ralo: {
    src: ralo,
    alt: 'Profissional de uniforme azul introduzindo o cabo da máquina desentupidora em um ralo interno',
    caption: 'Máquina de cabo em ralo interno. Atendimento por empresa parceira.',
  },
  escavacao: {
    src: escavacao,
    alt: 'Profissional ao lado de uma vala aberta no piso para acessar a tubulação de esgoto',
    caption: 'Abertura de acesso à tubulação quando a obstrução está enterrada. Atendimento por empresa parceira.',
  },
  parede: {
    src: parede,
    alt: 'Profissional abrindo um trecho da parede para alcançar uma tubulação embutida',
    caption: 'Abertura pontual de parede para reparo hidráulico. Atendimento por empresa parceira.',
  },
} satisfies Record<string, Foto>;

export type FotoKey = keyof typeof FOTOS;
