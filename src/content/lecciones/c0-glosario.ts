/**
 * Glosario y «¿Sabías que?» del Curso 0, del apunte «¿Qué es la inteligencia artificial?» (secciones 8 y 9,
 * fuentes al 20-10-2026), repartidos por unidad. Lo que el apunte no pudo verificar no entra.
 */
export interface Termino {
  termino: string;
  definicion: string;
}

export interface SabiasQue {
  texto: string;
  fuente: string;
}

export const GLOSARIO_C0: Record<string, Termino[]> = {
  'c0-u1': [
    {
      termino: 'Sistema de IA (sentido legal)',
      definicion:
        'Sistema basado en máquinas que, para objetivos explícitos o implícitos, infiere de la entrada que recibe cómo generar predicciones, contenidos, recomendaciones o decisiones que pueden influir en entornos físicos o virtuales (OCDE 2023; UE art. 3.1; Chile, art. 3 n.º 1 del proyecto).',
    },
    {
      termino: 'Inferencia',
      definicion:
        'En la ley europea, obtener salidas a partir de entradas y «deducir modelos o algoritmos, o ambos», lo que «trasciende el tratamiento básico de datos» (considerando 12). Separa al sistema de IA del programa de reglas fijas.',
    },
    {
      termino: 'Sistema basado en reglas',
      definicion: 'Programa cuyas instrucciones escribió por completo una persona (si pasa X, haz Y). Queda fuera de la definición europea.',
    },
    {
      termino: 'Aprendizaje automático',
      definicion: 'El sistema «aprende» patrones de muchos ejemplos en vez de recibir reglas: no una lista de rasgos de un perro, sino miles de imágenes.',
    },
    {
      termino: 'Autonomía y adaptabilidad',
      definicion:
        'Grados en que el sistema opera sin intervención humana y sigue cambiando tras su puesta en servicio; ambas en las definiciones de la OCDE, la UE y Chile.',
    },
    {
      termino: 'Considerando',
      definicion: 'Párrafo numerado que precede al articulado de una norma europea y explica su intención; sirve para interpretarla, aunque no es el artículo.',
    },
  ],
  'c0-u2': [
    {
      termino: 'Modelo de lenguaje (LLM)',
      definicion:
        'Modelo entrenado para predecir una parte oculta de un texto; el resultado es un modelo estadístico complejo de cómo se correlacionan las palabras y frases de sus datos de entrenamiento. En la UE, «modelo de IA de uso general» (art. 3.63).',
    },
    {
      termino: 'Loro estocástico',
      definicion: 'Imagen de Bender y otros (2021): un modelo que ensambla formas lingüísticas según probabilidades, sin referencia al significado.',
    },
    {
      termino: 'Cadena de pensamiento',
      definicion: 'Serie de pasos intermedios que un «modelo razonador» escribe antes de responder. No es un registro fiel de su proceso interno.',
    },
    {
      termino: 'AGI',
      definicion:
        '«Inteligencia artificial general». Definida por capacidades (DeepMind), por eficiencia de aprendizaje (Chollet) o por contrato (Microsoft–OpenAI). Ninguna ley la define.',
    },
    {
      termino: 'Frontera dentada',
      definicion: 'Desempeño «jagged»: un sistema puede superar a expertos en una prueba y fallar en una tarea simple; la prueba previa no predice el uso real.',
    },
    {
      termino: 'Agente de IA',
      definicion: 'Sistema que ejecuta tareas de varios pasos con autonomía (2025-2026); sin definición oficial.',
    },
  ],
  'c0-u3': [
    {
      termino: 'Agente / agente racional',
      definicion: 'Sistema que transforma percepciones en acciones; racional si cabe esperar que sus acciones logren el objetivo (Russell y Norvig).',
    },
    {
      termino: 'Test de Turing',
      definicion:
        'Juego de imitación (1950): un interrogador conversa por texto con una persona y una máquina ocultas y debe decir cuál es cuál. Juzga conducta, no estados interiores.',
    },
    {
      termino: 'Habitación china',
      definicion: 'Argumento de Searle (1980): seguir reglas para responder en chino sin saber chino muestra que la sintaxis no basta para la semántica.',
    },
    {
      termino: 'Alucinación',
      definicion:
        'Respuesta inexacta, inventada o sin base en la realidad. Es metáfora: el sistema produce texto probable. Causa de los fallos con citas inexistentes.',
    },
    {
      termino: 'Banco de pruebas (benchmark)',
      definicion: 'Conjunto fijo de tareas con que se mide a los modelos. Se satura cuando todos sacan el máximo y se contamina cuando sus preguntas entran al entrenamiento.',
    },
    {
      termino: 'Efecto IA',
      definicion: 'Dejar de llamar «IA» a lo que ya funciona (Raphael 1971, Tesler 1979). Explica por qué las definiciones técnicas envejecen.',
    },
  ],
  'c0-u4': [
    {
      termino: 'Intellectus / ratio',
      definicion:
        'En Aquino, la captación intuitiva de la verdad (reposo) y el razonamiento discursivo (movimiento). Antiqua et nova (2025) sostiene que la IA imita el segundo y no el primero.',
    },
    {
      termino: 'Reificación',
      definicion: 'Tratar una medida (el cociente intelectual, un puntaje de riesgo) como si fuera una cosa que existe por sí misma (Gould, 1981).',
    },
    {
      termino: 'Decisión únicamente automatizada',
      definicion:
        'Decisión tomada sin intervención humana a partir del tratamiento de datos. La Ley 21.719 (art. 8 bis) da derecho a oponerse a ella cuando produce efectos jurídicos o afecta significativamente a la persona.',
    },
    {
      termino: 'Buena fe procesal',
      definicion: 'Deber de las partes de actuar con lealtad ante el tribunal (Ley 20.886, art. 2 letra d); la Corte Suprema lo lee como el deber de verificar lo que se aporta.',
    },
  ],
};

export const SABIAS_QUE_C0: Record<string, SabiasQue[]> = {
  'c0-u1': [
    {
      texto: 'Para la RAE, «inteligencia artificial» es una disciplina, no una cosa: «Disciplina científica que se ocupa de crear programas informáticos que ejecutan operaciones comparables a las que realiza la mente humana».',
      fuente: 'Diccionario de la lengua española, «inteligencia»',
    },
    {
      texto: 'El Código de Ética Judicial chileno define «ciberseguridad» y «telemático» con la RAE, pero deja «inteligencia artificial» sin definir.',
      fuente: 'Corte Suprema, Acta 244-2025',
    },
  ],
  'c0-u2': [
    {
      texto: 'Los investigadores están divididos por la mitad: 51 % contra 49 % sobre si un modelo entrenado sólo con texto puede entender.',
      fuente: 'Mitchell y Krakauer, 2022',
    },
    {
      texto: 'La AGI es una cláusula contractual: OpenAI la declara y un panel independiente la verifica.',
      fuente: 'Microsoft, 28 de octubre de 2025',
    },
    {
      texto: 'Oro en la olimpiada de matemática y 50,1 % en relojes analógicos, el mismo año.',
      fuente: 'Stanford HAI, Índice de IA 2026',
    },
  ],
  'c0-u3': [
    {
      texto: 'Unas 70 definiciones de inteligencia y ninguna oficial.',
      fuente: 'Legg y Hutter, 2007',
    },
    {
      texto: 'Hay 2.202 fallos con citas inventadas por IA en el mundo, 3 de ellos en Chile, en la base que lleva Damien Charlotin.',
      fuente: 'damiencharlotin.com/hallucinations, al 19 de octubre de 2026',
    },
  ],
  'c0-u4': [
    {
      texto: 'La IA nació en una solicitud de fondos: la propuesta de Dartmouth pedía «a 2 month, 10 man study» para el verano de 1956 y lleva fecha del 31 de agosto de 1955.',
      fuente: 'Propuesta de Dartmouth, 1955',
    },
    {
      texto: 'Turing predijo que hacia el año 2000 un interrogador medio no tendría más de 70 % de probabilidad de acertar tras cinco minutos de conversación. Falló.',
      fuente: 'Turing, 1950',
    },
    {
      texto: 'El nombre se eligió para evitar a una persona: McCarthy inventó «artificial intelligence» para no tener que aceptar a Norbert Wiener «as a guru» ni discutir con él.',
      fuente: 'McCarthy, reseña de Bloomfield',
    },
  ],
};

/** Preguntas de autoestudio del apunte (sección 10), repartidas por unidad. Sin respuesta: son para discutir. */
export const AUTOESTUDIO_C0: Record<string, string[]> = {
  'c0-u1': [
    'Un municipio usa un programa que ordena las solicitudes de subsidio por fecha y otro que les asigna un puntaje de «riesgo de fraude» aprendido de casos anteriores. Con el art. 3 n.º 1 del proyecto chileno y el considerando 12 europeo, ¿cuál es «sistema de IA» y por qué? ¿Qué obligaciones cambiarían si la respuesta fuera la contraria?',
    'UNESCO renunció a definir la IA «ya que tal definición tendría que cambiar con el tiempo»; la UE la definió y añadió directrices no vinculantes. ¿Cuál estrategia resiste mejor el efecto IA? ¿Cuál da más seguridad jurídica? ¿Son compatibles?',
  ],
  'c0-u2': [
    'Si una empresa declara que alcanzó la AGI y un panel lo verifica, ¿qué cambia para quienes usan sus sistemas en Chile? ¿Y si otra empresa, con otra definición, dice lo contrario?',
  ],
  'c0-u3': [
    'La Corte Suprema (rol 23.322-2025) rechazó el «error involuntario» de una abogada que citó obras inventadas por un chatbot. Explique la decisión con dos de las seis concesiones. ¿Cambiaría algo si el sistema hubiera «explicado» su razonamiento?',
    'Antiqua et nova dice que la IA tiene capacidad «para llevar a cabo tareas, pero no la de pensar»; Legg y Hutter, que la inteligencia «measures an agent\'s ability to achieve goals in a wide range of environments». ¿Discrepan sobre los hechos o sobre la palabra? Argumente con la concesión 1.',
  ],
  'c0-u4': [
    'Buck v. Bell (1927) y el art. 8 bis de la Ley 21.719 (2024) tienen algo en común: una cifra o una inferencia sobre una persona produce efectos jurídicos. ¿Qué aprendió el Derecho entre una fecha y otra sobre reificar una medida? ¿Qué falta?',
  ],
};

export interface Lectura {
  titulo: string;
  nivel: string;
  extension: string;
  porque: string;
  acceso: 'Gratuito' | 'De pago';
  enlace?: string;
}

/** «Para seguir leyendo» (sección 11 del apunte), repartido por unidad. */
export const LECTURAS_C0: Record<string, Lectura[]> = {
  'c0-u1': [
    {
      titulo: 'Proyecto de ley Boletín 16821-19, Mensaje, arts. 3, 5 y 6',
      nivel: 'Básico',
      extension: '6 págs.',
      porque: 'La definición chilena y los niveles de riesgo',
      acceso: 'Gratuito',
      enlace: 'https://diarioconstitucional.cl/wp-content/uploads/2024/08/16821-19.pdf',
    },
    {
      titulo: 'Reglamento (UE) 2024/1689, art. 3 y considerando 12',
      nivel: 'Básico',
      extension: '2 págs.',
      porque: 'La única definición vigente como ley',
      acceso: 'Gratuito',
      enlace: 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81079',
    },
    {
      titulo: 'UNESCO, Recomendación sobre la ética de la IA (2021)',
      nivel: 'Medio',
      extension: '≈ 40 págs.',
      porque: 'El instrumento global que decidió no definir',
      acceso: 'Gratuito',
      enlace: 'https://www.unesco.org/es/legal-affairs/recommendation-ethics-artificial-intelligence',
    },
  ],
  'c0-u2': [
    {
      titulo: 'Melanie Mitchell, Inteligencia artificial: guía para seres pensantes (Capitán Swing, 2024; orig. 2019)',
      nivel: 'Introductorio',
      extension: '≈ 360 págs.',
      porque: 'Historia, efecto IA y «barrera del significado»; anterior a ChatGPT',
      acceso: 'De pago',
    },
    {
      titulo: 'Luciano Floridi, Ética de la inteligencia artificial (Herder, 2024)',
      nivel: 'Avanzado',
      extension: '≈ 470 págs.',
      porque: '«Agencia sin inteligencia»; por capítulos',
      acceso: 'De pago',
    },
  ],
  'c0-u3': [
    {
      titulo: 'Mark Coeckelbergh, Ética de la inteligencia artificial (Cátedra, 2021)',
      nivel: 'Introductorio-medio',
      extension: '183 págs.',
      porque: 'Responsabilidad, sesgo, transparencia',
      acceso: 'De pago',
    },
    {
      titulo: 'López de Mántaras y Meseguer, Inteligencia artificial (CSIC / Catarata, 2017)',
      nivel: 'Introductorio',
      extension: 'Breve (por confirmar)',
      porque: 'Panorama corto por un investigador de referencia',
      acceso: 'De pago',
    },
  ],
  'c0-u4': [
    {
      titulo: 'Corte Suprema, Código de Ética Judicial, Acta 244-2025, art. 17',
      nivel: 'Básico',
      extension: '3 págs.',
      porque: 'Decisión humana e indelegable; verificar siempre',
      acceso: 'Gratuito',
      enlace: 'https://www.pjud.cl/docs/download/114815',
    },
    {
      titulo: 'Academia Judicial, Guía sobre inteligencia artificial para juezas y jueces (2026), cap. 1',
      nivel: 'Básico',
      extension: '7 págs. (45 en total)',
      porque: 'Glosario judicial chileno con ejemplos',
      acceso: 'Gratuito',
      enlace: 'https://ia.academiajudicial.cl/wp-content/uploads/2026/09/Guia-sobre-inteligencia-artificial-para-juezas-y-jueces.pdf',
    },
    {
      titulo: 'Antiqua et nova (2025), nn. 1-35',
      nivel: 'Básico-medio',
      extension: '117 párrafos (leer 35)',
      porque: 'Historia del concepto; intellectus/ratio',
      acceso: 'Gratuito',
      enlace: 'https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_ddf_doc_20250128_antiqua-et-nova_sp.html',
    },
    {
      titulo: 'CEJA, Inteligencia artificial en los poderes judiciales de las Américas (2025)',
      nivel: 'Medio',
      extension: '41 págs.',
      porque: 'Casos regionales (Prometea, VICTOR, PretorIA)',
      acceso: 'Gratuito',
      enlace: 'https://cejamericas.org/wp-content/uploads/2025/12/Inteligencia-Artificial-en-los-Poderes-Judiciales-de-las-Americas_.pdf',
    },
  ],
};
