import sizes from './image-sizes.json';

export const site = {
  name: 'Daniela San Pedro',
  role: 'Arquitecta',
  city: 'Mar del Plata',
  title: 'Daniela San Pedro · Arquitecta en Mar del Plata',
  description:
    'Portafolio de Daniela San Pedro, arquitecta egresada de la FAUD UNMdP. Proyectos de vivienda, remodelaciones, visualización arquitectónica y documentación técnica en Mar del Plata.',
  email: 'sanpedrodaniela.arq@gmail.com',
  phoneDisplay: '223 549 3697',
  whatsapp: 'https://wa.me/5492235493697?text=Hola%20Daniela%2C%20te%20escribo%20por%20un%20proyecto',
};

export type Photo = { src: string; alt: string; width: number; height: number };

/** Devuelve una foto con sus dimensiones reales para reservar espacio al cargar. */
export function photo(src: string, alt: string): Photo {
  const dims = (sizes as Record<string, [number, number]>)[src];
  if (!dims) throw new Error(`Falta la imagen ${src}`);
  return { src, alt, width: dims[0], height: dims[1] };
}

/* ------------------------------------------------------------------ */
/* Recorrido: 7 tramos de 120 cuadros unidos en un video de 841 cuadros */
/* Cada parada es un render original de la vivienda.                    */
/* ------------------------------------------------------------------ */
export const recorrido = {
  fps: 24,
  framesPerStop: 120,
  stops: [
    '/photos/vis_3.webp',
    '/photos/vis_1.webp',
    '/photos/vis_6.webp',
    '/photos/vis_5.webp',
    '/photos/vis_7.webp',
    '/photos/vis_8.webp',
    '/photos/vis_2.webp',
    '/photos/vis_9.webp',
  ],
  panels: [
    {
      stop: 1,
      eyebrow: 'Visualización arquitectónica',
      title: 'Ves tu casa antes de construirla',
      body: 'Renders realistas para decidir materiales, luz y mobiliario con tranquilidad, antes de mover un ladrillo.',
      tags: ['Lumion', 'Twinmotion', 'Artlantis', 'Photoshop'],
    },
    {
      stop: 2,
      eyebrow: 'Proyecto propio',
      title: 'Doble altura, escalera flotante y el jardín adentro',
      body: 'Esta vivienda es un diseño mío. Superficies claras, madera y ventanales largos para que la luz y el verde lleguen a cada ambiente.',
    },
    {
      stop: 4,
      eyebrow: 'Documentación técnica',
      title: 'Del croquis al plano de obra',
      body: 'Plantas, cortes y fachadas completas, con la información que necesita quien construye.',
      tags: ['AutoCAD', 'ArchiCAD'],
    },
    {
      stop: 6,
      eyebrow: 'Proyectos',
      title: 'Remodelaciones, vivienda y ciudad',
      body: 'Seguí bajando para ver una cocina antes y después, los planos de una vivienda y mi tesis de grado.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Remodelación de cocina                                              */
/* ------------------------------------------------------------------ */
export const remodelacion = {
  pairs: [
    {
      label: 'Hacia la ventana',
      before: photo('/photos/cocina_viejo_1.webp', 'Cocina original con azulejos amarillos, mesada corta y cocina junto a la ventana'),
      after: photo('/photos/cocina_nuevo_3.webp', 'Cocina remodelada con muebles blancos, mesada continua y la misma ventana al fondo'),
    },
    {
      label: 'Pileta y lavarropas',
      before: photo('/photos/cocina_viejo_2.webp', 'Obra en curso: pileta original con revestimiento demolido'),
      after: photo('/photos/cocina_nuevo_2.webp', 'Mesada nueva sobre el lavarropas, con alacenas blancas y azulejos subway'),
    },
  ],
  result: photo('/photos/cocina_nuevo_1.webp', 'Vista general de la cocina remodelada con heladera, lavarropas bajo mesada y alacenas blancas'),
};

/* ------------------------------------------------------------------ */
/* Tesis                                                               */
/* ------------------------------------------------------------------ */
export const tesis = {
  hero: photo('/photos/tesis_4.webp', 'Render del Centro de Investigación y Educación de Cultivos: fachada cubierta de enredaderas y patio con árboles frutales'),
  steps: [
    {
      title: 'Análisis del barrio',
      body: 'El trabajo se ubica en Barrio Los Tilos, Mar del Plata. Empecé relevando el área asignada por la cátedra para detectar sus problemáticas y plantear soluciones.',
      // Fotos del relevamiento: se muestran directo, en círculos, sin visor
      circles: [
        photo('/photos/extras/tesis_sitio_1.webp', 'Calle sin asfaltar con agua estancada al costado'),
        photo('/photos/extras/tesis_sitio_2.webp', 'Terreno baldío atravesado por un camino de tierra'),
        photo('/photos/extras/tesis_sitio_3.webp', 'Basura acumulada en un terreno junto a la calle'),
        photo('/photos/extras/tesis_sitio_4.webp', 'Calle de tierra entre campos sin edificar'),
        photo('/photos/extras/tesis_sitio_5.webp', 'Calle deteriorada con pozos y barro'),
      ],
      images: [],
    },
    {
      title: 'Un master plan con corredor verde',
      body: 'Propuse un corredor verde con bicisenda y actividades públicas. Sobre él, viviendas en altura con comercio en planta baja, que bajan de densidad a medida que se acercan a las casas existentes.',
      images: [
        photo('/photos/tesis_2.webp', 'Montaje aéreo del master plan sobre el barrio'),
        photo('/photos/tesis_3.webp', 'Perspectiva aérea del corredor verde con las nuevas viviendas en altura'),
      ],
    },
    {
      title: 'Centro de Investigación y Educación de Cultivos',
      body: 'De los tres nodos verdes del master plan elegí el segundo: conecta todo el proyecto y tiene muy buen asoleamiento para los cultivos y plantaciones que propongo.',
      images: [
        photo('/photos/tesis_1.webp', 'Vista aérea del centro, con la fachada verde y el parque arbolado'),
        photo('/photos/tesis_5.webp', 'Planta cero con el entorno y el programa'),
        photo('/photos/tesis_6.webp', 'Plantas del primer y segundo piso'),
      ],
    },
    {
      title: 'Envolvente y calidad ambiental',
      body: 'Los árboles de hoja perenne se ubican al sureste para frenar los vientos. Los de hoja caduca protegen las huertas del sol de verano y dejan pasar el de invierno.',
      images: [
        photo('/photos/tesis_7.webp', 'Corte D D con la vegetación y la tabla de especies'),
        photo('/photos/tesis_8.webp', 'Corte de fachada y axonometría de la tecnología de la envolvente'),
      ],
    },
    {
      title: 'Maqueta',
      body: 'La maqueta física del conjunto, de día y con iluminación nocturna.',
      images: [
        photo('/photos/tesis_9.webp', 'Maqueta del centro y su manzana junto al libro de la tesis'),
        photo('/photos/extras/maqueta_noche_1.webp', 'Maqueta iluminada de noche, vista desde arriba'),
        photo('/photos/extras/maqueta_noche_2.webp', 'Maqueta iluminada de noche, vista general'),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Diseño 4                                                            */
/* ------------------------------------------------------------------ */
export const diseno4 = {
  images: [
    photo('/photos/extras/diseno4_extra_1.webp', 'Edificio de terrazas escalonadas hundido en el desnivel del terreno, con jardines, torres de vivienda y el mar al fondo'),
    photo('/photos/diseno4_2.webp', 'Sendero recto hacia el frente vidriado, entre muros de contención de piedra'),
    photo('/photos/extras/diseno4_extra_2.webp', 'Las terrazas al atardecer, con el mar detrás de las torres'),
    photo('/photos/diseno4_1.webp', 'Vista desde la rampa superior hacia las terrazas, el parque y los bancos'),
    photo('/photos/extras/diseno4_extra_3.webp', 'Recorrido por los jardines bajos hacia el edificio'),
    photo('/photos/diseno4_4.webp', 'Rampas y terrazas a contraluz con personas recorriendo el acceso'),
    photo('/photos/extras/diseno4_extra_5.webp', 'Sendero de acceso hacia las terrazas vidriadas'),
    photo('/photos/extras/diseno4_extra_4.webp', 'Vista amplia del parque de césped frente al edificio'),
    photo('/photos/diseno4_3.webp', 'Las terrazas a contraluz desde el parque'),
  ],
};

/* ------------------------------------------------------------------ */
/* Vivienda: planos                                                    */
/* ------------------------------------------------------------------ */
export const planos = {
  images: [
    photo('/photos/planos/fachada.webp', 'Fachada con teja francesa, ladrillo visto y revestimiento de piedra'),
    photo('/photos/planos/planta_baja.webp', 'Planta baja: estar comedor, cocina, dos dormitorios, baño y cochera semicubierta'),
    photo('/photos/planos/planta_alta.webp', 'Planta alta: sala de juegos, dormitorio, baño y terraza accesible'),
    photo('/photos/planos/corte_aa.webp', 'Corte A A'),
    photo('/photos/planos/corte_bb.webp', 'Corte B B con la cubierta a dos aguas'),
    photo('/photos/planos/corte_cc.webp', 'Corte C C'),
    photo('/photos/planos/planta_techos.webp', 'Planta de techos'),
  ],
};

export const sobreMi = {
  portrait: photo('/photos/extras/rostro_alt.webp', 'Retrato de Daniela San Pedro'),
  tools: ['AutoCAD', 'ArchiCAD', 'Lumion', 'Twinmotion', 'Artlantis', 'Photoshop', 'CorelDRAW'],
};
