'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * El montaje de la portada («el Derecho se está transformando»: EVA en la Casa Central) en dos capas: el fondo,
 * desenfocado como vidrio, y la ventana, nítida. En silencio y en bucle; «Escuchar a EVA» lo reproduce desde el
 * inicio con su voz y subtítulos, y al terminar vuelve al bucle mudo. Un botón pausa ambas capas (WCAG 2.2.2).
 * Con «reducir movimiento» o «ahorro de datos» se ve el cuadro fijo y no se descarga nada hasta pulsar ▶.
 * Se genera con `node scripts/montaje-portada.mjs`.
 */
export function EscenasFacultad() {
  const fondo = useRef<HTMLVideoElement>(null);
  const ventana = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(true); // hasta que arranque (evento «play»)
  const [conVoz, setConVoz] = useState(false);

  // Los videos no traen autoPlay ni se descargan con el HTML: primero se ve el cuadro fijo y, ya cargada la página,
  // arrancan sólo si la persona no pidió reducir movimiento ni ahorrar datos. Así no compiten con lo demás.
  const permitido = useRef(false);
  useEffect(() => {
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    permitido.current = !ahorro && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!permitido.current) return;
    for (const v of [fondo.current, ventana.current]) void v?.play().catch(() => undefined);
  }, []);

  // Al cambiar de versión (muda ↔ con voz), el <video> se vuelve a montar (key) y parte desde el principio.
  const montado = useRef(false);
  useEffect(() => {
    if (!montado.current) {
      montado.current = true;
      return;
    }
    const v = ventana.current;
    if (!v) return;
    if (conVoz) {
      void v.play().catch(() => setPausado(true));
      if (fondo.current) fondo.current.currentTime = 0;
      void fondo.current?.play().catch(() => undefined);
    } else if (permitido.current) {
      void v.play().catch(() => undefined); // terminada la voz, vuelve al bucle mudo
    }
  }, [conVoz]);

  const alternar = () => {
    const videos = [fondo.current, ventana.current].filter(Boolean) as HTMLVideoElement[];
    if (pausado) {
      videos.forEach((v) => void v.play());
      setPausado(false);
    } else {
      videos.forEach((v) => v.pause());
      setPausado(true);
    }
  };

  return (
    <>
      <div className="apertura__fondo" aria-hidden="true">
        <video ref={fondo} muted loop playsInline preload="none" poster="/video/portada-escenas.webp" tabIndex={-1}>
          <source src="/video/portada-escenas-fondo.mp4" type="video/mp4" />
        </video>
      </div>
      <figure className="ventana" data-voz={conVoz ? 'si' : undefined}>
        <video
          key={conVoz ? 'voz' : 'muda'}
          ref={ventana}
          muted={!conVoz}
          preload="none"
          loop={!conVoz}
          playsInline
          poster="/video/portada-escenas.webp"
          onEnded={() => setConVoz(false)}
          onPlay={() => setPausado(false)}
          onPause={() => setPausado(true)}
          aria-label="EVA recorre la Casa Central: la fachada de noche, la biblioteca donde saca el Código Civil, el libro que se vuelve una red de luz, el patio, la galería y la escalera."
        >
          <source src={conVoz ? '/video/portada-escenas-voz.mp4' : '/video/portada-escenas.mp4'} type="video/mp4" />
          {conVoz && <track kind="captions" src="/video/portada-escenas.vtt" srcLang="es" label="Español" default />}
        </video>
        <figcaption className="ventana__pie mono">
          <button type="button" className="ventana__escuchar" onClick={() => setConVoz((v) => !v)} aria-pressed={conVoz}>
            {conVoz ? '■ Silenciar' : '▶ Escuchar a EVA'}
          </button>
          <button type="button" className="ventana__pausa" onClick={alternar} aria-pressed={pausado}>
            {pausado ? '▶' : '❚❚'}
            <span className="sr-only">{pausado ? 'Reproducir video' : 'Pausar video'}</span>
          </button>
        </figcaption>
      </figure>
    </>
  );
}
