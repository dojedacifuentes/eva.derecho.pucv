/**
 * «Antes de subir»: decide, con reglas fijas y explicables (no con IA), si un documento puede pegarse en un
 * asistente de IA. Se calcula en el navegador: el documento nunca se sube a ninguna parte; sólo se responden
 * preguntas sobre él. Criterio pendiente de revisión jurídica (protección de datos, secreto profesional,
 * propiedad intelectual y reglamento de la Escuela).
 */

export type Plan = 'gratis' | 'pago-personal' | 'institucional';

export interface Respuestas {
  /** Nombres, RUT, correos, direcciones o cualquier dato que identifique a una persona. */
  datosPersonales: boolean;
  /** Salud, vida sexual, origen étnico, creencias, antecedentes penales o datos de niños, niñas y adolescentes. */
  datosSensibles: boolean;
  /** Información de un cliente, de una causa no pública o protegida por secreto profesional. */
  confidencial: boolean;
  /** Un manual, libro o artículo de otra persona (obra protegida). */
  obraAjena: boolean;
  /** Apuntes o trabajos de otra persona, sin su permiso. */
  deOtroSinPermiso: boolean;
  /** Tu profesor autorizó expresamente usar este material con IA. */
  autorizadoPorDocente: boolean;
  plan: Plan;
}

export type Nivel = 'verde' | 'ambar' | 'rojo';

export interface Veredicto {
  nivel: Nivel;
  titulo: string;
  motivos: string[];
  queHacer: string[];
}

export const RESPUESTAS_INICIALES: Respuestas = {
  datosPersonales: false,
  datosSensibles: false,
  confidencial: false,
  obraAjena: false,
  deOtroSinPermiso: false,
  autorizadoPorDocente: false,
  plan: 'gratis',
};

export function clasificar(r: Respuestas): Veredicto {
  const rojos: string[] = [];
  const ambar: string[] = [];
  const queHacer: string[] = [];

  if (r.confidencial) {
    rojos.push('Es confidencial o está protegido por secreto profesional: no sale de los canales autorizados.');
    queHacer.push('No lo subas. Si necesitas ayuda, describe el problema en abstracto, sin hechos que lo identifiquen.');
  }
  if (r.datosSensibles) {
    rojos.push('Tiene datos sensibles o de niños, niñas y adolescentes.');
    queHacer.push('No lo subas, ni siquiera anonimizado a medias: un dato sensible basta para identificar.');
  }
  if (r.datosPersonales && !r.datosSensibles) {
    if (r.plan === 'institucional') {
      ambar.push('Tiene datos personales. Un plan institucional puede tener garantías por contrato, pero hay que confirmarlas.');
      queHacer.push('Confirma con la Escuela qué permite el contrato y, aun así, sube sólo lo necesario.');
    } else {
      rojos.push('Tiene datos personales y el plan no garantiza por contrato cómo se tratan.');
      queHacer.push('Anonimiza antes: reemplaza nombres, RUT, correos y direcciones por «Persona A», «[RUT]», etc.');
    }
  }
  if (r.obraAjena && !r.autorizadoPorDocente) {
    ambar.push('Es una obra protegida (manual, libro, artículo).');
    queHacer.push('Usa un extracto breve que vayas a citar, o tus propias notas sobre la obra, no el texto completo.');
  }
  if (r.deOtroSinPermiso) {
    rojos.push('Es material de otra persona sin su permiso.');
    queHacer.push('Pide permiso o trabaja con tus propios apuntes.');
  }
  if (r.plan === 'gratis' && rojos.length === 0 && ambar.length === 0) {
    queHacer.push('En los planes gratuitos, revisa en la configuración si tus conversaciones se usan para entrenar y desactívalo si puedes.');
  }

  if (rojos.length > 0) {
    return { nivel: 'rojo', titulo: 'No lo subas así.', motivos: [...rojos, ...ambar], queHacer };
  }
  if (ambar.length > 0) {
    return { nivel: 'ambar', titulo: 'Con cuidado: ajústalo antes.', motivos: ambar, queHacer };
  }
  return {
    nivel: 'verde',
    titulo: 'Puedes subirlo.',
    motivos: [
      r.autorizadoPorDocente
        ? 'Tu profesor lo autorizó y no tiene datos de personas ni información confidencial.'
        : 'No tiene datos de personas, no es confidencial y es tuyo o es público (leyes, sentencias publicadas).',
    ],
    queHacer: [...queHacer, 'Igual verifica lo que la IA responda: subirlo bien no hace correcta la respuesta.'],
  };
}
