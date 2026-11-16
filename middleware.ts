// Routing Middleware (Vercel): responde 410 Gone para URLs de spam herdadas do WordPress antigo.
// Padrões: /<letra><14 dígitos>/ (com ou sem barra final e sufixo /m) e /shop/pg/*.
// O matcher é restrito: nenhuma página real do site passa por aqui.
export const config = {
  matcher: [
    '/:slug([a-z][0-9]{14})',
    '/:slug([a-z][0-9]{14})/',
    '/:slug([a-z][0-9]{14})/m',
    '/shop/pg/:path*',
  ],
};

export default function middleware(): Response {
  return new Response('410 Gone', {
    status: 410,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
}
