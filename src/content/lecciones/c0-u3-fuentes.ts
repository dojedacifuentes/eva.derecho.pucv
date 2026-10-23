import type { Fuente } from './c1-u1-fuentes';

/**
 * Fuentes de la unidad 0.3, tomadas del apunte «¿Qué es la inteligencia artificial?» (fuentes al 20-10-2026). Lo que
 * el apunte marca como no verificado (sección 12) queda «pendiente» y no va en la voz de EVA.
 */
export const FUENTES_C0_U3: Fuente[] = [
  {
    dato: 'Los cuatro cuadrantes de Russell y Norvig (pensar/actuar × como humanos/racionalmente) y el manual «firmemente» en «actuar racionalmente».',
    fuente: 'Stanford Encyclopedia of Philosophy, «Artificial Intelligence»',
    enlace: 'https://plato.stanford.edu/entries/artificial-intelligence/',
    estado: 'pendiente',
    nota: 'Verificado en la Enciclopedia de Stanford, no en el manual de Russell y Norvig.',
  },
  {
    dato: '«Intelligence measures an agent\'s ability to achieve goals in a wide range of environments.»',
    fuente: 'Legg y Hutter (2007), Universal Intelligence (arXiv:0712.3329)',
    enlace: 'https://arxiv.org/pdf/0712.3329',
    estado: 'verificada',
  },
  {
    dato: 'La inteligencia como eficiencia de adquisición de destrezas; con datos ilimitados se «compra» cualquier destreza.',
    fuente: 'Chollet (2019), On the Measure of Intelligence (arXiv:1911.01547)',
    enlace: 'https://arxiv.org/abs/1911.01547',
    estado: 'verificada',
  },
  {
    dato: '«The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin.»',
    fuente: 'Sutton (2019), The Bitter Lesson',
    enlace: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html',
    estado: 'verificada',
  },
  {
    dato: 'Que el desempeño escale con el cómputo es una regularidad observada.',
    fuente: 'Kaplan et al. (2020), Scaling Laws for Neural Language Models (arXiv:2001.08361)',
    enlace: 'https://arxiv.org/abs/2001.08361',
    estado: 'verificada',
  },
  {
    dato: 'Definición clásica de «aprender» en aprendizaje automático: mejorar el desempeño en una tarea con la experiencia.',
    fuente: 'Atribuida a Tom Mitchell, Machine Learning (1997)',
    estado: 'pendiente',
    nota: 'Citada por fuentes secundarias, no por el manual.',
  },
  {
    dato: 'Turing sustituyó «¿pueden pensar las máquinas?» por un juego que juzga la conversación (concesión 1).',
    fuente: 'Stanford Encyclopedia of Philosophy, «The Turing Test»',
    enlace: 'https://plato.stanford.edu/entries/turing-test/',
    estado: 'verificada',
  },
  {
    dato: '«Syntax is not by itself sufficient for, nor constitutive of, semantics» (habitación china).',
    fuente: 'Stanford Encyclopedia of Philosophy, «The Chinese Room Argument»',
    enlace: 'https://plato.stanford.edu/entries/chinese-room/',
    estado: 'verificada',
  },
  {
    dato: 'Las «capacidades emergentes» pueden ser artefacto de la métrica (concesión 2).',
    fuente: 'Schaeffer, Miranda y Koyejo (2023), Are Emergent Abilities of LLMs a Mirage? (arXiv:2304.15004); contra Wei et al. (2022), arXiv:2206.07682',
    enlace: 'https://arxiv.org/abs/2304.15004',
    estado: 'verificada',
  },
  {
    dato: 'SWE-bench Verified «rose from 60% to near 100% in a single year» (concesión 3).',
    fuente: 'Stanford HAI, AI Index Report 2026',
    enlace: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
    estado: 'verificada',
  },
  {
    dato: 'Contaminación de los bancos de prueba: los modelos pueden haber visto las preguntas en el entrenamiento.',
    fuente: 'arXiv:2406.04244 (2024)',
    enlace: 'https://arxiv.org/html/2406.04244v1',
    estado: 'verificada',
  },
  {
    dato: 'Atajos en los bancos de prueba («without learning the actual skill being tested») y «the lure of wishful mnemonics» (concesiones 3 y 5).',
    fuente: 'Mitchell (2021), Why AI is Harder Than We Think (arXiv:2104.12871)',
    enlace: 'https://arxiv.org/abs/2104.12871',
    estado: 'verificada',
  },
  {
    dato: 'La comunidad dividida 51/49 y la petición de «an extended science of intelligence» (concesión 4).',
    fuente: 'Mitchell y Krakauer (2022), arXiv:2210.13966',
    enlace: 'https://arxiv.org/abs/2210.13966',
    estado: 'verificada',
  },
  {
    dato: '«Knows», «believes», «thinks» intensifican el antropomorfismo; «repeatedly stepping back» (concesión 5).',
    fuente: 'Shanahan (2022), Talking About Large Language Models (arXiv:2212.03551)',
    enlace: 'https://arxiv.org/abs/2212.03551',
    estado: 'verificada',
  },
  {
    dato: 'Lo que el modelo dice de su razonamiento no coincide, la mayoría de las veces, con lo que hizo (concesión 5).',
    fuente: 'Anthropic (abril de 2025), Reasoning models don\'t always say what they think',
    enlace: 'https://www.anthropic.com/research/reasoning-models-dont-say-think',
    estado: 'verificada',
  },
  {
    dato: 'La responsabilidad se juega en el uso real, donde las pruebas previas no predicen (concesión 3).',
    fuente: 'International AI Safety Report 2026',
    enlace: 'https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026',
    estado: 'verificada',
  },
];
