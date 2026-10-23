'use client';

import type { TramoC0 } from '@/content/lecciones/c0-comun';
import { GUION_C0_U1 } from '@/content/lecciones/c0-u1-guion';
import { GUION_C0_U2 } from '@/content/lecciones/c0-u2-guion';
import { GUION_C0_U3 } from '@/content/lecciones/c0-u3-guion';
import { GUION_C0_U4 } from '@/content/lecciones/c0-u4-guion';
import { PresentacionEva, type PropsVisual } from './PresentacionEva';

/**
 * «EVA presenta» del Curso 0: cuatro recreaciones (una por unidad) que comparten los visuales. Ninguna tiene
 * semáforo: el Curso 0 no esconde un error, explica un concepto.
 */
function presentacion(leccionId: string, unidad: string, guion: TramoC0[]) {
  return function PresentacionC0() {
    return (
      <PresentacionEva
        leccionId={leccionId}
        guion={guion}
        Visual={Visual}
        semaforos={[]}
        etiqueta={`Recreación del guion · unidad ${unidad}`}
        descripcion={`EVA presenta la unidad ${unidad}`}
      />
    );
  };
}

export const PresentacionC0U1 = presentacion('c0-u1', '0.1', GUION_C0_U1);
export const PresentacionC0U2 = presentacion('c0-u2', '0.2', GUION_C0_U2);
export const PresentacionC0U3 = presentacion('c0-u3', '0.3', GUION_C0_U3);
export const PresentacionC0U4 = presentacion('c0-u4', '0.4', GUION_C0_U4);

function Cifra({ numero, pie, antes, despues }: { numero: string; pie: string; antes: string; despues: string }) {
  return (
    <div className="v-cifra">
      <p className="v-cifra__numero">{numero}</p>
      <p className="v-cifra__pie mono">{pie}</p>
      <p className="v-cifra__giro">
        <s>{antes}</s> <span>→ {despues}</span>
      </p>
    </div>
  );
}

function Regla({ grande, chica }: { grande: string; chica: string }) {
  return (
    <div className="v-regla">
      <p className="v-regla__grande">{grande}</p>
      <p className="v-regla__chica">{chica}</p>
    </div>
  );
}

function Visual({ tramo }: PropsVisual<TramoC0>) {
  switch (tramo.visual) {
    case 'tres-programas':
      return (
        <ul className="v-tres">
          {(
            [
              ['Ordena expedientes por fecha', 'regla'],
              ['Recomienda a qué caso dedicar horas', 'infiere'],
              ['Redacta un recurso', 'infiere'],
            ] as const
          ).map(([t, tipo]) => (
            <li key={t} data-tipo={tipo}>
              <span>{t}</span>
              <span className="mono">{tipo === 'regla' ? '¿software?' : '¿IA?'}</span>
            </li>
          ))}
        </ul>
      );
    case 'definicion':
      return (
        <p className="v-definicion">
          un sistema basado en máquinas que, para objetivos explícitos o implícitos, <mark>infiere</mark>, de la entrada que recibe,
          cómo generar <em>predicciones, contenidos, recomendaciones o decisiones</em> que pueden influir en entornos físicos o
          virtuales
          <span className="mono v-definicion__pie">OCDE 2023 · UE 2024 (ley) · Chile 2024 (proyecto)</span>
        </p>
      );
    case 'frontera':
      return (
        <div className="v-frontera">
          <div>
            <p className="rotulo">Fuera</p>
            <p>Reglas escritas por una persona</p>
            <p className="mono">«si la fecha es anterior, va primero»</p>
          </div>
          <div data-lado="dentro">
            <p className="rotulo">Dentro</p>
            <p>Infiere de datos lo que nadie escribió</p>
            <p className="mono">miles de casos → una recomendación</p>
          </div>
        </div>
      );
    case 'cadena':
      return (
        <ol className="v-cadena">
          {['OCDE 2019', 'NIST 2023', 'OCDE 2023', 'UE 2024', 'Consejo de Europa 2024', 'Chile 2024'].map((p, k) => (
            <li key={p}>
              <span className="mono">{String(k + 1).padStart(2, '0')}</span> {p}
            </li>
          ))}
        </ol>
      );
    case 'dudas':
      return (
        <ol className="v-dudas">
          {['¿Se puede definir?', '¿Entiende?', '¿Razona?', '¿Qué es la AGI?', 'La frontera dentada'].map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      );
    case 'empate':
      return (
        <Cifra
          numero="51 / 49"
          pie="480 investigadores · ¿puede entender un modelo entrenado sólo con texto? · Mitchell y Krakauer, 2022"
          antes="faltan datos"
          despues="no acuerdan la prueba"
        />
      );
    case 'cifra-pista':
      return (
        <Cifra numero="25 %" pie="de las veces el modelo menciona la pista que recibió · Anthropic, 2025" antes="lo que dice que hizo" despues="≠ lo que hizo" />
      );
    case 'poderes':
      return (
        <div className="v-frontera v-frontera--tres">
          <div>
            <p className="rotulo">Por capacidades</p>
            <p>DeepMind: cinco niveles</p>
          </div>
          <div>
            <p className="rotulo">Por eficiencia</p>
            <p>Chollet: aprender con pocos ejemplos</p>
          </div>
          <div data-lado="dentro">
            <p className="rotulo">Por contrato</p>
            <p>Microsoft–OpenAI: un panel verifica y mueve derechos</p>
          </div>
        </div>
      );
    case 'dentada':
      return (
        <Cifra
          numero="50,1 %"
          pie="relojes analógicos leídos bien · el mismo año: oro en la olimpiada de matemática · Stanford, 2026"
          antes="aprobó el examen"
          despues="¿acierta en tu caso?"
        />
      );
    case 'agente':
      return (
        <div className="v-agente">
          <span>percibe</span>
          <span aria-hidden="true">→</span>
          <span className="v-agente__centro">agente</span>
          <span aria-hidden="true">→</span>
          <span>actúa</span>
          <p className="mono v-agente__pie">racional si cabe esperar que logre el objetivo · Russell y Norvig</p>
        </div>
      );
    case 'trabajo':
      return (
        <p className="v-definicion">
          la capacidad de un sistema para <mark>lograr objetivos</mark> en una <mark>gama amplia de situaciones</mark>, adquirida a partir de{' '}
          <mark>datos y cómputo</mark>, y juzgada por su <mark>desempeño medible</mark>
          <span className="mono v-definicion__pie">acciones, que se ven · no mente, que no se ve</span>
        </p>
      );
    case 'concesiones':
      return (
        <ol className="v-dudas v-dudas--seis">
          {['Conducta, no experiencia', 'Relativa a la métrica', 'Las pruebas no predicen', 'No sabemos si entienden', '«Sabe» es metáfora', 'La vara se mueve'].map(
            (d) => (
              <li key={d}>{d}</li>
            ),
          )}
        </ol>
      );
    case 'categorias':
      return <Regla grande="«Sabe», «decide», «intención»: categorías jurídicas." chica="El sistema no las cumple por el solo hecho de describirlo así" />;
    case 'palabra':
      return (
        <div className="v-palabra">
          <p className="v-palabra__grande">inteligencia</p>
          <p className="mono">inter + legere · escoger entre</p>
          <p className="mono">intus legere · leer dentro</p>
        </div>
      );
    case 'linea':
      return (
        <div className="v-frontera">
          <div>
            <p className="rotulo">intellectus</p>
            <p>captar la verdad de golpe</p>
            <p className="mono">reposo</p>
          </div>
          <div data-lado="dentro">
            <p className="rotulo">ratio</p>
            <p>avanzar paso a paso</p>
            <p className="mono">movimiento · lo que la IA imita</p>
          </div>
        </div>
      );
    case 'cifra-1927':
      return <Cifra numero="1927" pie="Buck v. Bell, 274 U.S. 200 · «Three generations of imbeciles are enough.»" antes="una cifra de inteligencia" despues="una ley" />;
    case 'niveles':
      return (
        <ul className="v-niveles">
          <li>
            <span className="rotulo">Jueces</span>
            <strong>Acta 244-2025, art. 17</strong>
            <span>«La decisión judicial es siempre una tarea humana y su responsabilidad es indelegable.»</span>
          </li>
          <li>
            <span className="rotulo">Abogados</span>
            <strong>Rol 23.322-2025</strong>
            <span>La buena fe es el deber de verificar lo que se aporta al tribunal.</span>
          </li>
          <li>
            <span className="rotulo">Personas</span>
            <strong>Ley 21.719, art. 8 bis</strong>
            <span>Derecho a oponerse a una decisión únicamente automatizada y a pedir intervención humana.</span>
          </li>
        </ul>
      );
    case 'regla':
      return <Regla grande="La IA actúa. No decide ni verifica." chica="Eso lo haces tú" />;
    case 'cierre':
      return <Regla grande="¿Infiere, o aplica reglas?" chica="La práctica: cinco programas, dentro o fuera" />;
    case 'cierre-u3':
      return <Regla grande="Con las seis concesiones, resiste. Sin ellas, es publicidad." chica="La práctica: seis situaciones, seis concesiones" />;
  }
}
