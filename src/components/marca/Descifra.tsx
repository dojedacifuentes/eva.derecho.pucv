'use client';

import { useEffect, useState } from 'react';

const SIGNOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§¶#/\\<>[]{}=+*';

/**
 * Texto que se «descifra»: parte de signos al azar y cada letra se fija de izquierda a derecha. Se repite cada
 * `cadaMs` (sincronizado con el bucle de la marca). El texto real está siempre disponible para lectores de pantalla.
 */
export function Descifra({
  texto,
  inicioMs,
  cadaMs,
  repetirDesdeMs,
  duracionMs = 900,
  pausado = false,
  className,
}: {
  texto: string;
  inicioMs: number;
  cadaMs?: number;
  /** Cuándo empieza a repetirse (por defecto, un ciclo después de la entrada). */
  repetirDesdeMs?: number;
  duracionMs?: number;
  pausado?: boolean;
  className?: string;
}) {
  const [visible, setVisible] = useState(texto);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cuadro = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const correr = () => {
      const t0 = performance.now();
      const paso = (ahora: number) => {
        const k = Math.min(1, (ahora - t0) / duracionMs);
        const fijas = Math.floor(k * texto.length);
        setVisible(
          texto
            .split('')
            .map((c, i) => (i < fijas || c === ' ' ? c : SIGNOS[Math.floor(Math.random() * SIGNOS.length)]))
            .join(''),
        );
        if (k < 1) cuadro = requestAnimationFrame(paso);
      };
      cuadro = requestAnimationFrame(paso);
    };
    timers.push(setTimeout(correr, inicioMs));
    let intervalo: ReturnType<typeof setInterval> | undefined;
    if (cadaMs) {
      timers.push(
        setTimeout(() => {
          correr();
          intervalo = setInterval(correr, cadaMs);
        }, repetirDesdeMs ?? inicioMs + cadaMs),
      );
    }
    return () => {
      timers.forEach(clearTimeout);
      if (intervalo) clearInterval(intervalo);
      cancelAnimationFrame(cuadro);
    };
  }, [texto, inicioMs, cadaMs, repetirDesdeMs, duracionMs, pausado]);

  return (
    <span className={className} aria-label={texto}>
      <span aria-hidden="true">{pausado ? texto : visible}</span>
    </span>
  );
}
