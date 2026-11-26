// Cloudflare Worker: statik siteyi (dist/) sunar.
// - www / http / büyük harf / sonda "/" / eski adresler → TEK adımda 301 (kararlar src/lib/routing.mjs)
// - Canonical olmayan host'lar (workers.dev, sürüm önizlemeleri) ve noindex sayfalar → X-Robots-Tag
// - Bilinmeyen adres → assets'in 404 sayfası, 404 durum koduyla (not_found_handling: "404-page")
// - Googlebot dahil herkes aynı içeriği alır; kullanıcı ajanına göre dallanma YOK.
import { resolve } from '../src/lib/routing.mjs';

const CSP = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "connect-src 'self' https://api.github.com https://cloudflareinsights.com",
  "media-src 'self' https://media.cihanduran.com",
  'frame-src https://github1s.com https://www.youtube-nocookie.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': CSP,
};

function redirect(location) {
  return new Response(null, {
    status: 301,
    headers: { Location: location, 'Cache-Control': 'public, max-age=3600' },
  });
}

function decorate(response, { indexable, canonicalHost, path }) {
  const res = new Response(response.body, response);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v);
  if (canonicalHost) res.headers.set('Strict-Transport-Security', 'max-age=31536000');
  if (!indexable) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  if (path.startsWith('/_astro/') || path.startsWith('/fonts/')) {
    res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const decision = resolve(url);
    if (decision.action === 'redirect') return redirect(decision.location);

    const canonicalHost = url.host.toLowerCase() === 'cihanduran.com';
    const ctx = { indexable: decision.indexable, canonicalHost, path: decision.path };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return decorate(
        new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } }),
        ctx,
      );
    }

    return decorate(await env.ASSETS.fetch(request), ctx);
  },
};
