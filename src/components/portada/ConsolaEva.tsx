'use client';

import { useState } from 'react';
import { EvaEscribe } from '@/components/eva/EvaEscribe';

/*
 * «Hablar con EVA»: una consola de terminal con preguntas y respuestas ESCRITAS POR EL EQUIPO.
 * No es un chat con IA y lo dice. Las respuestas no afirman datos sin fuente.
 */
const PREGUNTAS = [
  {
    p: '¿Eres una IA?',
    r: 'Sí. Mi cara y mi voz fueron generadas con herramientas de IA, y mis textos los revisa una persona. Por eso no te pido que me creas: te pido que verifiques.',
  },
  {
    p: '¿Cómo sé si un video es un deepfake?',
    r: 'Mirar con atención ayuda poco: la nitidez no es prueba. Pregunta de dónde viene, quién lo publicó primero y si otra fuente independiente lo confirma. En Derecho, una imagen sin origen es un indicio, no un hecho.',
  },
  {
    p: '¿Puedo subir un fallo con nombres a un chat?',
    r: 'Antes de subir, clasifica: ¿es público, tiene datos de personas, es confidencial? Si tiene datos personales o viene de una clínica o una práctica, no lo subas sin anonimizar. La herramienta «Antes de subir» te guía en un minuto.',
  },
  {
    p: '¿Por dónde empiezo?',
    r: 'Por la lección 1 del curso 1: estudias la interpretación de la ley con una IA examinadora y descubres un error que escondí. Son unos 25 minutos.',
  },
] as const;

export function ConsolaEva() {
  const [i, setI] = useState<number | null>(null);
  return (
    <div className="consola">
      <div className="consola__barra mono">
        <span>EVA://terminal — derecho.pucv</span>
        <span className="consola__rec">● REC</span>
      </div>
      <div className="consola__cuerpo mono" aria-live="polite">
        <p className="consola__sistema">&gt; sesión abierta · respuestas escritas por el equipo, no es un chat con IA</p>
        {i !== null && (
          <>
            <p className="consola__usuario">&gt; {PREGUNTAS[i].p}</p>
            <EvaEscribe key={i} className="consola__eva" texto={PREGUNTAS[i].r} ms={12} />
          </>
        )}
        {i === null && <p className="consola__sistema">&gt; elige una pregunta_</p>}
      </div>
      <div className="consola__preguntas" role="group" aria-label="Preguntas para EVA">
        {PREGUNTAS.map((q, k) => (
          <button key={q.p} type="button" className="consola__pregunta mono" aria-pressed={i === k} onClick={() => setI(k)}>
            {q.p}
          </button>
        ))}
      </div>
    </div>
  );
}
