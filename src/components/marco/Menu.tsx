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
        className="boton menu__boton"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto((a) => !a)}
      >
        {abierto ? 'Cerrar' : 'Menú'}
      </button>
      {abierto && (
        <ul id="menu-movil" ref={lista} className="menu__lista vidrio">
          {[...enlaces, { href: '/herramientas', texto: 'Herramientas' }, { href: '/acerca', texto: 'Acerca' }].map((e) => (
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
