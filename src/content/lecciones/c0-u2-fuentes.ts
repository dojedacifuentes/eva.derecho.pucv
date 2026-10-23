import type { Fuente } from './c1-u1-fuentes';

/**
 * Fuentes de la unidad 0.2, tomadas del apunte «¿Qué es la inteligencia artificial?» (fuentes al 20-10-2026). Lo que
 * el apunte marca como no verificado (sección 12) queda «pendiente» y no va en la voz de EVA.
 */
export const FUENTES_C0_U2: Fuente[] = [
  {
    dato: '«Nobody really knows what intelligence is»; unas 70 definiciones de inteligencia reunidas.',
    fuente: 'Legg y Hutter (2007), A Collection of Definitions of Intelligence (arXiv:0706.3639) y Universal Intelligence (arXiv:0712.3329)',
    enlace: 'https://arxiv.org/abs/0706.3639',
    estado: 'verificada',
  },
  {
    dato: 'McCarthy responde «Not yet» a si hay una definición de inteligencia independiente de la humana (2007).',
    fuente: 'McCarthy, «What is Artificial Intelligence?» (Stanford, 2007)',
    enlace: 'http://www-formal.stanford.edu/jmc/whatisai/node1.html',
    estado: 'verificada',
  },
  {
    dato: 'Encuesta de 2022 a 480 investigadores: 51 % de acuerdo, 49 % en desacuerdo con que un modelo entrenado sólo con texto pueda entender; los dos bandos del debate.',
    fuente: 'Mitchell y Krakauer (2022), The Debate Over Understanding in AI\'s Large Language Models (arXiv:2210.13966)',
    enlace: 'https://arxiv.org/abs/2210.13966',
    estado: 'verificada',
  },
  {
    dato: 'La prueba del pulpo y «a system trained only on form has a priori no way to learn meaning».',
    fuente: 'Bender y Koller (2020), Climbing towards NLU, ACL 2020',
    enlace: 'https://aclanthology.org/2020.acl-main.463/',
    estado: 'verificada',
  },
  {
    dato: '«Loro estocástico»: un modelo de lenguaje ensambla formas lingüísticas según probabilidades, «without any reference to meaning».',
    fuente: 'Bender, Gebru, McMillan-Major y Shmitchell (2021), On the Dangers of Stochastic Parrots, FAccT 2021',
    enlace: 'https://s10251.pcdn.co/pdf/2021-bender-parrots.pdf',
    estado: 'verificada',
  },
  {
    dato: '«La ilusión del pensamiento» (Apple, junio de 2025): colapso de precisión a partir de cierta complejidad; y la réplica de Lawsen sobre el diseño del experimento.',
    fuente: 'Apple Machine Learning Research (2025); Lawsen (2025), arXiv:2506.09250',
    enlace: 'https://machinelearning.apple.com/research/illusion-of-thinking',
    estado: 'pendiente',
    nota: 'Los dos se citan por sus resúmenes, no por el texto completo.',
  },
  {
    dato: 'Grafos de atribución: Dallas → Texas → Austin; la explicación verbal de una suma no coincide con los pasos internos; información útil en «a quarter of the prompts».',
    fuente: 'Anthropic, Transformer Circuits (marzo de 2025), On the Biology of a Large Language Model',
    enlace: 'https://transformer-circuits.pub/2025/attribution-graphs/biology.html',
    estado: 'pendiente',
    nota: 'Del trabajo se leyó poco más de la mitad.',
  },
  {
    dato: 'Los modelos razonadores mencionan la pista que recibieron en su «razonamiento» el 25 % (Claude 3.7 Sonnet) y el 39 % (DeepSeek R1) de las veces.',
    fuente: 'Anthropic (abril de 2025), Reasoning models don\'t always say what they think',
    enlace: 'https://www.anthropic.com/research/reasoning-models-dont-say-think',
    estado: 'verificada',
  },
  {
    dato: 'Inyección de conceptos: detección alrededor del 20 % de las veces, «highly unreliable»; no establece autoconciencia ni experiencia subjetiva.',
    fuente: 'Anthropic, Transformer Circuits (octubre de 2025), Emergent introspective awareness',
    enlace: 'https://transformer-circuits.pub/2025/introspection/index.html',
    estado: 'verificada',
  },
  {
    dato: 'Niveles de AGI de DeepMind; «Focus on Capabilities, not Processes»; nivel 2 «not yet achieved».',
    fuente: 'Morris et al. (2023), Levels of AGI (arXiv:2311.02462)',
    enlace: 'https://arxiv.org/abs/2311.02462',
    estado: 'verificada',
  },
  {
    dato: 'Ninguna destreza aislada demuestra inteligencia; con datos ilimitados se «compra» cualquier destreza.',
    fuente: 'Chollet (2019), On the Measure of Intelligence (arXiv:1911.01547)',
    enlace: 'https://arxiv.org/abs/1911.01547',
    estado: 'verificada',
  },
  {
    dato: 'ARC-AGI-3: versión interactiva para agentes (2026).',
    fuente: 'ARC Prize, ARC-AGI-3',
    enlace: 'https://arcprize.org/arc-agi/3/',
    estado: 'pendiente',
    nota: 'Conflicto de datos no resuelto entre la prensa (bajo 0,4 %) y la tabla oficial leída por herramienta automática (hasta 99,95 %). El curso no cita cifras.',
  },
  {
    dato: 'La declaración de AGI por OpenAI «will now be verified by an independent expert panel» y mueve derechos de propiedad intelectual e ingresos (acuerdo del 28 de octubre de 2025).',
    fuente: 'Microsoft, The next chapter of the Microsoft–OpenAI partnership (2025)',
    enlace: 'https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/',
    estado: 'verificada',
  },
  {
    dato: 'Desempeño «jagged»; las pruebas previas al despliegue no predicen la utilidad ni el riesgo reales.',
    fuente: 'International AI Safety Report 2026',
    enlace: 'https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026',
    estado: 'verificada',
  },
  {
    dato: 'Oro en la Olimpiada Internacional de Matemática y 50,1 % en lectura de relojes analógicos.',
    fuente: 'Stanford HAI, AI Index Report 2026',
    enlace: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
    estado: 'verificada',
    nota: 'La fecha de publicación (13 de abril de 2026) viene de cobertura secundaria.',
  },
  {
    dato: '«Modelo de IA de uso general», art. 3, punto 63 del Reglamento (UE) 2024/1689.',
    fuente: 'Reglamento (UE) 2024/1689, art. 3',
    enlace: 'https://artificialintelligenceact.eu/article/3/',
    estado: 'verificada',
  },
];
