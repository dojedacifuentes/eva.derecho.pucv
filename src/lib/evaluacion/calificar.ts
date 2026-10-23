import type { Clave, DetallePregunta, EnvioEvaluacion, ReglaOjoClinico } from '@/content/evaluaciones/tipos';

/**
 * Corrige un envío contra su clave. Es la misma regla que la función SQL `enviar_evaluacion`
 * (una prueba compara las dos): cuenta las preguntas de la clave cuya opción coincide.
 */
export function calificar(clave: Clave, envio: EnvioEvaluacion, umbral: number) {
  const numeros = Object.keys(clave)
    .map(Number)
    .sort((a, b) => a - b);
  const detalle: DetallePregunta[] = numeros.map((n) => {
    const respuesta = envio.respuestas[n];
    return {
      pregunta: n,
      correcta: respuesta?.opcion === clave[n].correcta,
      opcionCorrecta: clave[n].correcta,
      retro: clave[n].retro,
      confianza: respuesta?.confianza ?? null,
    };
  });
  const correctas = detalle.filter((d) => d.correcta).length;
  return { correctas, total: numeros.length, dominio: correctas >= umbral, detalle };
}

/** Calibración: cuántas veces dijo «seguro» y se equivocó (la «trampa de la fluidez»). */
export function segurosErrados(detalle: DetallePregunta[]) {
  return detalle.filter((d) => d.confianza === 'seguro' && !d.correcta).length;
}

/** Valida la forma del envío antes de corregirlo o guardarlo. Devuelve un envío limpio o null. */
export function limpiarEnvio(bruto: unknown, preguntas: number[]): EnvioEvaluacion | null {
  if (!bruto || typeof bruto !== 'object') return null;
  const { respuestas, semaforo } = bruto as Record<string, unknown>;
  if (!respuestas || typeof respuestas !== 'object') return null;
  const limpio: EnvioEvaluacion = { respuestas: {} };
  for (const n of preguntas) {
    const r = (respuestas as Record<string, unknown>)[n];
    if (!r || typeof r !== 'object') return null;
    const { opcion, confianza, pistas } = r as Record<string, unknown>;
    if (typeof opcion !== 'string' || !/^[a-z]{1,2}$/.test(opcion)) return null;
    if (confianza !== 'seguro' && confianza !== 'dudoso' && confianza !== 'no-se') return null;
    const usadas = typeof pistas === 'number' && Number.isInteger(pistas) && pistas >= 0 && pistas <= 5 ? pistas : 0;
    limpio.respuestas[n] = { opcion, confianza, pistas: usadas };
  }
  if (semaforo && typeof semaforo === 'object') {
    const s: Record<string, 'verde' | 'amarillo' | 'rojo'> = {};
    for (const [k, v] of Object.entries(semaforo)) {
      if (/^c[1-9]$/.test(k) && (v === 'verde' || v === 'amarillo' || v === 'rojo')) s[k] = v;
    }
    limpio.semaforo = s;
  }
  return limpio;
}

/**
 * Insignia «Ojo clínico»: encontró el error antes de la revelación. Marcó en rojo, en el semáforo de la presentación,
 * la cita o corrección errónea (y no las correctas), y acertó la pregunta que lo revela sin pedir pistas.
 */
export function ganaOjoClinico(envio: EnvioEvaluacion, detalle: DetallePregunta[], regla: ReglaOjoClinico) {
  const p = detalle.find((d) => d.pregunta === regla.pregunta);
  return (
    envio.semaforo?.[regla.rojo] === 'rojo' &&
    regla.noRojo.every((id) => envio.semaforo?.[id] !== 'rojo') &&
    !!p?.correcta &&
    (envio.respuestas[regla.pregunta]?.pistas ?? 0) === 0
  );
}
