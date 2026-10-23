/**
 * Unidad 3.1 «Verificar antes de firmar»: guion de la presentación de EVA y el borrador que se audita.
 * Borrador del 23-10-2026, pendiente de revisión jurídica. Fuentes en `c3-u1-fuentes.ts`.
 *
 * El borrador es FICTICIO (un escrito de cobro de honorarios redactado por una IA, sin partes ni nombres). Sus
 * cuatro citas están elegidas para que cada una exija una decisión distinta:
 *   1 · art. 1545 CC, bien citado .................................. aceptar
 *   2 · art. 1546 CC, cortado: dice lo contrario .................... rechazar (el error escondido)
 *   3 · CS rol 25.031-2018 con fecha de 2019 (es del 08-06-2020) ...... revisar
 *   4 · Tratado que existe (catálogo); la página sólo se comprueba en el libro, y es una obra de Parte General . revisar
 * El orden de las citas es su id en el semáforo (c1…c4): no se cambia sin cambiar OJO_C3_U1.
 */

export type VisualC3U1 = 'caso' | 'deber' | 'borrador' | 'semaforo' | 'fuentes' | 'decisiones' | 'regla' | 'cierre';

export interface TramoC3U1 {
  n: number;
  nombre: string;
  visual: VisualC3U1;
  voz: string;
}

export const GUION_C3_U1: TramoC3U1[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'caso',
    voz: 'Abril de dos mil veintiséis. La Corte Suprema suspende un mes a una abogada y le pone una multa de cinco UTM. Su recurso citaba dos libros que no existen. Según el Poder Judicial, salieron de un chatbot. Hoy no vas a aprender a escribir con IA. Vas a aprender a firmar.',
  },
  {
    n: 2,
    nombre: 'El deber',
    visual: 'deber',
    voz: 'Ella dijo que fue un error de transcripción, sin intención de engañar. La Corte no aceptó la excusa: la buena fe, dijo, es el deber de verificar la efectividad de la información que se aporta al tribunal. No basta con no querer engañar. Hay que comprobar.',
  },
  {
    n: 3,
    nombre: 'El borrador',
    visual: 'borrador',
    voz: 'Hagamos la prueba. Este borrador lo escribió una IA para un juicio de cobro de honorarios. Tiene cuatro citas: dos artículos del Código Civil, una sentencia de la Corte Suprema y un tratado de Derecho Civil. Todo suena bien. Por eso es peligroso.',
  },
  {
    n: 4,
    nombre: 'Semáforo',
    visual: 'semaforo',
    voz: 'Antes de verificar, decide. Para cada cita: verde si la aceptarías, amarillo si hay que revisarla, rojo si la rechazas. Una de las cuatro dice lo contrario de lo que dice su fuente. ¿Cuál?',
  },
  {
    n: 5,
    nombre: 'A la fuente',
    visual: 'fuentes',
    voz: 'Ahora, a la fuente. Cada tipo de cita tiene la suya. Las normas, en LeyChile, en su texto vigente. Las sentencias, en el buscador de jurisprudencia del Poder Judicial, por rol y año. La doctrina, en el catálogo de la biblioteca y después en el libro, en la página. Que un libro exista no prueba que diga eso.',
  },
  {
    n: 6,
    nombre: 'Tres decisiones',
    visual: 'decisiones',
    voz: 'Con cada cita tomas una de tres decisiones. La aceptas, si existe y dice lo que el borrador dice. La revisas, si existe pero algo no calza: una fecha, una página, un tomo. La rechazas, si no existe o dice otra cosa. Y anotas dónde la verificaste.',
  },
  {
    n: 7,
    nombre: 'Regla',
    visual: 'regla',
    voz: 'La regla de este curso: si no la leíste en la fuente, no la firmes. Y que otra IA te diga que está bien no cuenta. Lo dice el Colegio de Abogados: la verificación es tuya.',
  },
  {
    n: 8,
    nombre: 'Cierre',
    visual: 'cierre',
    voz: 'Te toca. Vas a auditar este mismo borrador, cita por cita, con el enlace de cada fuente. ¿Cuál de las cuatro contradecía la ley? Lo revelo en la evaluación.',
  },
];

export interface CitaBorrador {
  id: 'c1' | 'c2' | 'c3' | 'c4';
  tipo: 'Norma' | 'Jurisprudencia' | 'Doctrina';
  /** Cómo aparece en el borrador (lo que «escribió la IA»). */
  texto: string;
  /** Dónde se verifica y cómo buscarla. */
  fuente: { nombre: string; url: string; como: string };
}

export const BORRADOR_C3_U1 = {
  encabezado: 'Borrador · cobro de honorarios · redactado por una IA · caso ficticio',
  introduccion:
    'Que, en cuanto al fondo, el contrato de prestación de servicios celebrado entre las partes obliga a la demandada al pago íntegro de los honorarios pactados, por las razones que se exponen:',
  citas: [
    {
      id: 'c1',
      tipo: 'Norma',
      texto:
        'Conforme al artículo 1545 del Código Civil, «todo contrato legalmente celebrado es una ley para los contratantes, y no puede ser invalidado sino por su consentimiento mutuo o por causas legales».',
      fuente: {
        nombre: 'LeyChile · Código Civil',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986',
        como: 'Busca el artículo 1545 dentro del Código Civil y compara palabra por palabra.',
      },
    },
    {
      id: 'c2',
      tipo: 'Norma',
      texto:
        'A su vez, el artículo 1546 del mismo Código dispone que «los contratos deben ejecutarse de buena fe, y por consiguiente obligan sólo a lo que en ellos se expresa».',
      fuente: {
        nombre: 'LeyChile · Código Civil',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=172986',
        como: 'Busca el artículo 1546 y lee la frase completa, hasta el punto final.',
      },
    },
    {
      id: 'c3',
      tipo: 'Jurisprudencia',
      texto:
        'Así lo ha resuelto la Excma. Corte Suprema en sentencia de 8 de junio de 2019, rol N° 25.031-2018, en una causa de cobro de honorarios.',
      fuente: {
        nombre: 'Buscador de jurisprudencia del Poder Judicial',
        url: 'https://juris.pjud.cl/',
        como: 'Pestaña Corte Suprema: Rol 25031, Era 2018. Compara la fecha y la materia de la ficha. El texto completo puede pedir iniciar sesión; la ficha basta para la fecha.',
      },
    },
    {
      id: 'c4',
      tipo: 'Doctrina',
      texto:
        'En el mismo sentido, Alessandri, Somarriva y Vodanovic, Tratado de Derecho Civil. Partes Preliminar y General, Santiago, Editorial Jurídica de Chile, 1998, p. 112.',
      fuente: {
        nombre: 'Catálogo de la Biblioteca PUCV, y después el libro',
        url: 'https://biblioteca.pucv.cl/',
        como: 'Busca la obra por título. Si está, pide el libro y ábrelo en la página citada. ¿Una obra de Parte General trata los efectos de los contratos?',
      },
    },
  ] satisfies CitaBorrador[],
  cierre: 'POR TANTO, solicito a US. acoger la demanda en todas sus partes, con costas.',
};
