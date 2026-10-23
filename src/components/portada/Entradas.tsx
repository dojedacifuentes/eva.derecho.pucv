'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { EvaEscribe } from '@/components/eva/EvaEscribe';
import { actualizarAvanceLocal, elegirEntrada, type Entrada } from '@/lib/progreso/local';
import { marcarPaso } from '@/lib/progreso/modelo';

const LECCION_1 = '/cursos/comprender-la-ia/que-es-la-ia';

const RESPUESTA_CALIBRACION: Record<number, string> = {
  1: 'Desconfías mucho. Bien: en la lección 1 te enseño a comprobar, no sólo a desconfiar.',
  2: 'Desconfías. Bien: en la lección 1 te enseño a comprobar, no sólo a desconfiar.',
  3: 'Dudas razonables. Vamos a convertirlas en un método: dónde mirar y cómo citar.',
  4: 'Bastante confianza. En la lección 1 te muestro una corrección que suena perfecta y está mal. A ver si la encuentras.',
  5: 'Confianza total. Interesante. En la lección 1 escondí una corrección que suena perfecta y está mal. A ver si la encuentras.',
};

const OPCIONES_DOCENTE = [
  {
    id: 'probar',
    texto: 'Probar la lección piloto como estudiante',
    respuesta: 'Buena idea: hazla tú primero. Toma 25 minutos y tiene un error escondido. Tu avance no se mezcla con el de nadie.',
    href: LECCION_1,
    cta: 'Abrir la lección 1',
  },
  {
    id: 'clase',
    texto: 'Ver cómo usarla en mi clase',
    respuesta: 'Te dejo la guía: antes, durante y después de la clase, qué revisar del contenido jurídico y la pauta de cotejo.',
    href: '/docentes',
    cta: 'Ir a la guía docente',
  },
  {
    id: 'seccion',
    texto: 'Ver el avance de una sección',
    respuesta: 'En este prototipo te muestro una sección con datos ficticios. Con cuentas activas, verías sólo a tus estudiantes.',
    href: '/docente',
    cta: 'Ver la sección de demostración',
  },
] as const;

/**
 * Las dos entradas de la portada. No piden cuenta: se elige y EVA abre la primera interacción.
 * La respuesta del estudiante es real: queda como la calibración inicial de la lección 1.
 */
export function Entradas() {
  const [entrada, setEntrada] = useState<Entrada | null>(null);
  const [calibracion, setCalibracion] = useState<number | null>(null);
  const [opcion, setOpcion] = useState<(typeof OPCIONES_DOCENTE)[number] | null>(null);
  const [listo, setListo] = useState(false);

  const elegir = (e: Entrada) => {
    setEntrada(e);
    setCalibracion(null);
    setOpcion(null);
    setListo(false);
    elegirEntrada(e);
  };

  const calibrar = (n: number) => {
    setCalibracion(n);
    setListo(false);
    actualizarAvanceLocal('c1-u1', (a) => marcarPaso(a, 'entrada', n));
  };

  return (
    <div className="entradas">
      <div className="entradas__puertas" role="group" aria-label="¿Cómo entras?">
        {(['estudiante', 'docente'] as const).map((e, i) => (
          <button
            key={e}
            type="button"
            className="puerta"
            aria-pressed={entrada === e}
            onClick={() => elegir(e)}
            data-aparece
            style={{ '--i': i + 3 } as React.CSSProperties}
          >
            {e === 'estudiante' ? 'Soy estudiante' : 'Soy docente'}
            <span className="puerta__flecha" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
      <p className="entradas__nota mono">Sin cuenta. Sólo eliges.</p>

      {entrada && (
        <section className="consola-entrada vidrio luz-superior barrido" aria-live="polite" aria-label="EVA te responde">
          <div className="barra-panel">
            <span className="punto-vivo">EVA · {entrada === 'estudiante' ? 'entrada estudiante' : 'entrada docente'}</span>
            <span>en línea</span>
          </div>
          <div className="consola-entrada__cuerpo">
            <Image src="/eva/eva-avatar.webp" alt="" width={56} height={56} className="consola-entrada__avatar" />
            <div className="consola-entrada__dialogo">
              {entrada === 'estudiante' ? (
                <>
                  <EvaEscribe
                    key="pregunta-estudiante"
                    className="consola-entrada__eva"
                    texto="Pregunta rápida antes de empezar. Si una IA corrige tu respuesta de un examen de Derecho, ¿qué tan seguro estás de que su corrección es correcta?"
                  />
                  <div className="escala" role="group" aria-label="Del 1 (nada seguro) al 5 (totalmente seguro)">
                    <span className="escala__extremo mono">nada</span>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" className="escala__punto" aria-pressed={calibracion === n} onClick={() => calibrar(n)}>
                        {n}
                      </button>
                    ))}
                    <span className="escala__extremo mono">total</span>
                  </div>
                  {calibracion && (
                    <>
                      <EvaEscribe
                        key={`r${calibracion}`}
                        className="consola-entrada__eva consola-entrada__eva--respuesta"
                        texto={RESPUESTA_CALIBRACION[calibracion]}
                        alTerminar={() => setListo(true)}
                      />
                      <div className={`consola-entrada__acciones ${listo ? 'es-visible' : ''}`}>
                        <Link className="boton boton--primario" href={LECCION_1}>
                          Entrar a la lección 1 →
                        </Link>
                        <Link className="boton" href="/cursos">
                          Ver los 4 cursos
                        </Link>
                      </div>
                      <p className="consola-entrada__guardado mono">Tu respuesta quedó guardada en este navegador; la retomo al final de la lección.</p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <EvaEscribe key="pregunta-docente" className="consola-entrada__eva" texto="Bienvenida, bienvenido. ¿Qué quieres hacer primero?" />
                  <div className="opciones-docente">
                    {OPCIONES_DOCENTE.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        className="opcion-docente"
                        aria-pressed={opcion?.id === o.id}
                        onClick={() => {
                          setOpcion(o);
                          setListo(false);
                        }}
                      >
                        {o.texto}
                      </button>
                    ))}
                  </div>
                  {opcion && (
                    <>
                      <EvaEscribe
                        key={opcion.id}
                        className="consola-entrada__eva consola-entrada__eva--respuesta"
                        texto={opcion.respuesta}
                        alTerminar={() => setListo(true)}
                      />
                      <div className={`consola-entrada__acciones ${listo ? 'es-visible' : ''}`}>
                        <Link className="boton boton--primario" href={opcion.href}>
                          {opcion.cta} →
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
