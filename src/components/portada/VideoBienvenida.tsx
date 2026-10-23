'use client';

import { useState } from 'react';
import { idYoutubeValido, type VideoEva } from '@/content/videos';

/**
 * Video con «fachada»: hasta que alguien pulsa ▶ sólo se muestra la imagen fija, sin descargar el video ni cargar
 * YouTube. Al pulsar: el reproductor de YouTube (sin cookies, con subtítulos) si el video tiene id; si no, el video
 * local con sus subtítulos.
 */
export function VideoBienvenida({ video }: { video: VideoEva }) {
  const [activo, setActivo] = useState(false);
  const enYoutube = idYoutubeValido(video.youtube);

  if (!activo) {
    return (
      <button type="button" className="fachada-video" onClick={() => setActivo(true)} style={{ backgroundImage: `url(${video.portada})` }}>
        <span className="fachada-video__boton" aria-hidden="true">
          ▶
        </span>
        <span className="sr-only">Reproducir: {video.titulo}</span>
      </button>
    );
  }

  if (enYoutube) {
    return (
      <iframe
        className="fachada-video__marco"
        src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&cc_load_policy=1&cc_lang_pref=es&hl=es&rel=0&modestbranding=1`}
        title={video.titulo}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <video controls autoPlay playsInline poster={video.portada}>
      <source src={video.local} type="video/mp4" />
      <track kind="captions" src={video.subtitulos} srcLang="es" label="Español" default />
    </video>
  );
}
