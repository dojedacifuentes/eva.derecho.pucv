'use client';

import { useSyncExternalStore } from 'react';

type Tema = 'oscuro' | 'claro';
const oyentes = new Set<() => void>();

function leer(): Tema {
  return document.documentElement.dataset.tema === 'oscuro' ? 'oscuro' : 'claro';
}

function suscribir(fn: () => void) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

/** Cambia entre el tema claro y el oscuro. Al principio sigue al sistema; lo elegido queda en este navegador. */
export function SelectorTema() {
  const tema = useSyncExternalStore(suscribir, leer, () => 'claro' as Tema);
  const otro: Tema = tema === 'oscuro' ? 'claro' : 'oscuro';

  const cambiar = () => {
    document.documentElement.dataset.tema = otro;
    try {
      localStorage.setItem('eva-tema', otro);
    } catch {
      // Sin almacenamiento (ventana privada): el tema dura hasta recargar.
    }
    oyentes.forEach((fn) => fn());
  };

  return (
    <button type="button" className="icono-boton" onClick={cambiar} aria-label={`Cambiar a tema ${otro}`} title={`Tema ${otro}`}>
      {tema === 'oscuro' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
