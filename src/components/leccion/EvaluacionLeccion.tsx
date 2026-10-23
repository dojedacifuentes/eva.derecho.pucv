'use client';

import { useState, useTransition } from 'react';
import { enviarEvaluacion } from '@/app/cursos/acciones';
import type { Confianza, Evaluacion, ResultadoEvaluacion } from '@/content/evaluaciones/tipos';
import { segurosErrados } from '@/lib/evaluacion/calificar';
import { useSemaforo } from '@/lib/progreso/semaforo';
import { useAvance } from './usarAvance';

const CONFIANZAS: { valor: Confianza; texto: string }[] = [
  { valor: 'seguro', texto: 'Seguro' },
  { valor: 'dudoso', texto: 'Dudo' },
  { valor: 'no-se', texto: 'No sé' },
];

/**
 * Evaluación: cada pregunta pide la respuesta y qué tan seguro estás. Se corrige en el servidor (la clave nunca llega
 * al navegador) y vuelve la retroalimentación, comparando confianza con acierto. La pregunta 4 revela el error de la
 * presentación y tiene pistas progresivas (no restan puntos, pero sí cuentan para «Ojo clínico»).
 */
export function EvaluacionLeccion({ evaluacion }: { evaluacion: Evaluacion }) {
  const { evaluar } = useAvance(evaluacion.leccionId);
  const semaforo = useSemaforo(evaluacion.leccionId);
  const [opciones, setOpciones] = useState<Record<number, string>>({});
  const [confianzas, setConfianzas] = useState<Record<number, Confianza>>({});
  const [pistas, setPistas] = useState<Record<number, number>>({});
  const [resultado, setResultado] = useState<ResultadoEvaluacion | null>(null);
  const [error, setError] = useState('');
  const [enviando, iniciar] = useTransition();

  const completo = evaluacion.preguntas.every((p) => opciones[p.n] && confianzas[p.n]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!completo) {
      setError('Falta responder alguna pregunta o marcar qué tan seguro estás.');
      return;
    }
    const envio = {
      respuestas: Object.fromEntries(
        evaluacion.preguntas.map((p) => [p.n, { opcion: opciones[p.n], confianza: confianzas[p.n], pistas: pistas[p.n] ?? 0 }]),
      ),
      semaforo,
    };
    iniciar(async () => {
      const r = await enviarEvaluacion(evaluacion.id, envio);
      if ('error' in r) {
        setError(r.error);
        return;
      }
      setResultado(r);
      evaluar(r, r.ojoClinico);
      document.getElementById('resultado-evaluacion')?.focus();
    });
  };

  const reintentar = () => {
    setResultado(null);
    setOpciones({});
    setConfianzas({});
    setPistas({});
  };

  if (resultado) {
    const errados = segurosErrados(resultado.detalle);
    const ojo = resultado.ojoClinico;
    return (
      <div className="resultado" id="resultado-evaluacion" tabIndex={-1}>
        <div className="resultado__cabeza panel">
          <p className="resultado__cifra">
            {resultado.correctas}/{resultado.total}
          </p>
          <div>
            <p className="resultado__titulo">{resultado.dominio ? 'Dominio logrado.' : `Te faltan ${evaluacion.umbral - resultado.correctas} para el dominio (${evaluacion.umbral} de ${resultado.total}).`}</p>
            <p className="resultado__calibracion">
              {errados === 0
                ? 'Ninguna respuesta «segura» estuvo equivocada: tu confianza y tu acierto van juntos.'
                : `Estuviste seguro y te equivocaste en ${errados} ${errados === 1 ? 'pregunta' : 'preguntas'}: esa es la trampa de la fluidez. Ahí está lo que conviene repasar.`}
            </p>
            {ojo && <p className="etiqueta" data-tono="verificada">Insignia: Ojo clínico · encontraste el error antes de la revelación</p>}
            <p className="resultado__guardado mono">{resultado.guardado === 'cuenta' ? 'Guardado en tu cuenta.' : 'Guardado en este navegador.'}</p>
          </div>
        </div>
        <ol className="resultado__lista">
          {evaluacion.preguntas.map((p) => {
            const d = resultado.detalle.find((x) => x.pregunta === p.n)!;
            const correcta = p.opciones.find((o) => o.id === d.opcionCorrecta);
            return (
              <li key={p.n} className="resultado__item" data-correcta={d.correcta ? 'si' : 'no'}>
                <p className="resultado__enunciado">
                  <span className="mono">{p.n}.</span> {p.enunciado}
                </p>
                <p className="resultado__veredicto">
                  {d.correcta ? '✓ Correcta' : `✗ La respuesta era: ${correcta?.texto}`}
                  {d.confianza === 'seguro' && !d.correcta && <span className="resultado__fluidez"> · estabas seguro</span>}
                </p>
                <p className="resultado__retro">{d.retro}</p>
              </li>
            );
          })}
        </ol>
        <button type="button" className="boton" onClick={reintentar}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <form className="evaluacion" onSubmit={enviar} noValidate>
      {evaluacion.preguntas.map((p) => (
        <fieldset key={p.n} className="pregunta panel">
          <legend className="pregunta__enunciado">
            <span className="mono">{p.n}.</span> {p.enunciado}
          </legend>
          <div className="pregunta__opciones">
            {p.opciones.map((o) => (
              <label key={o.id} className="pregunta__opcion">
                <input type="radio" name={`p${p.n}`} value={o.id} checked={opciones[p.n] === o.id} onChange={() => setOpciones((v) => ({ ...v, [p.n]: o.id }))} />
                <span>{o.texto}</span>
              </label>
            ))}
          </div>
          <div className="pregunta__confianza" role="radiogroup" aria-label={`¿Qué tan seguro estás de la pregunta ${p.n}?`}>
            <span className="mono">¿Qué tan seguro estás?</span>
            {CONFIANZAS.map((c) => (
              <label key={c.valor} className="pregunta__chip">
                <input type="radio" name={`c${p.n}`} checked={confianzas[p.n] === c.valor} onChange={() => setConfianzas((v) => ({ ...v, [p.n]: c.valor }))} />
                <span>{c.texto}</span>
              </label>
            ))}
          </div>
          {p.pistas && (
            <div className="pregunta__pistas">
              {(pistas[p.n] ?? 0) < p.pistas.length && (
                <button type="button" className="boton" onClick={() => setPistas((v) => ({ ...v, [p.n]: (v[p.n] ?? 0) + 1 }))}>
                  Pedir una pista ({(pistas[p.n] ?? 0) + 1} de {p.pistas.length})
                </button>
              )}
              <ol aria-live="polite">
                {p.pistas.slice(0, pistas[p.n] ?? 0).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
          )}
        </fieldset>
      ))}
      <div className="evaluacion__pie">
        <button type="submit" className="boton boton--primario" disabled={enviando}>
          {enviando ? 'Corrigiendo…' : 'Enviar respuestas'}
        </button>
        <p className="evaluacion__error" role="alert">
          {error}
        </p>
      </div>
    </form>
  );
}
