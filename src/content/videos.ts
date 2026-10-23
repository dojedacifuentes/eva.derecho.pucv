/**
 * Videos que pueden vivir en YouTube (canal de EVA, «no listado»). Mientras el id sea null, el sitio usa la copia
 * local de public/video/. Para pasar uno a YouTube: subirlo con sus subtítulos (.vtt), copiar el id del enlace
 * (youtube.com/watch?v=<ID>) aquí y volver a publicar. El reproductor de YouTube se carga sólo al pulsar ▶
 * (desde youtube-nocookie.com), así que no pesa ni deja cookies al abrir la página.
 */
export interface VideoEva {
  youtube: string | null;
  local: string;
  subtitulos: string;
  portada: string;
  titulo: string;
}

export const BIENVENIDA: VideoEva = {
  youtube: null,
  local: '/video/eva-bienvenida.mp4',
  subtitulos: '/video/eva-bienvenida.vtt',
  portada: '/video/eva-bienvenida.webp',
  titulo: 'EVA presenta la plataforma en 30 segundos',
};

/** Sólo ids con la forma de YouTube (11 caracteres): nunca una URL armada desde otro texto. */
export const idYoutubeValido = (id: string | null): id is string => !!id && /^[A-Za-z0-9_-]{11}$/.test(id);
