'use client';

import { BITACORA_COMPANERO, GUION_C3_U4, type TramoC3U4 } from '@/content/lecciones/c3-u4-guion';
import { marcarSemaforo } from '@/lib/progreso/semaforo';
import { PresentacionEva, type PropsVisual } from './PresentacionEva';

const LECCION = 'c3-u4';
const IDS = BITACORA_COMPANERO.entradas.map((e) => e.id);

/** Presentación de la unidad 3.4 «Organizar y documentar una investigación». */
export function PresentacionC3U4() {
  return (
    <PresentacionEva
      leccionId={LECCION}
      guion={GUION_C3_U4}
      Visual={Visual}
      semaforos={IDS}
      etiqueta="Recreación del guion · videocápsula 3.4"
      descripcion="EVA presenta la unidad 3.4"
    />
  );
}

const MARCAS = [
  ['verde', 'Se sostiene'],
  ['amarillo', 'Falta algo'],
  ['rojo', 'No se sostiene'],
] as const;

/** La bitácora del compañero como tabla. */
function Bitacora() {
  return (
    <div className="v-bitacora">
      <p className="v-borrador__rotulo mono">{BITACORA_COMPANERO.titulo}</p>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Afirma</th>
            <th scope="col">Fuente y enlace</th>
            <th scope="col">Consulta</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {BITACORA_COMPANERO.entradas.map((e, k) => (
            <tr key={e.id}>
              <td>{k + 1}</td>
              <td>{e.afirma}</td>
              <td>
                {e.fuente}
                <br />
                <span className="mono v-bitacora__enlace">{e.enlace}</span>
              </td>
              <td className="mono">{e.consulta}</td>
              <td>
                {e.estado}
                {e.nota && <span className="v-bitacora__nota"> · {e.nota}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Visual({ tramo, semaforo }: PropsVisual<TramoC3U4>) {
  switch (tramo.visual) {
    case 'pregunta':
      return (
        <div className="v-regla">
          <p className="v-regla__chica">La pregunta del profesor</p>
          <p className="v-regla__grande">¿De dónde salió esto?</p>
        </div>
      );
    case 'politica':
      return (
        <figure className="v-deber">
          <blockquote>
            «El uso de este tipo de herramientas <mark>sin la adecuada citación</mark> es considerado como plagio.»
          </blockquote>
          <figcaption className="mono">PUCV, Política de Integridad Académica</figcaption>
        </figure>
      );
    case 'bitacora':
      return <Bitacora />;
    case 'semaforo':
      return (
        <div className="v-semaforo">
          <p className="rotulo rotulo--acento">Marca cada entrada · abre los enlaces si quieres</p>
          {BITACORA_COMPANERO.entradas.map((e, k) => (
            <fieldset key={e.id} className="v-semaforo__tarjeta">
              <legend>
                Entrada {k + 1} · {e.estado}
              </legend>
              <p>{e.afirma}</p>
              <p className="v-semaforo__pista mono">
                {e.fuente} · {e.enlace} · {e.consulta}
              </p>
              <div className="v-semaforo__opciones">
                {MARCAS.map(([valor, rotulo]) => (
                  <label key={valor} className="v-semaforo__opcion" data-color={valor}>
                    <input type="radio" name={`semaforo-${LECCION}-${e.id}`} checked={semaforo[e.id] === valor} onChange={() => marcarSemaforo(LECCION, e.id, valor)} />
                    <span>{rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      );
    case 'partes':
      return (
        <ol className="v-ciclo v-ciclo--cinco">
          {(
            [
              ['La pregunta', 'y su alcance'],
              ['Las búsquedas', 'dónde, cómo, cuándo'],
              ['Las fuentes', 'enlace, fecha, estado'],
              ['El uso de IA', 'qué, para qué, qué verificaste'],
              ['Las decisiones', 'qué descartaste'],
            ] as const
          ).map(([parte, que], k) => (
            <li key={parte}>
              <span className="mono">{String(k + 1).padStart(2, '0')}</span>
              <strong>{parte}</strong>
              <span>{que}</span>
            </li>
          ))}
        </ol>
      );
    case 'estados':
      return (
        <ul className="v-decisiones">
          <li data-color="verde">
            <strong>Verificada</strong> la leíste en la fuente, y el enlace lleva a ella
          </li>
          <li data-color="amarillo">
            <strong>Pendiente</strong> falta algo, y lo dices
          </li>
          <li data-color="rojo">
            <strong>Descartada</strong> no existe o no dice eso
          </li>
        </ul>
      );
    case 'regla':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Si lo usaste, lo declaras. Si lo afirmas, lo enlazas.</p>
          <p className="v-regla__chica">Una bitácora es lo que te deja defender tu trabajo</p>
        </div>
      );
    case 'cierre':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Revisa la suya. Arma la tuya.</p>
          <p className="v-regla__chica">La revelación: en la evaluación</p>
        </div>
      );
  }
}
