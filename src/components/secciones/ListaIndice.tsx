import Link from 'next/link';
import type { Entrada } from '@/content/secciones';
import { Punto } from './IndiceSecciones';

/** Lista de una sección en formato índice: título, para qué sirve y su estado, una línea por entrada. */
export function ListaIndice({ entradas }: { entradas: Entrada[] }) {
  return (
    <ul className="lista-indice">
      {entradas.map((e) => (
        <li key={e.href}>
          <Link href={e.href} className="lista-indice__fila">
            <span className="lista-indice__titulo">{e.titulo}</span>
            <span className="lista-indice__texto">{e.texto}</span>
            <span className="lista-indice__estado">
              <Punto lleno={e.disponible} />
              {e.nota ?? (e.disponible ? 'disponible' : 'en preparación')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
