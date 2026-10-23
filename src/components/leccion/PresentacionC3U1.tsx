'use client';

import { BORRADOR_C3_U1, GUION_C3_U1, type TramoC3U1 } from '@/content/lecciones/c3-u1-guion';
import { marcarSemaforo } from '@/lib/progreso/semaforo';
import { PresentacionEva, type PropsVisual } from './PresentacionEva';

const LECCION = 'c3-u1';
const IDS = BORRADOR_C3_U1.citas.map((c) => c.id);

/** Presentación de la unidad 3.1 «Verificar antes de firmar». */
export function PresentacionC3U1() {
  return (
    <PresentacionEva
      leccionId={LECCION}
      guion={GUION_C3_U1}
      Visual={Visual}
      semaforos={IDS}
      etiqueta="Recreación del guion · videocápsula 3.1"
      descripcion="EVA presenta la unidad 3.1"
    />
  );
}

/** El borrador como documento: encabezado, citas numeradas y cierre. */
function Borrador({ resaltar = false }: { resaltar?: boolean }) {
  return (
    <div className="v-borrador">
      <p className="v-borrador__rotulo mono">{BORRADOR_C3_U1.encabezado}</p>
      <p>{BORRADOR_C3_U1.introduccion}</p>
      <ol>
        {BORRADOR_C3_U1.citas.map((c) => (
          <li key={c.id} data-resaltar={resaltar ? 'si' : undefined}>
            <span className="v-borrador__tipo mono">{c.tipo}</span>
            {c.texto}
          </li>
        ))}
      </ol>
      <p>{BORRADOR_C3_U1.cierre}</p>
    </div>
  );
}

const DECISIONES = [
  ['verde', 'Aceptar'],
  ['amarillo', 'Revisar'],
  ['rojo', 'Rechazar'],
] as const;

function Visual({ tramo, semaforo }: PropsVisual<TramoC3U1>) {
  switch (tramo.visual) {
    case 'caso':
      return (
        <div className="v-caso">
          <p className="v-caso__rol mono">Corte Suprema · Tercera Sala · Rol 23.322-2025 · 22-04-2026</p>
          <p className="v-caso__sancion">
            Suspensión <span>1 mes</span> + multa <span>5 UTM</span>
          </p>
          <ul className="v-caso__obras">
            <li>
              «Tratado de Protección al Consumidor, 2023» <span className="v-caso__sello mono">no existe</span>
            </li>
            <li>
              «Responsabilidad Civil y Consumo, 2021» <span className="v-caso__sello mono">no existe</span>
            </li>
          </ul>
          <p className="v-caso__pie mono">Las obras, según la noticia oficial del Poder Judicial (03-06-2026)</p>
        </div>
      );
    case 'deber':
      return (
        <figure className="v-deber">
          <blockquote>
            «La buena fe se traduce en el deber que tiene la parte en orden a <mark>verificar la efectividad de la información</mark>{' '}
            que aporta al tribunal, lo que no hizo.»
          </blockquote>
          <figcaption className="mono">Corte Suprema, rol 23.322-2025, considerando 4°</figcaption>
        </figure>
      );
    case 'borrador':
      return <Borrador resaltar />;
    case 'semaforo':
      return (
        <div className="v-semaforo">
          <p className="rotulo rotulo--acento">Decide antes de verificar</p>
          {BORRADOR_C3_U1.citas.map((c, k) => (
            <fieldset key={c.id} className="v-semaforo__tarjeta">
              <legend>
                Cita {k + 1} · {c.tipo}
              </legend>
              <p>{c.texto}</p>
              <div className="v-semaforo__opciones">
                {DECISIONES.map(([valor, rotulo]) => (
                  <label key={valor} className="v-semaforo__opcion" data-color={valor}>
                    <input type="radio" name={`semaforo-${LECCION}-${c.id}`} checked={semaforo[c.id] === valor} onChange={() => marcarSemaforo(LECCION, c.id, valor)} />
                    <span>{rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      );
    case 'fuentes':
      return (
        <div className="v-fuentes">
          {(
            [
              ['Normas', 'LeyChile', 'Texto vigente, palabra por palabra'],
              ['Sentencias', 'Buscador del Poder Judicial', 'Rol, año, sala, fecha y pasaje'],
              ['Doctrina', 'Catálogo de la biblioteca → el libro', 'Que exista no prueba que diga eso'],
            ] as const
          ).map(([tipo, donde, que]) => (
            <div key={tipo} className="v-fuentes__col">
              <p className="rotulo">{tipo}</p>
              <p className="v-fuentes__donde">{donde}</p>
              <p className="v-fuentes__que">{que}</p>
            </div>
          ))}
        </div>
      );
    case 'decisiones':
      return (
        <ul className="v-decisiones">
          <li data-color="verde">
            <strong>Aceptar</strong> existe y dice eso
          </li>
          <li data-color="amarillo">
            <strong>Revisar</strong> existe, pero algo no calza
          </li>
          <li data-color="rojo">
            <strong>Rechazar</strong> no existe o dice otra cosa
          </li>
          <li className="v-decisiones__anota mono">+ anota dónde la verificaste</li>
        </ul>
      );
    case 'regla':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Si no la leíste en la fuente, no la firmes.</p>
          <p className="v-regla__chica">Otra IA no verifica por ti.</p>
        </div>
      );
    case 'cierre':
      return (
        <div className="v-regla">
          <p className="v-regla__grande">Cuatro citas. Cuatro fuentes. Una contradice la ley.</p>
          <p className="v-regla__chica">La práctica: audita el borrador · la revelación: en la evaluación</p>
        </div>
      );
  }
}
