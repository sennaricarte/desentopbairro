// Fonte única de verdade do NAP (nome, telefone) e dados do negócio.
// Itens marcados [CONFIRMAR] no README precisam de validação do dono antes de escalar o conteúdo.
export const SITE = {
  name: 'Desentop Bairro',
  tagline: 'Desentupidora 24 horas',
  url: 'https://desentopbairro.com.br',
  locale: 'pt-BR',
  phoneDisplay: '(15) 99778-2797',
  phoneE164: '+5515997782797',
  whatsapp: '5515997782797',
  whatsappMessage: 'Olá! Preciso de um desentupimento. Podem me atender?',
  // Modelo SAB (Service Area Business): sem endereço no schema.
  areaServedText: 'Grande São Paulo, interior e litoral de SP',
  openingHoursText: 'Atendimento 24 horas, todos os dias',
  email: '',
} as const;

export const waLink = (msg: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = `tel:${SITE.phoneE164}`;
