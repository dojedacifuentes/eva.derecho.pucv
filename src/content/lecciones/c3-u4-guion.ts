/**
 * Unidad 3.4 «Organizar y documentar una investigación»: guion de la presentación de EVA y la bitácora de un
 * compañero (FICTICIO) que se revisa. Borrador del 23-10-2026, pendiente de revisión jurídica. Fuentes en
 * `c3-u4-fuentes.ts`. Los datos de las entradas son los verificados en las unidades 3.1 a 3.3.
 *
 * Las cuatro entradas (su orden es su id en el semáforo, c1…c4):
 *   c1 · Ley 21.719, con enlace, fecha y versión ............. se sostiene (verde)
 *   c2 · Rol 25.031-2018, «pendiente: texto completo no leído» falta algo, y lo dice: honesta (amarillo)
 *   c3 · Art. 1546 CC «verificado» con enlace a la Ley 21.719 . su propio enlace la desmiente (rojo: el error escondido)
 *   c4 · Frase «de ChatGPT, falta autor», pendiente ........... no se puede usar aún, pero está declarada (amarillo)
 */

export type VisualC3U4 = 'pregunta' | 'politica' | 'bitacora' | 'semaforo' | 'partes' | 'estados' | 'regla' | 'cierre';

export interface TramoC3U4 {
  n: number;
  nombre: string;
  visual: VisualC3U4;
  voz: string;
}

export interface EntradaBitacora {
  id: 'c1' | 'c2' | 'c3' | 'c4';
  afirma: string;
  fuente: string;
  enlace: string;
  consulta: string;
  estado: 'Verificada' | 'Pendiente';
  nota?: string;
}

export const BITACORA_COMPANERO: { titulo: string; entradas: EntradaBitacora[] } = {
  titulo: 'Bitácora de un compañero · informe de seminario sobre contratos y datos personales · ficticia',
  entradas: [
    {
      id: 'c1',
      afirma: 'La Ley 21.719 se publicó el 13-12-2024 y sus cambios a la Ley 19.628 rigen el 1-12-2026 (art. 1° transitorio).',
      fuente: 'LeyChile · versión del 05-02-2026',
      enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=1209272',
      consulta: '23-10-2026',
      estado: 'Verificada',
    },
    {
      id: 'c2',
      afirma: 'La Corte Suprema, en el rol 25.031-2018 (8 de junio de 2020), aplica el art. 19 del Código Civil (considerando duodécimo).',
      fuente: 'Buscador de jurisprudencia del Poder Judicial · ficha y extracto',
      enlace: 'https://juris.pjud.cl/',
      consulta: '22-10-2026',
      estado: 'Pendiente',
      nota: 'Falta leer el texto completo: pide iniciar sesión.',
    },
    {
      id: 'c3',
      afirma: 'Art. 1546 del Código Civil: el contrato obliga también a lo que emana de la naturaleza de la obligación.',
      fuente: 'LeyChile',
      enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=1209272',
      consulta: '23-10-2026',
      estado: 'Verificada',
    },
    {
      id: 'c4',
      afirma: '«La IA no puede reemplazar el juicio profesional del abogado.»',
      fuente: 'Respuesta de un chat de IA',
      enlace: '—',
      consulta: '20-10-2026',
      estado: 'Pendiente',
      nota: 'Falta encontrar quién lo dijo y dónde.',
    },
  ],
};

export const GUION_C3_U4: TramoC3U4[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'pregunta',
    voz: 'Entregas tu informe. El profesor pregunta: ¿de dónde salió esto? Tú sabes que lo verificaste. Pero no puedes mostrar dónde. Una investigación que nadie puede repetir no prueba nada. Hoy la ordenamos.',
  },
  {
    n: 2,
    nombre: 'La regla de casa',
    visual: 'politica',
    voz: 'Y hay una regla de casa. La Política de Integridad Académica de la PUCV dice que usar herramientas de IA sin la adecuada citación es plagio. No prohíbe usarlas. Pide decirlo.',
  },
  {
    n: 3,
    nombre: 'La bitácora',
    visual: 'bitacora',
    voz: 'Esta es la bitácora de un compañero, con cuatro entradas. Cada una dice qué afirma, de dónde sale, cuándo lo revisó y en qué estado está. Parece impecable.',
  },
  {
    n: 4,
    nombre: 'Semáforo',
    visual: 'semaforo',
    voz: 'Marca cada entrada: verde si se sostiene, amarillo si falta algo, rojo si no se sostiene. Una dice que está verificada, y su propio enlace la desmiente. ¿Cuál?',
  },
  {
    n: 5,
    nombre: 'Cinco partes',
    visual: 'partes',
    voz: 'Una bitácora útil tiene cinco partes. La pregunta. Las búsquedas: dónde, con qué palabras y cuándo. La tabla de fuentes, con su enlace, su fecha y su estado. El uso de IA: qué herramienta, para qué y qué verificaste. Y las decisiones: qué descartaste y por qué.',
  },
  {
    n: 6,
    nombre: 'Estados',
    visual: 'estados',
    voz: 'Cada fuente tiene un estado. Verificada: la leíste en la fuente oficial. Pendiente: falta algo, y lo dices. Descartada: no existe o no dice eso. Una pendiente honesta vale más que una verificada que nadie puede abrir.',
  },
  {
    n: 7,
    nombre: 'Regla',
    visual: 'regla',
    voz: 'La regla de esta unidad: si lo usaste, lo declaras; si lo afirmas, lo enlazas. No es un trámite. Es lo que te deja defender tu trabajo.',
  },
  {
    n: 8,
    nombre: 'Cierre',
    visual: 'cierre',
    voz: 'Te toca. Revisa la bitácora de tu compañero y arma la tuya, para tu propio informe. ¿Qué entrada se desmentía sola? Lo revelo en la evaluación.',
  },
];
