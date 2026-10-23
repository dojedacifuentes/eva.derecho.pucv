'use client';

import { useSyncExternalStore } from 'react';

type Tema = 'oscuro' | 'claro';
const oyentes = new Set<() => void>();

function leer(): Tema {
  return document.documentElement.dataset.tema === 'claro' ? 'claro' : 'oscuro';
}

function suscribir(fn: () => void) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

/** Cambia entre el tema oscuro (por defecto) y el claro. La preferencia queda en este navegador. */
export function SelectorTema() {
  const tema = useSyncExternalStore(suscribir, leer, () => 'oscuro' as Tema);
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
    <button type="button" className="tema" onClick={cambiar} aria-label={`Cambiar a tema ${otro}`} title={`Tema ${otro}`}>
      <span aria-hidden="true">{tema === 'oscuro' ? '◐' : '◑'}</span>
    </button>
  );
}
