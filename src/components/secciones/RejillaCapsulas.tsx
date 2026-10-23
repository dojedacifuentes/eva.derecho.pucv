import Link from 'next/link';
import { CURSOS } from '@/content/catalogo';

/*
 * Videocápsulas (maqueta, 23-10-2026), en formato índice: una línea por curso con una casilla por módulo. Todavía no se
 * enlaza ninguna; cuando una esté en el canal de EVA, su casilla pasa a ser un enlace.
 */
export function RejillaCapsulas() {
  return (
    <ol className="capsulas">
      {CURSOS.map((c) => (
        <li key={c.id} className="capsulas__fila">
          <span className="capsulas__num">{c.numero}</span>
          <Link href={`/cursos/${c.slug}`} className="capsulas__titulo">
            {c.titulo}
          </Link>
          <ol className="capsulas__casillas" aria-label={`Videocápsulas del curso ${c.numero}`}>
            {c.unidades.map((u) => (
              <li key={u.id} className="capsulas__casilla" title={`${c.numero}.${u.numero} ${u.titulo}: en preparación`}>
                {c.numero}.{u.numero}
                <span className="sr-only">, {u.titulo}: en preparación</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
