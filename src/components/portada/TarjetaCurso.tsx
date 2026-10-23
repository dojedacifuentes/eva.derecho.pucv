'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ESCENAS, type Escena } from './escenas';

interface Props {
  href: string;
  numero: number;
  titulo: string;
  titular: string;
  bajada: string;
  escena: Escena;
  disponibles: number;
  total: number;
}

/**
 * Tarjeta de curso viva: un lienzo con la metáfora del curso, inclinación 3D y un foco que siguen al puntero.
 * Se detiene fuera de pantalla; con «reducir movimiento» queda en un fotograma quieto.
 */
export function TarjetaCurso({ href, numero, titulo, titular, bajada, escena, disponibles, total }: Props) {
  const tarjeta = useRef<HTMLAnchorElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const puntero = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = lienzo.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = false;
    let cuadro = 0;
    let energia = 0;
    const inicio = performance.now();

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(el.clientWidth * dpr);
      el.height = Math.round(el.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const dibujar = (ahora: number) => {
      const objetivo = puntero.current ? 1 : 0;
      energia += (objetivo - energia) * 0.06;
      ctx.clearRect(0, 0, el.clientWidth, el.clientHeight);
      ctx.globalCompositeOperation = 'lighter';
      ESCENAS[escena](ctx, {
        t: reducido ? 2.2 : (ahora - inicio) / 1000,
        w: el.clientWidth,
        h: el.clientHeight,
        puntero: puntero.current,
        energia,
      });
      ctx.globalCompositeOperation = 'source-over';
      if (!reducido && visible) cuadro = requestAnimationFrame(dibujar);
    };

    medir();
    const tamano = new ResizeObserver(() => {
      medir();
      if (reducido || !visible) dibujar(performance.now());
    });
    tamano.observe(el);
    const vista = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(cuadro);
      if (visible) cuadro = requestAnimationFrame(dibujar);
    });
    vista.observe(el);
    dibujar(performance.now());
    return () => {
      cancelAnimationFrame(cuadro);
      tamano.disconnect();
      vista.disconnect();
    };
  }, [escena]);

  const mover = (e: React.PointerEvent) => {
    const r = tarjeta.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    puntero.current = { x, y };
    tarjeta.current!.style.setProperty('--mx', `${x * 100}%`);
    tarjeta.current!.style.setProperty('--my', `${y * 100}%`);
    tarjeta.current!.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
    tarjeta.current!.style.setProperty('--ry', `${(x - 0.5) * 9}deg`);
  };
  const salir = () => {
    puntero.current = null;
    tarjeta.current!.style.setProperty('--rx', '0deg');
    tarjeta.current!.style.setProperty('--ry', '0deg');
  };

  return (
    <Link ref={tarjeta} href={href} className="tarjeta-curso" onPointerMove={mover} onPointerLeave={salir} data-escena={escena}>
      <canvas ref={lienzo} className="tarjeta-curso__lienzo" aria-hidden="true" />
      <span className="tarjeta-curso__foco" aria-hidden="true" />
      <span className="tarjeta-curso__cabeza mono">
        <span>Curso {numero}</span>
        <span>
          {disponibles}/{total} unidades
        </span>
      </span>
      <span className="tarjeta-curso__titular">{titular}</span>
      <span className="tarjeta-curso__bajada">{bajada}</span>
      <span className="tarjeta-curso__pie">
        <span className="tarjeta-curso__nombre">{titulo}</span>
        <span className="tarjeta-curso__ir" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}
