import { EN_ACADEMY, rutaGuia, rutaJuego, rutaLeccion } from '@/content/academy';

/**
 * «Practica en EVA ACADEMY»: las lecciones y juegos del curso gamificado de EVA que sirven a esta unidad. Son
 * enlaces: se abren en EVA ACADEMY y no pesan aquí. Si la unidad no tiene equivalente, no se muestra nada.
 */
export function PracticaAcademy({ unidadId, enPreparacion = false }: { unidadId: string; enPreparacion?: boolean }) {
  const e = EN_ACADEMY[unidadId];
  if (!e || (e.lecciones.length === 0 && e.juegos.length === 0)) return null;
  return (
    <section className="academy panel" aria-labelledby={`academy-${unidadId}`}>
      <div className="academy__cabeza">
        <p className="rotulo rotulo--acento">EVA ACADEMY</p>
        <h2 id={`academy-${unidadId}`} className="academy__titulo">
          {enPreparacion ? 'Mientras tanto, practica en EVA ACADEMY' : 'Practica y profundiza en EVA ACADEMY'}
        </h2>
        <p className="academy__nota">
          El curso gamificado de EVA: se abre en otra pestaña y guarda su propio avance en tu navegador.
        </p>
      </div>
      {e.lecciones.length > 0 && (
        <ul className="academy__lista">
          {e.lecciones.map((l) => (
            <li key={l.leccion} className="academy__item">
              <span className="etiqueta" data-tono={l.encaje === 'directo' ? 'disponible' : 'diseno'}>
                {l.encaje === 'directo' ? 'Lección' : 'Para profundizar'}
              </span>
              <a href={rutaLeccion(l)} target="_blank" rel="noreferrer" className="academy__enlace">
                {l.titulo} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
              <span className="academy__meta mono">
                {l.minutos} min ·{' '}
                <a href={rutaGuia(l)} target="_blank" rel="noreferrer">
                  guía de estudio
                </a>
              </span>
            </li>
          ))}
        </ul>
      )}
      {e.juegos.length > 0 && (
        <ul className="academy__juegos">
          {e.juegos.map((j) => (
            <li key={j.ruta}>
              <a href={rutaJuego(j)} target="_blank" rel="noreferrer" className="academy__juego">
                <span className="rotulo">Juego</span>
                <strong>
                  {j.titulo} <span aria-hidden="true">↗</span>
                </strong>
                <span>{j.que}</span>
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
