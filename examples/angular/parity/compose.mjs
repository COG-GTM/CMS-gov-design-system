// Composes baseline (left) vs upgraded (right) screenshots and reports the pixel-diff %.
// Usage: node parity/compose.mjs   (after running the suite against both projects)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = path.dirname(fileURLToPath(import.meta.url));
const screens = path.join(dir, 'report', 'screens');
const out = path.join(dir, 'report', 'side-by-side');
fs.mkdirSync(out, { recursive: true });

async function load(file, width, height) {
  return sharp(file)
    .extend({
      right: width - (await sharp(file).metadata()).width,
      bottom: height - (await sharp(file).metadata()).height,
      background: '#ff00ff',
    })
    .ensureAlpha()
    .raw()
    .toBuffer();
}

const rows = [];
for (const name of fs
  .readdirSync(path.join(screens, 'baseline'))
  .filter((f) => f.endsWith('.png'))) {
  const a = path.join(screens, 'baseline', name);
  const b = path.join(screens, 'upgraded', name);
  if (!fs.existsSync(b)) {
    rows.push({ name, diff: 'missing' });
    continue;
  }
  const [ma, mb] = await Promise.all([sharp(a).metadata(), sharp(b).metadata()]);
  const width = Math.max(ma.width, mb.width);
  const height = Math.max(ma.height, mb.height);
  const [ra, rb] = await Promise.all([load(a, width, height), load(b, width, height)]);
  let changed = 0;
  for (let i = 0; i < ra.length; i += 4) {
    if (
      Math.abs(ra[i] - rb[i]) + Math.abs(ra[i + 1] - rb[i + 1]) + Math.abs(ra[i + 2] - rb[i + 2]) >
      30
    )
      changed++;
  }
  const diff = ((changed / (width * height)) * 100).toFixed(3);
  const gap = 24;
  await sharp({ create: { width: width * 2 + gap, height, channels: 4, background: '#ffffff' } })
    .composite([
      { input: a, left: 0, top: 0 },
      { input: b, left: width + gap, top: 0 },
    ])
    .png()
    .toFile(path.join(out, name));
  rows.push({
    name,
    size: `${ma.width}x${ma.height} / ${mb.width}x${mb.height}`,
    diff: `${diff}%`,
  });
}
fs.writeFileSync(path.join(dir, 'report', 'diff.json'), JSON.stringify(rows, null, 2));
console.log('| Screenshot | baseline / upgraded size | Pixel diff |\n| --- | --- | --- |');
for (const r of rows) console.log(`| ${r.name} | ${r.size ?? '-'} | ${r.diff} |`);
