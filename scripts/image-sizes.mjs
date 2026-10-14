// Regenera src/data/image-sizes.json con el ancho y alto de cada .webp de public/photos.
// El sitio usa esas medidas para reservar el espacio de cada imagen mientras carga.
// Uso: pnpm images:sizes
import { createRequire } from 'node:module';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// sharp viene como dependencia de Astro; con pnpm hay que resolverlo desde ahí
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('astro'))('sharp');

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

const sizes = {};
for (const file of walk('public/photos').filter((f) => f.endsWith('.webp')).sort()) {
  const { width, height } = await sharp(file).metadata();
  sizes['/' + file.replaceAll('\\', '/').replace(/^public\//, '')] = [width, height];
}

writeFileSync('src/data/image-sizes.json', JSON.stringify(sizes, null, 1) + '\n');
console.log(`${Object.keys(sizes).length} imágenes registradas en src/data/image-sizes.json`);
