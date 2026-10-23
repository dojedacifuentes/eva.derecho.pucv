import type { Fuente } from './c1-u1-fuentes';

/**
 * Fuentes de la unidad 3.1, revisadas el 23-10-2026 (las del buscador del Poder Judicial y la noticia oficial, el
 * 22-10-2026 en eva.academy/videocapsulas/curso-1/1.3-jurisprudencia/FUENTES.md). Lo pendiente no va en la voz de EVA.
 */
export const FUENTES_C3_U1: Fuente[] = [
  {
    dato: 'Rol 23.322-2025: la Tercera Sala suspende un mes y multa con 5 UTM a una abogada por tres citas de dos obras inexistentes; la buena fe exige «verificar la efectividad de la información que aporta al tribunal» (considerando 4°).',
    fuente: 'Corte Suprema, Tercera Sala, resolución de 22 de abril de 2026 (texto íntegro, PDF con firma electrónica)',
    enlace: 'https://www.pjud.cl/prensa-y-comunicaciones/getRulingNew/77673',
    estado: 'verificada',
    nota: 'El fallo no menciona la IA. El curso no usa el nombre de la abogada.',
  },
  {
    dato: 'Que las citas fueron generadas por un chatbot de IA.',
    fuente: 'Poder Judicial, noticia oficial de 3 de junio de 2026',
    enlace: 'https://www.pjud.cl/prensa-y-comunicaciones/noticias-del-poder-judicial/145652',
    estado: 'verificada',
    nota: 'Por eso EVA dice «según el Poder Judicial».',
  },
  {
    dato: 'La verificación es personal y no se cumple con la verificación del propio sistema u otro sistema de IA.',
    fuente: 'Colegio de Abogados de Chile (julio de 2026), Guía de sugerencias para el uso responsable de IA en el ejercicio profesional, cap. II',
    enlace: 'http://colegioabogados.cl/wp-content/uploads/2026/07/Gu%C3%ADa-sobre-Uso-de-Sistemas-de-IA-por-Abogados-julio-2026.pdf',
    estado: 'verificada',
  },
  {
    dato: 'Texto de los arts. 1545 y 1546 del Código Civil (cita 1 y cita 2 del borrador).',
    fuente: 'Código Civil (DFL 1 de 2000), LeyChile, Biblioteca del Congreso Nacional',
    enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=172986',
    estado: 'pendiente',
    nota: 'Leído en una compilación al día (leyes-cl.com); el cotejo final en LeyChile lo hace una persona (el sitio pide reCAPTCHA a un programa).',
  },
  {
    dato: 'Rol 25.031-2018: Corte Suprema, Cuarta Sala, 08-06-2020, casación en el fondo, cobro de honorarios (cita 3 del borrador, con la fecha cambiada a 2019).',
    fuente: 'Buscador de jurisprudencia del Poder Judicial (ficha y extracto)',
    enlace: 'https://juris.pjud.cl/',
    estado: 'verificada',
    nota: 'Revisado el 22-10-2026. El texto completo pide iniciar sesión: el contenido del fallo no se usa.',
  },
  {
    dato: 'Alessandri, Somarriva y Vodanovic, Tratado de Derecho Civil. Partes Preliminar y General, Editorial Jurídica de Chile, 1998 (cita 4 del borrador).',
    fuente: 'Registro de catálogo de biblioteca universitaria',
    enlace: 'https://descubridor.academia.cl/Record/11211?lng=en',
    estado: 'verificada',
    nota: 'Sólo se comprobó que la obra existe. La «p. 112» del borrador no se comprobó: es lo que el ejercicio pide hacer.',
  },
  {
    dato: '2.202 decisiones judiciales en el mundo con contenido inventado por IA, 3 de Chile, al 19-10-2026.',
    fuente: 'Damien Charlotin, AI Hallucination Cases (base colaborativa, CC BY 4.0)',
    enlace: 'https://www.damiencharlotin.com/hallucinations/',
    estado: 'verificada',
    nota: 'No es un registro exhaustivo y la cifra cambia cada día: va con su fecha.',
  },
];
