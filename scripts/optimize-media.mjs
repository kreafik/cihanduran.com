// Portfolyo/ arşivini web için küçültür → media/ (git dışında; R2'ye yüklenecek) + media/manifest.json
// Kullanım: node scripts/optimize-media.mjs [--only <proje-slug>]
//   Fotoğraf: 640px ve 1600px WebP (uzun kenar), EXIF yönü uygulanır, meta veri atılır.
//   Video: kısa kenar 720px, H.264 CRF 31 (slow), AAC 64k, faststart; kapak → 1280px WebP.
// Var olan çıktılar atlanır (yeniden çalıştırmak güvenli ve hızlı).
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const run = promisify(execFile);
const SRC = 'Portfolyo';
const OUT = 'media';
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;

const tr = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u' };
export const slugify = (s) =>
  s.replace(/^\d+\s+/, '').replace(/[çğıöşüÇĞİÖŞÜ]/g, (c) => tr[c]).toLowerCase()
    .replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const dirs = (p) => readdirSync(p).filter((f) => !f.startsWith('_') && statSync(join(p, f)).isDirectory());

async function pool(items, n, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (queue.length) await fn(queue.shift()); }));
}

async function photo(src, outBase) {
  const sizes = [[640, 68], [1600, 70]];
  let meta;
  for (const [w, q] of sizes) {
    const out = `${outBase}-${w}.webp`;
    if (!existsSync(out)) await sharp(src).rotate().resize({ width: w, height: w, fit: 'inside', withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(out);
  }
  meta = await sharp(`${outBase}-1600.webp`).metadata();
  return { w: meta.width, h: meta.height };
}

async function probe(file) {
  const { stdout } = await run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', file]);
  const j = JSON.parse(stdout);
  return { w: j.streams[0].width, h: j.streams[0].height, duration: Math.round(Number(j.format.duration)) };
}

async function video(src, out) {
  if (!existsSync(out)) {
    await run('ffmpeg', [
      '-v', 'error', '-y', '-i', src,
      '-vf', "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '31', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out,
    ], { maxBuffer: 1 << 24 });
  }
  return probe(out);
}

const manifest = [];
const photoJobs = [];
const videoJobs = [];

for (const cat of dirs(SRC)) {
  const categorySlug = slugify(cat);
  for (const proj of dirs(join(SRC, cat))) {
    const slug = slugify(proj);
    if (only && slug !== only) continue;
    const inDir = join(SRC, cat, proj);
    const outDir = join(OUT, categorySlug, slug);
    mkdirSync(outDir, { recursive: true });
    const files = readdirSync(inDir).sort();
    const entry = { category: cat.replace(/^\d+\s+/, ''), categorySlug, project: proj, slug, photos: [], videos: [] };
    manifest.push(entry);
    for (const f of files) {
      const ext = extname(f).toLowerCase();
      const base = basename(f, ext);
      if (ext === '.jpg' && !base.endsWith('-kapak')) {
        photoJobs.push(async () => { entry.photos.push({ name: base, ...(await photo(join(inDir, f), join(outDir, base))) }); });
      } else if (ext === '.mp4') {
        const poster = files.find((x) => x === `${base}-kapak.jpg`);
        videoJobs.push(async () => {
          const info = await video(join(inDir, f), join(outDir, `${base}.mp4`));
          if (poster && !existsSync(join(outDir, `${base}-poster.webp`))) {
            await sharp(join(inDir, poster)).rotate().resize({ width: 1280, height: 1280, fit: 'inside' }).webp({ quality: 70 }).toFile(join(outDir, `${base}-poster.webp`));
          }
          entry.videos.push({ name: base, poster: poster ? `${base}-poster` : null, ...info });
          console.log(`video ✓ ${slug}/${base} (${info.duration} sn)`);
        });
      }
    }
  }
}

console.log(`${manifest.length} proje, ${photoJobs.length} fotoğraf, ${videoJobs.length} video`);
let done = 0;
await pool(photoJobs, 6, async (job) => { await job(); if (++done % 200 === 0) console.log(`foto ${done}/${photoJobs.length}`); });
console.log(`foto tamam: ${done}`);
await pool(videoJobs, 2, (job) => job());
for (const e of manifest) {
  e.photos.sort((a, b) => a.name.localeCompare(b.name));
  e.videos.sort((a, b) => a.name.localeCompare(b.name));
}
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
// Site build'i medyaya değil yalnız bu listeye bakar; repoda durur.
if (!only) writeFileSync('src/data/media-manifest.json', JSON.stringify(manifest));
console.log('manifest yazıldı');
