import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Cierre } from '@/components/leccion/Cierre';
import { EvaluacionLeccion } from '@/components/leccion/EvaluacionLeccion';
import { IndiceLeccion } from '@/components/leccion/IndiceLeccion';
import { MarcarPaso } from '@/components/leccion/MarcarPaso';
import { PracticaAcademy } from '@/components/leccion/PracticaAcademy';
import { PuntoDePartida } from '@/components/leccion/PuntoDePartida';
import { LECCIONES } from '@/components/leccion/registro';
import { buscarUnidad, rutaUnidad, TODAS_LAS_UNIDADES } from '@/content/catalogo';

export function generateStaticParams() {
  return TODAS_LAS_UNIDADES.map(({ curso, unidad }) => ({ curso: curso.slug, unidad: unidad.slug }));
}
export const dynamicParams = false;

type Parametros = { params: Promise<{ curso: string; unidad: string }> };

export async function generateMetadata({ params }: Parametros): Promise<Metadata> {
  const { curso, unidad } = await params;
  const r = buscarUnidad(curso, unidad);
  return { title: r ? `${r.curso.numero}.${r.unidad.numero} ${r.unidad.titulo}` : 'Unidad' };
}

export default async function PaginaUnidad({ params }: Parametros) {
  const { curso: cursoSlug, unidad: unidadSlug } = await params;
  const r = buscarUnidad(cursoSlug, unidadSlug);
  if (!r) notFound();
  const { curso, unidad } = r;
  const n = `${curso.numero}.${unidad.numero}`;
  const migas = (
    <nav className="migas mono" aria-label="Ruta">
      <Link href="/cursos">Cursos</Link> <span aria-hidden="true">/</span>{' '}
      <Link href={`/cursos/${curso.slug}`}>Curso {curso.numero}</Link> <span aria-hidden="true">/</span>{' '}
      <span aria-current="page">Unidad {n}</span>
    </nav>
  );

  // Unidades en preparación: el objetivo planificado, sin simular contenido.
  const leccion = unidad.estado === 'disponible' ? LECCIONES[unidad.id] : undefined;
  if (!leccion) {
    // Una unidad disponible del mismo curso o, si no hay, la primera de cualquier curso.
    const enCurso = curso.unidades.find((u) => u.estado === 'disponible');
    const otra = enCurso ? { curso, unidad: enCurso } : TODAS_LAS_UNIDADES.find((x) => x.unidad.estado === 'disponible');
    return (
      <div className="pagina envoltura">
        {migas}
        <header className="pagina__cabeza">
          <p className="rotulo rotulo--acento">Unidad {n} · en preparación</p>
          <h1 className="titular pagina__titulo">{unidad.titulo}</h1>
        </header>
        <section className="ficha-curso panel">
          <p className="rotulo">Objetivo planificado</p>
          <p className="ficha-curso__resultado">{unidad.objetivo}</p>
          <p className="unidad__uso">Tarea real: {unidad.uso}</p>
          <p className="mono ficha-curso__nota">
            Esta videocápsula está en diseño: su guion, actividades y fuentes aún no pasan la revisión. No hay contenido
            que mostrar todavía.
          </p>
        </section>
        <PracticaAcademy unidadId={unidad.id} enPreparacion />
        {otra && (
          <p className="pagina__siguiente">
            Disponible ahora:{' '}
            <Link href={rutaUnidad(otra.curso, otra.unidad)}>
              {otra.curso.numero}.{otra.unidad.numero} {otra.unidad.titulo} →
            </Link>
          </p>
        )}
      </div>
    );
  }

  const leccionId = unidad.id;
  const { Presentacion, Lectura, Practica } = leccion;
  const k = TODAS_LAS_UNIDADES.findIndex((x) => x.unidad.id === unidad.id);
  const prox = TODAS_LAS_UNIDADES[k + 1];
  const siguiente = prox && {
    titulo: `${prox.curso.numero}.${prox.unidad.numero} ${prox.unidad.titulo}`,
    href: prox.unidad.estado === 'disponible' && LECCIONES[prox.unidad.id] ? rutaUnidad(prox.curso, prox.unidad) : undefined,
  };
  return (
    <div className="leccion envoltura">
      {migas}
      <header className="leccion__cabeza">
        <p className="rotulo rotulo--acento">
          Curso {curso.numero} · Unidad {n}
        </p>
        <h1 className="titular leccion__titulo">{unidad.titulo}</h1>
        <dl className="ficha">
          <div>
            <dt className="rotulo">Objetivo</dt>
            <dd>{unidad.objetivo}</dd>
          </div>
          <div>
            <dt className="rotulo">Logro</dt>
            <dd>{leccion.logro}</dd>
          </div>
          <div>
            <dt className="rotulo">Duración</dt>
            <dd>{leccion.duracion}</dd>
          </div>
          <div>
            <dt className="rotulo">Acceso</dt>
            <dd>
              <span className="etiqueta" data-tono="gratis">
                Gratis
              </span>{' '}
              Sin cuenta: el avance queda en este navegador.
            </dd>
          </div>
          <div>
            <dt className="rotulo">Revisión</dt>
            <dd>
              <span className="etiqueta" data-tono="pendiente">
                Revisión jurídica pendiente
              </span>{' '}
              Lo marcado «pendiente» aún no se coteja.
            </dd>
          </div>
        </dl>
      </header>

      <div className="leccion__cuerpo">
        <IndiceLeccion leccionId={leccionId} />

        <div className="leccion__secciones">
          <section id="partida" className="paso-leccion" aria-labelledby="t-partida">
            <h2 id="t-partida" className="paso-leccion__titulo">
              <span className="mono">01</span> Punto de partida
            </h2>
            <PuntoDePartida leccionId={leccionId} pregunta={leccion.partida.pregunta} encargo={leccion.partida.encargo} />
          </section>

          <section id="presentacion" className="paso-leccion" aria-labelledby="t-presentacion">
            <h2 id="t-presentacion" className="paso-leccion__titulo">
              <span className="mono">02</span> EVA presenta
            </h2>
            <Presentacion />
          </section>

          <section id="lectura" className="paso-leccion" aria-labelledby="t-lectura">
            <h2 id="t-lectura" className="paso-leccion__titulo">
              <span className="mono">03</span> Lectura
            </h2>
            <article className="hoja prosa">
              <Lectura />
            </article>
            <div className="paso-leccion__pie">
              <MarcarPaso leccionId={leccionId} paso="lectura" texto="Terminé la lectura" hechoTexto="Lectura hecha" />
            </div>
          </section>

          <section id="practica" className="paso-leccion" aria-labelledby="t-practica">
            <h2 id="t-practica" className="paso-leccion__titulo">
              <span className="mono">04</span> Práctica guiada
            </h2>
            <Practica />
          </section>

          <section id="evaluacion" className="paso-leccion" aria-labelledby="t-evaluacion">
            <h2 id="t-evaluacion" className="paso-leccion__titulo">
              <span className="mono">05</span> Evaluación
            </h2>
            <p className="paso-leccion__intro">
              Cinco preguntas. En cada una marca también qué tan seguro estás: no cambia la nota, pero muestra dónde la
              confianza no coincide con el acierto. Se corrige en el servidor; el dominio es 4 de 5.
            </p>
            <EvaluacionLeccion evaluacion={leccion.evaluacion} />
          </section>

          <section id="fuentes" className="paso-leccion" aria-labelledby="t-fuentes">
            <h2 id="t-fuentes" className="paso-leccion__titulo">
              <span className="mono">06</span> Recursos y fuentes
            </h2>
            <PracticaAcademy unidadId={leccionId} />
            <p className="paso-leccion__intro">
              Cada dato de la lección, con su fuente y su estado. <span className="etiqueta" data-tono="verificada">Verificada</span>{' '}
              = leída en la fuente. <span className="etiqueta" data-tono="pendiente">Pendiente</span> = falta cotejo; no
              va en la voz de EVA.
            </p>
            <ul className="fuentes">
              {leccion.fuentes.map((f) => (
                <li key={f.dato} className="fuente panel">
                  <p className="fuente__dato">{f.dato}</p>
                  <p className="fuente__ref">
                    {f.enlace ? (
                      <a href={f.enlace} target="_blank" rel="noreferrer">
                        {f.fuente}
                      </a>
                    ) : (
                      f.fuente
                    )}
                  </p>
                  <p>
                    <span className="etiqueta" data-tono={f.estado === 'verificada' ? 'verificada' : 'pendiente'}>
                      {f.estado === 'verificada' ? 'Verificada' : 'Pendiente'}
                    </span>{' '}
                    {f.nota && <span className="fuente__nota">{f.nota}</span>}
                  </p>
                </li>
              ))}
            </ul>
            {leccion.glosario && (
              <div className="extras">
                <h3 className="extras__titulo">Glosario</h3>
                <dl className="glosario">
                  {leccion.glosario.map((t) => (
                    <div key={t.termino} className="glosario__termino">
                      <dt>{t.termino}</dt>
                      <dd>{t.definicion}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {leccion.sabias && (
              <div className="extras">
                <h3 className="extras__titulo">¿Sabías que?</h3>
                <ul className="sabias">
                  {leccion.sabias.map((s) => (
                    <li key={s.texto} className="sabias__item panel">
                      <p>{s.texto}</p>
                      <p className="mono sabias__fuente">{s.fuente}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {leccion.autoestudio && (
              <div className="extras">
                <h3 className="extras__titulo">Para discutir en clase</h3>
                <ol className="autoestudio">
                  {leccion.autoestudio.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ol>
              </div>
            )}
            {leccion.lecturas && (
              <div className="extras">
                <h3 className="extras__titulo">Para seguir leyendo</h3>
                <ul className="lecturas">
                  {leccion.lecturas.map((l) => (
                    <li key={l.titulo} className="lecturas__item">
                      <span className="lecturas__titulo">
                        {l.enlace ? (
                          <a href={l.enlace} target="_blank" rel="noreferrer">
                            {l.titulo} <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          l.titulo
                        )}
                      </span>
                      <span className="lecturas__porque">{l.porque}</span>
                      <span className="mono lecturas__meta">
                        {l.nivel} · {l.extension} ·{' '}
                        <span className="etiqueta" data-tono={l.acceso === 'Gratuito' ? 'gratis' : 'pago'}>
                          {l.acceso}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section id="cierre" className="paso-leccion" aria-labelledby="t-cierre">
            <h2 id="t-cierre" className="paso-leccion__titulo">
              <span className="mono">07</span> Cierre
            </h2>
            <Cierre leccionId={leccionId} datos={leccion.cierre} siguiente={siguiente} />
          </section>
        </div>
      </div>
    </div>
  );
}
