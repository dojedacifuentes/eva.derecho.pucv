import 'server-only';
import { CLAVE_C0_U1 } from '@/content/evaluaciones/c0-u1.clave.datos';
import { EVALUACION_C0_U1 } from '@/content/evaluaciones/c0-u1';
import { CLAVE_C0_U2 } from '@/content/evaluaciones/c0-u2.clave.datos';
import { EVALUACION_C0_U2 } from '@/content/evaluaciones/c0-u2';
import { CLAVE_C0_U3 } from '@/content/evaluaciones/c0-u3.clave.datos';
import { EVALUACION_C0_U3 } from '@/content/evaluaciones/c0-u3';
import { CLAVE_C0_U4 } from '@/content/evaluaciones/c0-u4.clave.datos';
import { EVALUACION_C0_U4 } from '@/content/evaluaciones/c0-u4';
import { CLAVE_C1_U1, OJO_C1_U1 } from '@/content/evaluaciones/c1-u1.clave.datos';
import { EVALUACION_C1_U1 } from '@/content/evaluaciones/c1-u1';
import { CLAVE_C3_U1, OJO_C3_U1 } from '@/content/evaluaciones/c3-u1.clave.datos';
import { EVALUACION_C3_U1 } from '@/content/evaluaciones/c3-u1';
import { CLAVE_C3_U2, OJO_C3_U2 } from '@/content/evaluaciones/c3-u2.clave.datos';
import { EVALUACION_C3_U2 } from '@/content/evaluaciones/c3-u2';
import { CLAVE_C3_U3, OJO_C3_U3 } from '@/content/evaluaciones/c3-u3.clave.datos';
import { EVALUACION_C3_U3 } from '@/content/evaluaciones/c3-u3';
import { CLAVE_C3_U4, OJO_C3_U4 } from '@/content/evaluaciones/c3-u4.clave.datos';
import { EVALUACION_C3_U4 } from '@/content/evaluaciones/c3-u4';
import type { Clave, Evaluacion, ReglaOjoClinico } from '@/content/evaluaciones/tipos';

/** Única puerta a las claves: este módulo no puede terminar en el navegador. */
const REGISTRO: Record<string, { evaluacion: Evaluacion; clave: Clave; ojo?: ReglaOjoClinico }> = {
  [EVALUACION_C0_U1.id]: { evaluacion: EVALUACION_C0_U1, clave: CLAVE_C0_U1 },
  [EVALUACION_C0_U2.id]: { evaluacion: EVALUACION_C0_U2, clave: CLAVE_C0_U2 },
  [EVALUACION_C0_U3.id]: { evaluacion: EVALUACION_C0_U3, clave: CLAVE_C0_U3 },
  [EVALUACION_C0_U4.id]: { evaluacion: EVALUACION_C0_U4, clave: CLAVE_C0_U4 },
  [EVALUACION_C1_U1.id]: { evaluacion: EVALUACION_C1_U1, clave: CLAVE_C1_U1, ojo: OJO_C1_U1 },
  [EVALUACION_C3_U1.id]: { evaluacion: EVALUACION_C3_U1, clave: CLAVE_C3_U1, ojo: OJO_C3_U1 },
  [EVALUACION_C3_U2.id]: { evaluacion: EVALUACION_C3_U2, clave: CLAVE_C3_U2, ojo: OJO_C3_U2 },
  [EVALUACION_C3_U3.id]: { evaluacion: EVALUACION_C3_U3, clave: CLAVE_C3_U3, ojo: OJO_C3_U3 },
  [EVALUACION_C3_U4.id]: { evaluacion: EVALUACION_C3_U4, clave: CLAVE_C3_U4, ojo: OJO_C3_U4 },
};

export function obtenerEvaluacionConClave(id: string) {
  return Object.hasOwn(REGISTRO, id) ? REGISTRO[id] : undefined;
}
