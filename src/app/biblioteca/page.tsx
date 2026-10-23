import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Biblioteca de investigación jurídica' };

/**
 * Fuentes oficiales. `revisado`: la dirección respondió en la revisión automática del 23-10-2026. Las que bloquean
 * esa revisión (responden 403 a un programa) las confirma una persona antes de publicar.
 */
const FUENTES = [
  { nombre: 'LeyChile (Biblioteca del Congreso Nacional)', uso: 'Texto vigente e histórico de leyes, códigos y decretos.', url: 'https://www.bcn.cl/leychile/', acceso: 'Gratis', revisado: true },
  { nombre: 'Diario Oficial', uso: 'Publicación oficial de normas.', url: 'https://www.diariooficial.interior.gob.cl/', acceso: 'Gratis', revisado: true },
  { nombre: 'Tribunal Constitucional', uso: 'Sentencias y causas del Tribunal Constitucional.', url: 'https://www.tribunalconstitucional.cl/', acceso: 'Gratis', revisado: true },
  { nombre: 'Contraloría General de la República', uso: 'Dictámenes y jurisprudencia administrativa.', url: 'https://www.contraloria.cl/', acceso: 'Gratis', revisado: true },
  { nombre: 'Buscador de jurisprudencia del Poder Judicial', uso: 'Sentencias de la Corte Suprema, cortes de apelaciones y tribunales.', url: 'https://juris.pjud.cl/', acceso: 'Gratis', revisado: false },
  { nombre: 'Revista de Derecho PUCV', uso: 'Doctrina revisada por pares, de la Escuela.', url: 'https://www.projurepucv.cl/index.php/rderecho', acceso: 'Gratis', revisado: true },
  { nombre: 'SciELO Chile', uso: 'Revistas académicas chilenas en acceso abierto.', url: 'https://www.scielo.cl/', acceso: 'Gratis', revisado: false },
  { nombre: 'Biblioteca PUCV', uso: 'Catálogo, bases de datos suscritas y préstamo, con tus credenciales.', url: 'https://biblioteca.pucv.cl/', acceso: 'Institucional', revisado: false },
];

const AUDITAR = [
  ['Existe', 'Búscala en la fuente oficial, no en el chat: rol y tribunal, o autor, título, revista y año.'],
  ['Dice eso', 'Lee el pasaje. Una cita real puede no decir lo que se le atribuye.'],
  ['Está vigente', 'Para una norma, la versión a la fecha que importa. Para un fallo, si fue revocado o anulado.'],
  ['Es de quien dice', 'Tribunal, autor y año correctos: un error aquí invalida la cita aunque el texto exista.'],
  ['Queda registrada', 'Anota dónde la verificaste, con enlace y fecha. Verifica quien firma, no otra IA.'],
];

export default function Biblioteca() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Biblioteca de investigación · en diseño</p>
        <h1 className="titular pagina__titulo">Si no está en la fuente, no existe.</h1>
        <p className="entradilla">
          Dónde buscar Derecho chileno y cómo auditar una cita antes de usarla. La IA ayuda a buscar; la fuente decide.
        </p>
      </header>

      <section className="bloque" aria-labelledby="t-fuentes">
        <h2 id="t-fuentes" className="bloque__titulo">Fuentes oficiales</h2>
        <ul className="tarjetas">
          {FUENTES.map((f) => (
            <li key={f.url} className="panel tarjeta">
              <h3 className="tarjeta__titulo">
                <a href={f.url} target="_blank" rel="noreferrer">
                  {f.nombre}
                </a>
              </h3>
              <p className="tarjeta__texto">{f.uso}</p>
              <p className="tarjeta__etiquetas">
                <span className="etiqueta" data-tono={f.acceso === 'Gratis' ? 'gratis' : 'institucional'}>
                  {f.acceso}
                </span>
                {!f.revisado && (
                  <span className="etiqueta" data-tono="por-verificar">
                    enlace por confirmar
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bloque" aria-labelledby="t-auditar">
        <h2 id="t-auditar" className="bloque__titulo">Auditar una cita en cinco pasos</h2>
        <ol className="pasos-auditoria">
          {AUDITAR.map(([t, d], i) => (
            <li key={t} className="panel">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <strong>{t}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="aviso-pagina mono">
        Próximamente: guías de búsqueda de doctrina y jurisprudencia por tema, y una bitácora para ordenar una
        investigación. Las bases de datos de pago se indicarán como tales.
      </p>
    </div>
  );
}
