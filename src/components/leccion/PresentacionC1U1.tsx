'use client';

import { CONVERSACION, ENCARGO_EXAMINADOR, GUION_C1_U1, type Tramo } from '@/content/lecciones/c1-u1-guion';
import { marcarSemaforo } from '@/lib/progreso/semaforo';
import { PresentacionEva, type PropsVisual } from './PresentacionEva';

const LECCION = 'c1-u1';

/** Presentación de la unidad 1.1 (guion de la videocápsula 1.1). */
export function PresentacionC1U1() {
  return (
    <PresentacionEva
      leccionId={LECCION}
      guion={GUION_C1_U1}
      Visual={Visual}
      semaforos={['c1', 'c2']}
      etiqueta="Recreación del guion · videocápsula 1.1"
      descripcion="EVA presenta la unidad 1.1"
    />
  );
}

function Chat({ quien, children, tono }: { quien: 'IA' | 'EVA'; children: React.ReactNode; tono?: 'error' }) {
  return (
    <p className={`chat__burbuja chat__burbuja--${quien === 'IA' ? 'ia' : 'eva'}`} data-tono={tono}>
      <span className="chat__quien mono">{quien === 'IA' ? 'Asistente de IA · recreación' : 'EVA'}</span>
      {children}
    </p>
  );
}

function Visual({ tramo, semaforo }: PropsVisual<Tramo>) {
  switch (tramo.visual) {
    case 'cifra':
      return (
        <div className="v-cifra">
          <p className="v-cifra__numero">81 %</p>
          <p className="v-cifra__pie mono">usa IA · primer año U. de Chile · Encuesta Única de Admisión 2025</p>
          <p className="v-cifra__giro">
            <s>que te responda</s> <span>→ que te examine</span>
          </p>
          <p className="etiqueta" data-tono="pendiente">
            1 error escondido
          </p>
        </div>
      );
    case 'encargo':
      return (
        <pre className="v-encargo mono">
          {ENCARGO_EXAMINADOR.split('\n').map((l, k) => (
            <span key={k} data-orden={[1, 2, 3].includes(k) ? 'si' : undefined}>
              {l}
              {'\n'}
            </span>
          ))}
        </pre>
      );
    case 'pregunta1':
      return (
        <div className="chat">
          <Chat quien="IA">Pregunta 1 de 5. {CONVERSACION.pregunta1}</Chat>
          <Chat quien="EVA">{CONVERSACION.respuesta1}</Chat>
          <Chat quien="IA">Antes de corregirte: ¿qué tan segura estás, de 1 a 5? — EVA: 3.</Chat>
          <Chat quien="IA">{CONVERSACION.correccion1}</Chat>
        </div>
      );
    case 'pregunta2':
      return (
        <div className="chat">
          <Chat quien="IA">Pregunta 2 de 5. {CONVERSACION.pregunta2}</Chat>
          <Chat quien="EVA">{CONVERSACION.respuesta2}</Chat>
          <Chat quien="IA">Antes de corregirte: ¿qué tan segura estás, de 1 a 5? — EVA: 4.</Chat>
          <Chat quien="IA">{CONVERSACION.correccion2}</Chat>
        </div>
      );
    case 'semaforo':
      return (
        <div className="v-semaforo">
          <p className="rotulo rotulo--acento">Marca antes de verificar</p>
          {(
            [
              ['c1', 'Corrección 1 · art. 19', CONVERSACION.correccion1],
              ['c2', 'Corrección 2 · art. 20', CONVERSACION.correccion2],
            ] as const
          ).map(([id, titulo, texto]) => (
            <fieldset key={id} className="v-semaforo__tarjeta">
              <legend>{titulo}</legend>
              <p>{texto}</p>
              <div className="v-semaforo__opciones">
                {(
                  [
                    ['verde', 'Tiene razón'],
                    ['amarillo', 'Dudo'],
                    ['rojo', 'Se equivoca'],
                  ] as const
                ).map(([valor, rotulo]) => (
                  <label key={valor} className="v-semaforo__opcion" data-color={valor}>
                    <input type="radio" name={`semaforo-${id}`} checked={semaforo[id] === valor} onChange={() => marcarSemaforo(LECCION, id, valor)} />
                    <span>{rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <p className="v-semaforo__pista mono">Para verificar: el apunte (abajo, en la lectura) y el Código Civil en LeyChile.</p>
        </div>
      );
    case 'predice':
      return (
        <div className="v-predice">
          <p className="v-predice__frase">
            «…la IA me corrige con el artículo <span className="v-predice__hueco">___</span>»
          </p>
          <ul className="v-predice__barras">
            {(
              [
                ['veinte', 46],
                ['veintiuno', 41],
                ['diecinueve', 13],
              ] as const
            ).map(([p, v]) => (
              <li key={p}>
                <span className="mono">{p}</span>
                <span className="v-predice__barra" style={{ width: `${v * 1.6}%` }} />
                <span className="mono">{v} %</span>
              </li>
            ))}
          </ul>
          <p className="v-predice__pie mono">Predice, no sabe · probabilidades ilustrativas</p>
          <p className="v-predice__estudio mono">
            Chat que responde: −17 % en la prueba sin IA · Tutor que pregunta: ≈ igual que sin IA · Bastani et al., PNAS, 2025
          </p>
        </div>
      );
    case 'regla':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Que te pregunte, no que te responda.</p>
          <p className="v-regla__chica">Lo que corrige, se verifica.</p>
        </div>
      );
    case 'cierre':
      return (
        <div className="v-cierre">
          <div>
            <p className="rotulo">Puedes subir</p>
            <p>✓ Tus apuntes · leyes y sentencias publicadas · material que tu profesor autorice</p>
          </div>
          <div>
            <p className="rotulo">No subas</p>
            <p>✗ Manuales · apuntes ajenos · datos de personas · nada confidencial</p>
          </div>
          <p className="v-cierre__pregunta">¿Rojo, verde o amarillo? Lo revelo en la evaluación.</p>
        </div>
      );
  }
}
