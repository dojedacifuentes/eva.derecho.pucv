import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarCurso, CURSOS, rutaUnidad } from '@/content/catalogo';

export function generateStaticParams() {
  return CURSOS.map((c) => ({ curso: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ curso: string }> }): Promise<Metadata> {
  const curso = buscarCurso((await params).curso);
  return { title: curso ? `Curso ${curso.numero}: ${curso.titulo}` : 'Curso' };
}

export default async function FichaCurso({ params }: { params: Promise<{ curso: string }> }) {
  const curso = buscarCurso((await params).curso);
  if (!curso) notFound();
  const siguiente = CURSOS.find((c) => c.numero === curso.numero + 1);

  return (
    <div className="pagina envoltura">
      <nav className="migas mono" aria-label="Ruta">
        <Link href="/cursos">Cursos</Link> <span aria-hidden="true">/</span> <span aria-current="page">Curso {curso.numero}</span>
      </nav>
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Curso {curso.numero}</p>
        <h1 className="titular pagina__titulo">{curso.titulo}</h1>
        <p className="entradilla">{curso.pregunta}</p>
      </header>

      <section className="ficha-curso panel" aria-labelledby="resultado">
        <h2 id="resultado" className="rotulo">Al terminar el curso</h2>
        <p className="ficha-curso__resultado">{curso.resultado}</p>
      </section>

      <ol className="unidades unidades--grandes">
        {curso.unidades.map((u) => (
          <li key={u.id} className="unidad" data-estado={u.estado}>
            <span className="unidad__num mono">
              {curso.numero}.{u.numero}
            </span>
            <span className="unidad__cuerpo">
              {u.estado === 'disponible' ? (
                <Link href={rutaUnidad(curso, u)} className="unidad__titulo">
                  {u.titulo}
                </Link>
              ) : (
                <span className="unidad__titulo">{u.titulo}</span>
              )}
              <span className="unidad__objetivo">
                <span className="rotulo">{u.estado === 'disponible' ? 'Objetivo' : 'Objetivo planificado'}</span> {u.objetivo}
              </span>
              <span className="unidad__uso">Tarea real: {u.uso}</span>
            </span>
            {u.estado === 'disponible' ? (
              <Link className="boton boton--primario" href={rutaUnidad(curso, u)}>
                Empezar →
              </Link>
            ) : (
              <span className="etiqueta" data-tono="preparacion">
                En preparación
              </span>
            )}
          </li>
        ))}
      </ol>

      {siguiente && (
        <p className="pagina__siguiente">
          Después: <Link href={`/cursos/${siguiente.slug}`}>Curso {siguiente.numero} · {siguiente.titulo} →</Link>
        </p>
      )}
    </div>
  );
}
