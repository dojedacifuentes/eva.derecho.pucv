import type { Metadata } from 'next';
import Link from 'next/link';
import { RecorridoFilosofico } from '@/components/cursos/RecorridoFilosofico';
import { CURSOS, rutaUnidad } from '@/content/catalogo';

export const metadata: Metadata = { title: 'Cursos' };

export default function Cursos() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Curso de entrada + cuatro cursos · dieciséis videocápsulas</p>
        <h1 className="titular pagina__titulo">Primero la usas. Después entiendes por qué falló.</h1>
        <p className="entradilla">
          Cada unidad tiene un objetivo que se puede comprobar, una videocápsula de EVA, una tarea jurídica real y una
          evaluación. El Curso 0 es la base: qué es la IA según las leyes. Se recorren en orden; las primeras ya
          están abiertas.
        </p>
      </header>

      <ol className="indice-cursos">
        {CURSOS.map((c) => (
          <li key={c.id} className="indice-cursos__curso">
            <div className="indice-cursos__cabeza">
              <span className="indice-cursos__num mono">0{c.numero}</span>
              <div>
                <h2 className="indice-cursos__titulo">
                  <Link href={`/cursos/${c.slug}`}>{c.titulo}</Link>
                </h2>
                <p className="indice-cursos__pregunta">{c.pregunta}</p>
                {c.numero === 0 && (
                  <p className="indice-cursos__pregunta mono">Curso de entrada · base para los demás</p>
                )}
              </div>
            </div>
            <ol className="unidades">
              {c.unidades.map((u) => (
                <li key={u.id} className="unidad" data-estado={u.estado}>
                  <span className="unidad__num mono">
                    {c.numero}.{u.numero}
                  </span>
                  <span className="unidad__cuerpo">
                    {u.estado === 'disponible' ? (
                      <Link href={rutaUnidad(c, u)} className="unidad__titulo">
                        {u.titulo}
                      </Link>
                    ) : (
                      <span className="unidad__titulo">{u.titulo}</span>
                    )}
                    <span className="unidad__uso">{u.uso}</span>
                  </span>
                  <span className="etiqueta" data-tono={u.estado === 'disponible' ? 'disponible' : 'preparacion'}>
                    {u.estado === 'disponible' ? 'Disponible' : 'En preparación'}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <RecorridoFilosofico />
    </div>
  );
}
