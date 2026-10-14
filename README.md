# Daniela San Pedro · Arquitecta

Portafolio web de **Daniela San Pedro**, arquitecta egresada de la FAUD (Universidad Nacional de Mar del Plata).

**Sitio publicado:** https://danielasanpedro.vercel.app

La portada es un recorrido por una vivienda diseñada por Daniela: un video que avanza con el scroll, frena en cada render y muestra paneles con su presentación, sus herramientas y sus servicios. Debajo están sus proyectos:

- **Remodelación de cocina:** antes y después con fundido automático.
- **Tesis de grado:** el Centro de Investigación y Educación de Cultivos, en Barrio Los Tilos, contado en cinco pasos.
- **Diseño 4:** galería de renders.
- **Vivienda en Mar del Plata:** planos de arquitectura con visor para ampliarlos.
- **Sobre mí y contacto:** por WhatsApp y por email.

## Tecnologías

- [Astro 7](https://astro.build): sitio estático, sin framework de JavaScript del lado del cliente.
- [Tailwind CSS 4](https://tailwindcss.com), con la tipografía [Manrope](https://fontsource.org/fonts/manrope) y los íconos de [Phosphor](https://phosphoricons.com).
- Video del recorrido generado con Kling 3.0 (vía Higgsfield) a partir de los renders originales, y unido y codificado con ffmpeg.
- Deploy en [Vercel](https://vercel.com), conectado a este repo.

## Cómo correrlo

Requisitos: **Node 22.12 o superior** y **pnpm**.

```sh
pnpm install        # instala las dependencias
pnpm dev            # servidor de desarrollo en http://localhost:4321
pnpm build          # genera el sitio estático en dist/
pnpm preview        # sirve dist/ para revisarlo antes de publicar
```

El servidor de desarrollo también puede quedar en segundo plano:

```sh
pnpm astro dev --background   # lo inicia
pnpm astro dev status         # muestra si está corriendo
pnpm astro dev logs           # muestra la salida
pnpm astro dev stop           # lo detiene
```

> **Si usás NVM for Windows:** NVM elige la versión de Node según la carpeta. Dentro del proyecto puede activar una versión distinta de la que usás en otras carpetas. Si `pnpm` responde `CommandNotFound`, instalalo para esa versión con `npm install -g pnpm` y después corré `nvm reshim`.

## Estructura

```text
public/
├── photos/              # imágenes del sitio en WebP (renders, fotos y planos)
│   ├── extras/          # imágenes extraídas del CV que no estaban en las capturas
│   └── planos/          # planos de la vivienda exportados del PDF
├── video/               # video del recorrido (computadora y celular) y sus posters
├── og.jpg               # imagen que se ve al compartir el link en redes
└── favicon.svg
scripts/
└── image-sizes.mjs      # regenera src/data/image-sizes.json
src/
├── components/          # una sección o pieza de la página por archivo
│   ├── Recorrido.astro  # portada: video con scroll y paneles
│   ├── Remodelacion.astro, Tesis.astro, Diseno4.astro, Planos.astro
│   ├── Gallery.astro, Lightbox.astro   # galerías y visor de imágenes
│   └── Nav.astro, Footer.astro, Tagline.astro, SobreMi.astro, Contacto.astro
├── data/
│   ├── site.ts          # TODOS los textos, datos de contacto e imágenes
│   └── image-sizes.json # ancho y alto de cada imagen (lo genera el script)
├── layouts/Layout.astro # <head>, metadatos, navegación y pie
├── pages/               # index.astro y 404.astro
└── styles/global.css    # paleta, botones y animaciones
```

## Editar contenidos

Casi todo el texto del sitio está en **`src/data/site.ts`**: el email, el WhatsApp, los paneles del recorrido, las descripciones de cada proyecto y el texto alternativo de cada imagen. Para cambiar una frase no hace falta tocar los componentes.

Para **agregar o reemplazar una imagen**:

1. Guardala en `public/photos/` en formato **WebP**.
2. Regenerá el listado de medidas:
   ```sh
   pnpm images:sizes
   ```
3. Usala en `site.ts` con `photo('/photos/nombre.webp', 'descripción de la imagen')`. Si la imagen no existe o falta en el listado, el build falla y avisa cuál es.

## El video del recorrido

El recorrido son **7 tramos de 5 segundos** generados con IA. Cada tramo une un render con el siguiente usando imagen de inicio y de fin, y todos se unen en un solo video de 841 cuadros. Cada render queda en un múltiplo de 120 cuadros, y ahí se detiene la cámara y aparece un panel.

```text
vis_3 → vis_1 → vis_6 → vis_5 → vis_7 → vis_8 → vis_2 → vis_9
```

Los clips originales viven en `video-src/`, que está en el `.gitignore` porque pesan mucho. Para regenerar el video después de reemplazar algún tramo:

```sh
# 1. Unir los tramos sin repetir el cuadro de cada empalme
ffmpeg -i video-src/tramo_1.mp4 -i video-src/tramo_2.mp4 -i video-src/tramo_3.mp4 \
  -i video-src/tramo_4.mp4 -i video-src/tramo_5.mp4 -i video-src/tramo_6.mp4 -i video-src/tramo_7.mp4 \
  -filter_complex "[0:v]setpts=PTS-STARTPTS[v0];[1:v]trim=start_frame=1,setpts=PTS-STARTPTS[v1];[2:v]trim=start_frame=1,setpts=PTS-STARTPTS[v2];[3:v]trim=start_frame=1,setpts=PTS-STARTPTS[v3];[4:v]trim=start_frame=1,setpts=PTS-STARTPTS[v4];[5:v]trim=start_frame=1,setpts=PTS-STARTPTS[v5];[6:v]trim=start_frame=1,setpts=PTS-STARTPTS[v6];[v0][v1][v2][v3][v4][v5][v6]concat=n=7:v=1:a=0,format=yuv420p[out]" \
  -map "[out]" -c:v libx264 -crf 12 -preset slow -r 24 video-src/recorrido_master.mp4

# 2. Versión para computadora: un cuadro clave cada 8 para que el scroll busque rápido
ffmpeg -i video-src/recorrido_master.mp4 -an -c:v libx264 -preset slow -crf 24 -tune film \
  -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -bf 0 -movflags +faststart public/video/recorrido.mp4

# 3. Versión para celular: recorte 4:3 al centro, más liviana, un cuadro clave cada 4
ffmpeg -i video-src/recorrido_master.mp4 -an -vf "crop=960:720:160:0,scale=720:540:flags=lanczos" \
  -c:v libx264 -preset slow -crf 26 -tune film -pix_fmt yuv420p -g 4 -keyint_min 4 \
  -sc_threshold 0 -bf 0 -movflags +faststart public/video/recorrido-mobile.mp4
```

Si cambia la cantidad de tramos o de cuadros, hay que actualizar `recorrido` en `src/data/site.ts`.

El recorrido tiene en cuenta tres casos especiales:
- **Celular:** carga la versión liviana del video.
- **Movimiento reducido:** si el visitante activó "reducir movimiento" en su sistema, muestra los renders fijos en lugar del video.
- **Falla de carga:** si el video no carga, también muestra los renders fijos.

## Publicar

El repo está conectado a Vercel: **cada push a `main` publica una versión nueva** automáticamente. No hace falta configurar nada, porque Vercel detecta Astro y pnpm solo.

`astro.config.mjs` toma el dominio de producción de la variable `VERCEL_PROJECT_PRODUCTION_URL`, así que las vistas previas en WhatsApp y en redes usan siempre el dominio correcto, aunque se agregue un dominio propio.

## Archivos fuera del repo

| Carpeta | Contenido |
|---|---|
| `video-src/` | Clips originales de cada tramo y el video maestro sin comprimir |
| `recursos/` | El CV original en PDF, de donde salieron las imágenes y los textos |
