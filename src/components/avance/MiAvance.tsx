'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CURSOS, rutaUnidad } from '@/content/catalogo';
import { borrarAvanceLocal, useAvanceLocal } from '@/lib/progreso/local';
import { estadoTexto, porcentaje } from '@/lib/progreso/modelo';

/** El avance guardado en este navegador, unidad por unidad, y la opción de borrarlo. */
export function MiAvance() {
  const guardado = useAvanceLocal();
  const [confirmar, setConfirmar] = useState(false);
  const hay = Object.keys(guardado.lecciones).length > 0;

  return (
    <div className="mi-avance">
      {CURSOS.map((curso) => (
        <section key={curso.id} className="panel mi-avance__curso" aria-labelledby={`t-${curso.id}`}>
          <h2 id={`t-${curso.id}`} className="mi-avance__titulo">
            <span className="mono">Curso {curso.numero}</span> {curso.titulo}
          </h2>
          <ol className="mi-avance__unidades">
            {curso.unidades.map((u) => {
              const a = guardado.lecciones[u.id];
              const pct = a ? porcentaje(a) : 0;
              return (
                <li key={u.id}>
                  <span className="mono">
                    {curso.numero}.{u.numero}
                  </span>
                  <span className="mi-avance__unidad">
                    {u.estado === 'disponible' ? <Link href={rutaUnidad(curso, u)}>{u.titulo}</Link> : u.titulo}
                  </span>
                  {u.estado === 'disponible' ? (
                    <span className="mi-avance__estado">
                      <span className="mi-avance__barra" aria-hidden="true">
                        <span style={{ width: `${pct}%` }} />
                      </span>
                      <span className="mono">
                        {a ? estadoTexto(a) : 'Sin empezar'} · {pct} %{a?.mejor ? ` · ${a.mejor.correctas}/${a.mejor.total}` : ''}
                        {a?.ojoClinico ? ' · Ojo clínico' : ''}
                      </span>
                    </span>
                  ) : (
                    <span className="etiqueta" data-tono="preparacion">
                      En preparación
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <div className="mi-avance__borrar">
        {!confirmar ? (
          <button type="button" className="boton" onClick={() => setConfirmar(true)} disabled={!hay}>
            Borrar mi avance de este navegador
          </button>
        ) : (
          <p role="alert">
            ¿Seguro? No se puede deshacer.{' '}
            <button
              type="button"
              className="boton boton--primario"
              onClick={() => {
                borrarAvanceLocal();
                setConfirmar(false);
              }}
            >
              Sí, borrar
            </button>{' '}
            <button type="button" className="boton" onClick={() => setConfirmar(false)}>
              Cancelar
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
