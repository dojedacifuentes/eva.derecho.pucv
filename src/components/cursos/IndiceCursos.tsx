import Link from 'next/link';
import { Punto } from '@/components/secciones/IndiceSecciones';
import { CURSOS, rutaUnidad, type Curso } from '@/content/catalogo';

/*
 * Los ocho cursos en formato índice: una línea por curso que se despliega y muestra sus cuatro módulos. Dos columnas
 * de cuatro (una en el teléfono); `name` hace que se abra uno a la vez. Sin JavaScript: <details> nativo.
 */
export function IndiceCursos({ abierto }: { abierto?: string }) {
  const mitad = Math.ceil(CURSOS.length / 2);
  const columnas = [CURSOS.slice(0, mitad), CURSOS.slice(mitad)];
  return (
    <div className="acordeon">
      {columnas.map((columna, i) => (
        <div key={i} className="acordeon__columna">
          {columna.map((c) => (
            <CursoDesplegable key={c.id} curso={c} abierto={c.id === abierto} />
          ))}
        </div>
      ))}
    </div>
  );
}

function CursoDesplegable({ curso, abierto }: { curso: Curso; abierto: boolean }) {
  const disponibles = curso.unidades.filter((u) => u.estado === 'disponible').length;
  return (
    <details id={`curso-${curso.numero}`} name="cursos" className="curso" open={abierto}>
      <summary className="curso__resumen">
        <span className="curso__num">{curso.numero}</span>
        <span className="curso__textos">
          <span className="curso__titulo">{curso.titulo}</span>
          <span className="curso__pregunta">{curso.pregunta}</span>
        </span>
        <span className="curso__estado">
          {disponibles > 0 ? `${disponibles} de ${curso.unidades.length} abiertos` : 'en preparación'}
        </span>
        <span className="curso__signo" aria-hidden="true" />
      </summary>
      <ol className="curso__modulos">
        {curso.unidades.map((u) => (
          <li key={u.id}>
            <span className="curso__modulo-num">
              {curso.numero}.{u.numero}
            </span>
            {u.estado === 'disponible' ? <Link href={rutaUnidad(curso, u)}>{u.titulo}</Link> : <span>{u.titulo}</span>}
            <Punto lleno={u.estado === 'disponible'} />
          </li>
        ))}
      </ol>
      <Link className="curso__ver" href={`/cursos/${curso.slug}`}>
        Ver el curso {curso.numero}
      </Link>
    </details>
  );
}
