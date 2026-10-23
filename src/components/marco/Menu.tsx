'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/** Menú del teléfono: abre la lista completa, se cierra con Esc o al elegir, y devuelve el foco al botón. */
export function Menu({ enlaces }: { enlaces: { href: string; texto: string }[] }) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const lista = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!abierto) return;
    lista.current?.querySelector('a')?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [abierto]);

  return (
    <div className="menu">
      <button
        ref={boton}
        type="button"
        className="icono-boton menu__boton"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
        onClick={() => setAbierto((a) => !a)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4.5 9h15M4.5 15h15" />}
        </svg>
      </button>
      {abierto && (
        <ul id="menu-movil" ref={lista} className="menu__lista vidrio">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} onClick={() => setAbierto(false)}>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
