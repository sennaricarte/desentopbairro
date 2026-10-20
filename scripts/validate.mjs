// QA pós-build: SEO on-page, links internos, JSON-LD e termos proibidos.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
const DIST = 'dist';
const BANNED = [/desentupimax/i, /desentupima\b/i, /mais bem avaliada/i, /mais recomendada/i, /n[úu]mero 1/i, /\[CONFIRMAR\]/i, /Time has changed/i, /Create your own/i, /\b\d{2} anos\b/i, /30 minutos/i, /11\) ?96196/];
const PHONE_OK = /\(15\) 99778-2797|\+5515997782797|5515997782797/;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(DIST).filter((p) => p.endsWith('.html'));
const routes = new Set(pages.map((p) => '/' + p.slice(DIST.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '/')));
let errors = 0; const err = (f, m) => { errors++; console.log(`✗ ${f}: ${m}`); };
const titles = new Map(), descs = new Map();
for (const f of pages) {
  const h = readFileSync(f, 'utf8'); const is404 = f.endsWith('404.html');
  const t = h.match(/<title>(.*?)<\/title>/s)?.[1]; const d = h.match(/<meta name="description" content="(.*?)"/)?.[1];
  if (!t) err(f, 'sem <title>'); else { if (t.length > 62) err(f, `title ${t.length} chars`); if (titles.has(t)) err(f, `title duplicado com ${titles.get(t)}`); titles.set(t, f); }
  if (!d) err(f, 'sem meta description'); else { if (d.length < 80 || d.length > 160) err(f, `description ${d.length} chars`); if (descs.has(d)) err(f, `description duplicada com ${descs.get(d)}`); descs.set(d, f); }
  const h1 = (h.match(/<h1[ >]/g) || []).length; if (h1 !== 1) err(f, `${h1} H1`);
  if (!/<link rel="canonical" href="https:\/\/desentopbairro\.com\.br\/[^"]*\/?"/.test(h)) err(f, 'canonical ausente/errado');
  if (!is404 && !/index, follow/.test(h)) err(f, 'robots não é index,follow');
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(m[1]); } catch { err(f, 'JSON-LD inválido'); } }
  if (!is404 && !/application\/ld\+json/.test(h)) err(f, 'sem JSON-LD');
  for (const b of BANNED) { const text = h.replace(/<script.*?<\/script>/gs, ''); if (b.test(text)) err(f, `termo proibido ${b}`); }
  for (const m of h.matchAll(/href="(\/[^"#?]*)"/g)) { const u = m[1]; if (u.startsWith('/_astro') || /\.(png|xml|txt|ico|webp|jpg)$/.test(u)) continue; if (!routes.has(u)) err(f, `link interno quebrado ${u}`); }
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/ alt="[^"]+"/.test(m[0])) err(f, 'img sem alt');
  if (!is404 && !PHONE_OK.test(h)) err(f, 'telefone oficial ausente');
  const phones = new Set([...h.matchAll(/\(?\b(1[1-9])\)? ?9\d{4}-?\d{4}/g)].map((m) => m[0].replace(/\D/g, '')));
  phones.delete('15997782797'); if (phones.size) err(f, `outros telefones: ${[...phones]}`);
}
const sm = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
for (const u of urls) if (!routes.has(new URL(u).pathname)) err('sitemap', `URL sem página: ${u}`);
if (urls.some((u) => u.includes('404'))) err('sitemap', '404 no sitemap');
console.log(`\n${pages.length} páginas, ${urls.length} URLs no sitemap, ${errors} erro(s).`);
process.exit(errors ? 1 : 0);
