'use client';

import { GUION_C3_U3, PEDIDO_C3_U3, RESPUESTA_IA_C3_U3, type TramoC3U3 } from '@/content/lecciones/c3-u3-guion';
import { marcarSemaforo } from '@/lib/progreso/semaforo';
import { PresentacionEva, type PropsVisual } from './PresentacionEva';

const LECCION = 'c3-u3';
const IDS = RESPUESTA_IA_C3_U3.citas.map((c) => c.id);

/** Presentación de la unidad 3.3 «Jurisprudencia real, no inventada». */
export function PresentacionC3U3() {
  return (
    <PresentacionEva
      leccionId={LECCION}
      guion={GUION_C3_U3}
      Visual={Visual}
      semaforos={IDS}
      etiqueta="Recreación del guion · videocápsula 3.3"
      descripcion="EVA presenta la unidad 3.3"
    />
  );
}

const MARCAS = [
  ['verde', 'Existe'],
  ['amarillo', 'Dudo'],
  ['rojo', 'Es falsa'],
] as const;

function Visual({ tramo, semaforo }: PropsVisual<TramoC3U3>) {
  switch (tramo.visual) {
    case 'forma':
      return (
        <div className="v-forma">
          <p className="v-forma__plantilla mono">
            <span>TRIBUNAL ________</span> <span>SALA ____</span> <span>ROL ____-____</span> <span>FECHA __/__/____</span>
          </p>
          <p className="v-regla__chica">La forma se imita. La existencia, no.</p>
        </div>
      );
    case 'pedido':
      return (
        <div className="chat">
          <p className="chat__burbuja chat__burbuja--eva">
            <span className="chat__quien mono">EVA</span>
            {PEDIDO_C3_U3}
          </p>
        </div>
      );
    case 'semaforo':
      return (
        <div className="v-semaforo">
          <p className="rotulo rotulo--acento">{RESPUESTA_IA_C3_U3.rotulo} · marca antes de buscar</p>
          {RESPUESTA_IA_C3_U3.citas.map((c, k) => (
            <fieldset key={c.id} className="v-semaforo__tarjeta">
              <legend>
                {k + 1} · {c.tribunal}, Rol N° {c.rol}-{c.era}, {c.fecha}
              </legend>
              <p>{c.resumen}</p>
              <div className="v-semaforo__opciones">
                {MARCAS.map(([valor, rotulo]) => (
                  <label key={valor} className="v-semaforo__opcion" data-color={valor}>
                    <input type="radio" name={`semaforo-${LECCION}-${c.id}`} checked={semaforo[c.id] === valor} onChange={() => marcarSemaforo(LECCION, c.id, valor)} />
                    <span>{rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <p className="v-semaforo__pista mono">«{RESPUESTA_IA_C3_U3.remate}» · la IA no duda</p>
        </div>
      );
    case 'buscador':
      return (
        <div className="v-ficha">
          <p className="v-ficha__fuente mono">Buscador de jurisprudencia · Poder Judicial · Corte Suprema (recreación)</p>
          <p className="v-buscador__campos mono">
            <span>Rol: 4961</span> <span>Era: 2019</span> <span className="v-buscador__boton">Buscar</span>
          </p>
          <dl>
            <div>
              <dt>Rol</dt>
              <dd>4961-2019</dd>
            </div>
            <div>
              <dt>Fecha</dt>
              <dd>19-04-2021</dd>
            </div>
            <div>
              <dt>Sala</dt>
              <dd>Primera</dd>
            </div>
          </dl>
          <p className="v-ficha__transitorio">
            <span className="mono">Extracto</span> «…las palabras de la ley se entenderán en su sentido natural y obvio según el uso general de
            las mismas palabras…»
          </p>
          <p className="etiqueta" data-tono="verificada">
            Cita 1: existe y dice eso
          </p>
        </div>
      );
    case 'fallas':
      return (
        <ul className="v-decisiones">
          <li data-color="rojo">
            <strong>No existe</strong> no aparece en ningún tribunal
          </li>
          <li data-color="amarillo">
            <strong>Dato cambiado</strong> otra fecha, otra sala, otro año
          </li>
          <li data-color="rojo">
            <strong>No dice eso</strong> existe, pero resuelve otra cosa
          </li>
          <li className="v-decisiones__anota mono">comprueba: existe · rol, tribunal y fecha · lo que dice</li>
        </ul>
      );
    case 'porque':
      return (
        <div className="v-fuentes v-fuentes--dos">
          <div className="v-fuentes__col">
            <p className="rotulo">Un asistente de IA</p>
            <p className="v-fuentes__donde">Arma la forma</p>
            <p className="v-fuentes__que">Número, sala y fecha probables. Sin base de fallos detrás.</p>
          </div>
          <div className="v-fuentes__col">
            <p className="rotulo">El buscador del Poder Judicial</p>
            <p className="v-fuentes__donde">Busca entre fallos que existen</p>
            <p className="v-fuentes__que">Más de 1.500.000 resoluciones, también con IA.</p>
          </div>
        </div>
      );
    case 'protocolo':
      return (
        <ol className="v-ciclo v-ciclo--cinco">
          {(['Preguntar', 'Descubrir', 'Localizar la fuente', 'Verificar', 'Citar'] as const).map((paso, k) => (
            <li key={paso}>
              <span className="mono">{String(k + 1).padStart(2, '0')}</span>
              <strong>{paso}</strong>
            </li>
          ))}
        </ol>
      );
    case 'cierre':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Ninguna cita sin su enlace oficial.</p>
          <p className="v-regla__chica">La práctica: busca las citas 2 y 3 · la revelación: en la evaluación</p>
        </div>
      );
  }
}
