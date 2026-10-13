// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// En Vercel, VERCEL_PROJECT_PRODUCTION_URL trae el dominio de producción
// (el .vercel.app o el dominio propio). Se usa para las URLs absolutas de
// canonical y og:image, que WhatsApp y las redes necesitan para la vista previa.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// https://astro.build/config
export default defineConfig({
  site: productionHost ? `https://${productionHost}` : 'http://localhost:4321',
  vite: {
    plugins: [tailwindcss()]
  }
});
