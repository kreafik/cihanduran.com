// Yerel medya sunucusu: media/ klasörünü http://127.0.0.1:4400 adresinden sunar (yayında R2'nin yerini tutar).
// Video sarma için HTTP Range destekler. Kullanım: npm run media
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { join, normalize, extname, resolve } from 'node:path';

const ROOT = resolve('media');
const PORT = Number(process.env.MEDIA_PORT ?? 4400);
const TYPES = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.json': 'application/json' };

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://x');
  const file = normalize(join(ROOT, decodeURIComponent(url.pathname)));
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  let stat;
  try { stat = statSync(file); } catch { res.writeHead(404).end(); return; }
  if (!stat.isFile()) { res.writeHead(404).end(); return; }

  const headers = {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=3600',
  };
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '');
  if (range) {
    const start = range[1] ? Number(range[1]) : stat.size - Number(range[2]);
    const end = range[1] && range[2] ? Number(range[2]) : stat.size - 1;
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 });
    createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { ...headers, 'Content-Length': stat.size });
    createReadStream(file).pipe(res);
  }
}).listen(PORT, '127.0.0.1', () => console.log(`medya: http://127.0.0.1:${PORT} → ${ROOT}`));
