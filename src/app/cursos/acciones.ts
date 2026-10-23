'use server';

import type { ResultadoEvaluacion } from '@/content/evaluaciones/tipos';
import { calificar, ganaOjoClinico, limpiarEnvio } from '@/lib/evaluacion/calificar';
import { obtenerEvaluacionConClave } from '@/lib/evaluacion/claves.server';
import { clienteServidor } from '@/lib/supabase/servidor';

/**
 * Corrige una evaluación en el servidor. La clave nunca llega al navegador: sólo vuelve el resultado, con la
 * retroalimentación de cada pregunta.
 *   · Con sesión de Supabase: corrige la función SQL `enviar_evaluacion` (guarda el intento y el avance con RLS).
 *   · Sin sesión o en modo demostración: corrige `calificar` con la misma clave; el navegador guarda el avance.
 */
export async function enviarEvaluacion(evaluacionId: string, bruto: unknown): Promise<ResultadoEvaluacion | { error: string }> {
  const datos = obtenerEvaluacionConClave(evaluacionId);
  if (!datos) return { error: 'Esa evaluación no existe.' };
  const { evaluacion, clave, ojo } = datos;
  const envio = limpiarEnvio(
    bruto,
    evaluacion.preguntas.map((p) => p.n),
  );
  if (!envio) return { error: 'Responde todas las preguntas y marca qué tan seguro estás en cada una.' };

  const supabase = await clienteServidor();
  if (supabase) {
    const { data: sesion } = await supabase.auth.getClaims();
    if (sesion?.claims?.sub) {
      const { data, error } = await supabase.rpc('enviar_evaluacion', {
        p_evaluacion: evaluacionId,
        p_respuestas: { ...envio.respuestas, ...(envio.semaforo ? { semaforo: envio.semaforo } : {}) },
      });
      if (error) return { error: error.message.includes('Demasiados') ? 'Demasiados intentos por hoy; vuelve mañana.' : 'No se pudo guardar el intento.' };
      const r = data as { correctas: number; total: number; dominio: boolean; detalle: { pregunta: number; correcta: boolean; opcion_correcta: string }[] };
      const detalle = r.detalle.map((d) => ({
        pregunta: d.pregunta,
        correcta: d.correcta,
        opcionCorrecta: d.opcion_correcta,
        retro: clave[d.pregunta]?.retro ?? '',
        confianza: envio.respuestas[d.pregunta]?.confianza ?? null,
      }));
      return {
        correctas: r.correctas,
        total: r.total,
        dominio: r.dominio,
        guardado: 'cuenta',
        detalle,
        ojoClinico: !!ojo && ganaOjoClinico(envio, detalle, ojo),
      };
    }
  }

  const r = calificar(clave, envio, evaluacion.umbral);
  return { ...r, ojoClinico: !!ojo && ganaOjoClinico(envio, r.detalle, ojo), guardado: 'navegador' };
}
