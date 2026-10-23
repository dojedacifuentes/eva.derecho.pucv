'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const nunca = () => () => {};
const movimientoReducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * EVA escribe un texto carácter a carácter. El texto completo está siempre en el DOM para lectores de pantalla
 * (aria-label del contenedor); lo visible se teclea. Con «reducir movimiento» aparece de una vez.
 */
export function EvaEscribe({ texto, ms = 14, className = '', alTerminar }: { texto: string; ms?: number; className?: string; alTerminar?: () => void }) {
  const reducido = useSyncExternalStore(nunca, movimientoReducido, () => false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reducido) {
      alTerminar?.();
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const paso = () => {
      i += 1;
      setN(i);
      if (i < texto.length) {
        const c = texto[i - 1];
        t = setTimeout(paso, c === '.' || c === '?' || c === ':' ? ms * 14 : c === ',' ? ms * 5 : ms);
      } else {
        alTerminar?.();
      }
    };
    t = setTimeout(paso, 200);
    return () => clearTimeout(t);
    // alTerminar es estable por diseño de quien lo usa; volver a teclear sólo si cambia el texto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto, reducido, ms]);

  const visible = reducido ? texto : texto.slice(0, n);
  return (
    <p className={className} aria-label={texto}>
      <span aria-hidden="true">
        {visible}
        {!reducido && n < texto.length && <span className="cursor-eva" />}
      </span>
    </p>
  );
}
