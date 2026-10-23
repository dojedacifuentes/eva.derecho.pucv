import { PREGUNTAS_FILOSOFICAS, RECORRIDO_FILOSOFICO, rutaGuia, rutaLeccion } from '@/content/academy';

/** Recorrido optativo «Lo humano en cuestión», enlazado a EVA ACADEMY. No es requisito de ningún curso. */
export function RecorridoFilosofico() {
  const total = RECORRIDO_FILOSOFICO.reduce((s, l) => s + l.minutos, 0);
  return (
    <section id="lo-humano" className="recorrido panel" aria-labelledby="t-lo-humano">
      <div className="recorrido__cabeza">
        <p className="rotulo rotulo--acento">Recorrido optativo · en EVA ACADEMY</p>
        <h2 id="t-lo-humano" className="recorrido__titulo">Lo humano en cuestión</h2>
        <p className="recorrido__texto">
          Cinco lecciones para cuando la técnica ya no basta y aparece la pregunta de fondo: qué queda de lo humano y qué
          le toca al Derecho. No es requisito de ningún curso. ≈ {Math.round(total / 5) * 5} min en total.
        </p>
      </div>
      <ol className="recorrido__lista">
        {RECORRIDO_FILOSOFICO.map((l, i) => (
          <li key={l.leccion} className="recorrido__item">
            <span className="mono recorrido__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="recorrido__cuerpo">
              <a href={rutaLeccion(l)} target="_blank" rel="noreferrer" className="academy__enlace">
                {l.titulo} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
              <span className="recorrido__pregunta">{PREGUNTAS_FILOSOFICAS[l.leccion]}</span>
            </span>
            <span className="academy__meta mono">
              {l.minutos} min ·{' '}
              <a href={rutaGuia(l)} target="_blank" rel="noreferrer">
                guía
              </a>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
