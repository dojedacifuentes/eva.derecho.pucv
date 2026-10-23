'use client';

import { useEffect, useState } from 'react';
import { ENCARGO_EXAMINADOR } from '@/content/lecciones/c1-u1-guion';
import { useAvance } from './usarAvance';

const LECCION = 'c1-u1';
const CLAVE_BITACORA = `eva-derecho:bitacora:${LECCION}:v1`;

interface Bitacora {
  quePedi: string;
  queVerifique: string;
  queHariaDistinto: string;
}
const VACIA: Bitacora = { quePedi: '', queVerifique: '', queHariaDistinto: '' };

const COTEJO = [
  'Respondí al menos tres preguntas sin mirar el apunte.',
  'Anoté mi seguridad (1 a 5) antes de cada corrección.',
  'Verifiqué una corrección en el apunte o en LeyChile, con el párrafo o el enlace.',
  'Mi bitácora responde las tres preguntas.',
];

/** Práctica guiada (10 a 12 min): encargo copiable, pasos, bitácora de IA y lista de cotejo. Todo queda en el navegador. */
export function PracticaC1U1() {
  const { marcar, hecho } = useAvance(LECCION);
  const [copiado, setCopiado] = useState(false);
  const [bitacora, setBitacora] = useState<Bitacora>(VACIA);
  const [cotejo, setCotejo] = useState<boolean[]>(COTEJO.map(() => false));
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    try {
      const b = JSON.parse(localStorage.getItem(CLAVE_BITACORA) ?? 'null');
      // Se carga después de montar para que el HTML del servidor y el del navegador coincidan.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (b) setBitacora({ ...VACIA, ...b });
    } catch {
      // sin almacenamiento
    }
  }, []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(ENCARGO_EXAMINADOR);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    const completa = Object.values(bitacora).every((v) => v.trim().length >= 10);
    if (!completa) {
      setAviso('Responde las tres preguntas (al menos una frase cada una).');
      return;
    }
    try {
      localStorage.setItem(CLAVE_BITACORA, JSON.stringify(bitacora));
    } catch {
      // sin almacenamiento: igual se marca el paso en esta visita
    }
    marcar('practica');
    setAviso('Bitácora guardada en este navegador.');
  };

  return (
    <div className="practica">
      <ol className="practica__pasos">
        <li>
          <strong>Sin IA, 2 minutos.</strong> Antes de abrir el asistente, escribe de memoria, en tres líneas, lo que
          recuerdas del tema. Lo comparas al final.
        </li>
        <li>
          <strong>Pega tu apunte con este encargo</strong> en el asistente que uses. Sirve el apunte de la lectura o
          uno tuyo de cualquier ramo.
          <div className="encargo">
            <pre className="mono">{ENCARGO_EXAMINADOR}</pre>
            <button type="button" className="boton" onClick={copiar}>
              {copiado ? '✓ Copiado' : 'Copiar encargo'}
            </button>
            <p className="encargo__acceso">
              <span className="etiqueta" data-tono="gratis">
                Gratis
              </span>{' '}
              Basta un chat que acepte texto pegado; los límites de uso de cada plan cambian: revísalos antes de clase.
            </p>
          </div>
        </li>
        <li>
          <strong>Responde al menos tres preguntas sin mirar el apunte.</strong> Cuando la IA te pregunte qué tan seguro
          estás, anótalo.
        </li>
        <li>
          <strong>Verifica una corrección</strong>, de preferencia una que te haya dicho «incorrecto»: busca el párrafo
          citado en el apunte y, si cita un artículo, ábrelo en{' '}
          <a href="https://www.bcn.cl/leychile/navegar?idNorma=172986" target="_blank" rel="noreferrer">
            LeyChile (Código Civil)
          </a>
          . ¿La IA tenía razón?
        </li>
        <li>
          <strong>Compara</strong> tus tres líneas del primer paso con lo que respondiste: ¿qué te sirvió más?
        </li>
      </ol>

      <form className="bitacora panel" onSubmit={guardar}>
        <p className="rotulo rotulo--acento">Bitácora de IA · tres preguntas</p>
        {(
          [
            ['quePedi', '¿Qué le pedí y por qué?'],
            ['queVerifique', '¿Qué verifiqué y dónde? (párrafo del apunte o enlace)'],
            ['queHariaDistinto', '¿Qué haría distinto la próxima vez?'],
          ] as const
        ).map(([campo, etiqueta]) => (
          <label key={campo} className="bitacora__campo">
            <span>{etiqueta}</span>
            <textarea
              rows={2}
              maxLength={2000}
              value={bitacora[campo]}
              onChange={(e) => setBitacora((b) => ({ ...b, [campo]: e.target.value }))}
            />
          </label>
        ))}
        <div className="bitacora__pie">
          <button type="submit" className="boton boton--primario">
            {hecho('practica') ? 'Actualizar bitácora' : 'Guardar bitácora'}
          </button>
          <p className="bitacora__aviso" aria-live="polite">
            {aviso}
          </p>
        </div>
        <p className="bitacora__privacidad mono">Tu bitácora es privada. Con cuenta, podrás decidir si la compartes con tu docente.</p>
      </form>

      <fieldset className="cotejo">
        <legend className="rotulo">Lista de cotejo (autoevaluación)</legend>
        {COTEJO.map((c, k) => (
          <label key={c} className="cotejo__item">
            <input type="checkbox" checked={cotejo[k]} onChange={() => setCotejo((v) => v.map((x, j) => (j === k ? !x : x)))} />
            <span>{c}</span>
          </label>
        ))}
      </fieldset>

      <div className="que-subir">
        <p className="rotulo">Qué puedes subir a una IA</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Sí</th>
              <th scope="col">No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tus propios apuntes y resúmenes</td>
              <td>Manuales y libros (obras protegidas)</td>
            </tr>
            <tr>
              <td>Textos legales públicos: leyes, sentencias publicadas</td>
              <td>Apuntes de otras personas sin su permiso</td>
            </tr>
            <tr>
              <td>Material que tu profesor autorice expresamente</td>
              <td>Trabajos o casos con datos de personas; nada confidencial</td>
            </tr>
          </tbody>
        </table>
        <p className="mono que-subir__nota">
          Ajustar al reglamento de integridad académica de la Escuela. Herramienta para decidir caso a caso:{' '}
          <a href="/herramientas/antes-de-subir">Antes de subir</a>.
        </p>
      </div>
    </div>
  );
}
