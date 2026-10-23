'use client';

import { ESTADO_AL, GUION_C3_U2, PREGUNTA_C3_U2, RESPUESTA_IA_C3_U2, type TramoC3U2 } from '@/content/lecciones/c3-u2-guion';
import { marcarSemaforo } from '@/lib/progreso/semaforo';
import { PresentacionEva, type PropsVisual } from './PresentacionEva';

const LECCION = 'c3-u2';
const IDS = RESPUESTA_IA_C3_U2.afirmaciones.map((a) => a.id);

/** Presentación de la unidad 3.2 «Buscar en fuentes chilenas». */
export function PresentacionC3U2() {
  return (
    <PresentacionEva
      leccionId={LECCION}
      guion={GUION_C3_U2}
      Visual={Visual}
      semaforos={IDS}
      etiqueta="Recreación del guion · videocápsula 3.2"
      descripcion="EVA presenta la unidad 3.2"
    />
  );
}

const MARCAS = [
  ['verde', 'La creo'],
  ['amarillo', 'Dudo'],
  ['rojo', 'Es falsa'],
] as const;

function Respuesta() {
  return (
    <div className="chat">
      <p className="chat__burbuja chat__burbuja--eva">
        <span className="chat__quien mono">EVA</span>
        {PREGUNTA_C3_U2}
      </p>
      <p className="chat__burbuja chat__burbuja--ia">
        <span className="chat__quien mono">{RESPUESTA_IA_C3_U2.rotulo}</span>
        {RESPUESTA_IA_C3_U2.afirmaciones.map((a) => a.texto).join(' ')}
      </p>
    </div>
  );
}

function Visual({ tramo, semaforo }: PropsVisual<TramoC3U2>) {
  switch (tramo.visual) {
    case 'pregunta':
      return (
        <div className="v-regla">
          <p className="v-regla__chica">La pregunta de un cliente</p>
          <p className="v-regla__grande">¿Desde cuándo rige la nueva ley de datos personales?</p>
          <p className="etiqueta" data-tono="pendiente">
            1 de 3 afirmaciones es falsa
          </p>
        </div>
      );
    case 'respuesta':
      return <Respuesta />;
    case 'semaforo':
      return (
        <div className="v-semaforo">
          <p className="rotulo rotulo--acento">Marca antes de verificar</p>
          {RESPUESTA_IA_C3_U2.afirmaciones.map((a, k) => (
            <fieldset key={a.id} className="v-semaforo__tarjeta">
              <legend>Afirmación {k + 1}</legend>
              <p>{a.texto}</p>
              <div className="v-semaforo__opciones">
                {MARCAS.map(([valor, rotulo]) => (
                  <label key={valor} className="v-semaforo__opcion" data-color={valor}>
                    <input type="radio" name={`semaforo-${LECCION}-${a.id}`} checked={semaforo[a.id] === valor} onChange={() => marcarSemaforo(LECCION, a.id, valor)} />
                    <span>{rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      );
    case 'ciclo':
      return (
        <ol className="v-ciclo">
          {(
            [
              ['Planificar', 'pregunta, términos, qué contará como respuesta'],
              ['Pedir', 'la IA como mapa: números y términos'],
              ['Verificar', 'en la fuente oficial'],
              ['Documentar', 'dónde, cuándo, qué versión'],
            ] as const
          ).map(([paso, que], k) => (
            <li key={paso}>
              <span className="mono">{String(k + 1).padStart(2, '0')}</span>
              <strong>{paso}</strong>
              <span>{que}</span>
            </li>
          ))}
        </ol>
      );
    case 'leychile':
      return (
        <div className="v-ficha">
          <p className="v-ficha__fuente mono">LeyChile · ficha de la norma (recreación)</p>
          <p className="v-ficha__titulo">Ley 21.719</p>
          <p className="v-ficha__materia">Regula la protección y el tratamiento de los datos personales y crea la Agencia de Protección de Datos Personales</p>
          <dl>
            <div>
              <dt>Promulgación</dt>
              <dd>25-11-2024</dd>
            </div>
            <div>
              <dt>Publicación</dt>
              <dd>13-12-2024</dd>
            </div>
            <div>
              <dt>Versión</dt>
              <dd>05-02-2026</dd>
            </div>
          </dl>
          <p className="v-ficha__transitorio">
            <span className="mono">Art. 1° transitorio</span> «…entrarán en vigencia el día primero del mes vigésimo cuarto posterior a la
            publicación de esta ley en el Diario Oficial.»
          </p>
        </div>
      );
    case 'tramitacion':
      return (
        <div className="v-ficha v-ficha--oscura">
          <p className="v-ficha__fuente mono">Senado · tramitación · al {ESTADO_AL}</p>
          <p className="v-ficha__titulo">Boletín 18.623-07</p>
          <p className="v-ficha__materia">Modifica la ley N° 21.719 (mensaje, ingresó el 1-09-2026)</p>
          <p className="v-ficha__cambio">
            <s>día primero del mes vigésimo cuarto posterior a la publicación</s> → <strong>1 de diciembre de 2027</strong>
          </p>
          <p className="etiqueta" data-tono="pendiente">
            Primer trámite · discusión inmediata
          </p>
        </div>
      );
    case 'regla':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Fuente + fecha de consulta.</p>
          <p className="v-regla__chica">Sin fecha, no es una respuesta: es un rumor.</p>
        </div>
      );
    case 'cierre':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Una pregunta. Cuatro pasos. Tu bitácora.</p>
          <p className="v-regla__chica">La práctica: investiga tú · la revelación: en la evaluación</p>
        </div>
      );
  }
}
