# 06 · Qué sirve de EVA ACADEMY y qué se reutiliza

Revisado el 23-10-2026 contra el código de `eva.academy` (rama `feat/diapositivas`, commit 3a6e908, el mismo
publicado en evaacademyia.vercel.app). Los enlaces viven en `src/content/academy.ts` y se comprueban con
`node scripts/enlaces-academy.mjs` (hoy: 34 de 34 responden).

## La decisión

**Enlazar, no copiar.** EVA ACADEMY ya está dividido en piezas con dirección propia: cada lección
(`/modulo/<módulo>/<lección>`), cada guía (`/guia/…`), cada juego (`/sala/<juego>`), el glosario. Esta plataforma
pone la puerta de la Escuela (cursos, docentes, avance, ingreso) y manda a esas piezas cuando sirven.

Por qué:

1. **Peso.** Lo pesado se queda allá y sólo se carga si alguien lo abre: actividades H5P (28 MB), guías PDF
   (21 MB), casos Twine (3,6 MB), videos (2,6 MB), Phaser y Remotion. eva.derecho sigue liviana.
2. **Propiedad y licencia.** El contenido sigue siendo de EVA: calza con la propuesta de licencia a la Escuela (marca
   EVA, la Escuela licencia el uso). Copiarlo a un sitio de la PUCV lo volvería material de la PUCV.
3. **Remotion.** Es gratis para personas y equipos de hasta 3; una institución grande que lo aloje en su sitio
   necesitaría licencia. Enlazado, lo sigue sirviendo EVA.
4. **Un solo lugar que mantener.** Si una lección de EVA ACADEMY se corrige, se corrige para ambos.

**Límite aceptado:** el avance de EVA ACADEMY (XP, niveles, insignias) se guarda en el navegador de ese sitio y no
se suma al de esta plataforma. Para el piloto alcanza; unirlos es otro trabajo (ver «Más adelante»).

## Qué cubre, unidad por unidad

| Unidad | En EVA ACADEMY | Encaje |
|---|---|---|
| 0.1 Las definiciones de las leyes | «¿Qué es la IA? (y qué no es)» | directo (producida aquí, 23-10-2026) |
| 0.2 Las dudas recientes | — | **producida aquí** |
| 0.3 Lo propio de la IA | «¿Qué es la IA? (y qué no es)», «Cómo aprende una máquina»; Balanza de datos | complemento |
| 0.4 De dónde viene «inteligencia» | «Una historia en dos escuelas» | directo (producida aquí) |
| 1.1 ¿Qué es una IA? | «¿Qué es la IA? (y qué no es)», «Cómo aprende una máquina»; juego Balanza de datos | directo |
| 1.2 La siguiente palabra | «La siguiente palabra» (con su juego del token), «La atención y la escala»; Ventana de contexto | directo |
| 1.3 Por qué inventa | «Mirar dentro de la máquina», «Riesgos y control»; ¿Hecho o alucinación? | complemento |
| 1.4 El encargo | «Claude, Gemini y ChatGPT por dentro»; Snake del encargo | complemento |
| 2.1 Tutor que pregunta | — | **se produce aquí** |
| 2.2 Analizar un fallo | — | **se produce aquí** |
| 2.3 Antes de subir | «Conectores, plugins y repositorios»; Anonimizador | complemento |
| 2.4 Lo que no se delega | «Delegar sin abdicar»; Caza la inyección | directo |
| 3.1 Verificar antes de firmar | — | **producida aquí** (23-10-2026) |
| 3.2 Fuentes chilenas | — | **producida aquí** (23-10-2026) |
| 3.3 Jurisprudencia real | ¿Hecho o alucinación? (sólo el juego) | **producida aquí** (23-10-2026), con el material de la cápsula 1.3 |
| 3.4 Organizar una investigación | — | **producida aquí** (23-10-2026) |
| 4.1 De la idea a la herramienta | «Lo que puedes construir», «Modelos, tokens y costos»; Conecta el flujo | directo |
| 4.2 Primera herramienta | «Tu primera herramienta jurídica», «Recetas reutilizables»; Snake del encargo | directo |
| 4.3 Pruébala | «Probar, mejorar y responder» | directo |
| 4.4 Publica | «Qué es un repositorio», «Darle reglas y ordenarlo» (Guardián del repositorio), «Publicar en Vercel» | directo |

Recorrido optativo **«Lo humano en cuestión»** (en /cursos): transhumanismo, dataísmo, neuroderechos, estatus moral
de las máquinas y el mapa de corrientes y dilemas. No es requisito de ningún curso.

## Lectura estratégica

- **Cursos 1 y 4 ya están casi hechos en EVA ACADEMY.** Ahí la plataforma de la Escuela aporta el marco (objetivo
  verificable, evaluación con clave en el servidor, panel docente) y enlaza la práctica. Producir aquí sólo la
  videocápsula y la evaluación de cada unidad.
- **El curso 3, «Investigar Derecho con IA», no existe en EVA ACADEMY.** Es el valor propio de la plataforma PUCV:
  fuentes chilenas, jurisprudencia, verificación de citas, bitácora. Es la prioridad de producción, y lo que más
  distingue la propuesta frente a un curso general de IA.
- **El curso 2 está a medias:** 2.3 y 2.4 tienen apoyo; 2.1 (tutor) y 2.2 (analizar un fallo) hay que producirlos.
- **La parte filosófica sirve como optativa**, no como núcleo: amplía la mirada y da material para seminarios, pero
  el pedido de la Escuela es práctico.

## Qué no sirve (o no ahora)

| Pieza | Por qué no | Qué hacer |
|---|---|---|
| «Una historia en dos escuelas», «La máquina de cómputo», «Tres giros (2024–2026)» | Buena cultura general, lejos de las tareas de un estudiante de Derecho; «Tres giros» envejece rápido | No enlazar desde las unidades; quedan accesibles en EVA ACADEMY |
| «La otra frontera: computación cuántica» | Fuera del alcance del pedido | No enlazar |
| Proyectos finales de EVA ACADEMY (3.6, 4.6) | Tienen su propia rúbrica y ficha; duplicarían la evaluación de esta plataforma | Las unidades 4.x usan su evaluación propia; el proyecto final se decide con la Escuela |
| XP, niveles, insignias, repaso y retos de EVA ACADEMY | Su avance no se comparte; dos sistemas de puntos confunden | No copiar la gamificación; aquí sólo el avance de unidad y «Ojo clínico» |
| Juegos «Memoria», «Línea de tiempo», «EVADLE» | Repasan vocabulario e hitos; no practican una tarea jurídica | Sólo desde Recursos → Sala de juegos |
| Actividades H5P y su reproductor | Pesan 28 MB y su progreso va por otro canal | No copiar; se usan dentro de EVA ACADEMY |

## Qué se puede reutilizar, y cómo

| Qué | Cómo | Estado |
|---|---|---|
| Lecciones, guías y juegos | Enlace | **Hecho** (bloque «Practica en EVA ACADEMY» en cada unidad) |
| Recorrido filosófico | Enlace | **Hecho** (/cursos#lo-humano) |
| Glosario, Sala, guías | Enlace desde Recursos | **Hecho** |
| Guiones y fuentes de las videocápsulas (`eva.academy/videocapsulas/`) | Ya es la base de la unidad 1.1 | Hecho para 1.1; seguir igual para las otras 15 |
| Marca, avatar y voz de EVA | Mismos archivos de eva.proyecto01 | Hecho |
| Glosario como datos (`glosario.ts`, 38 términos) | Copiar los datos para marcar términos en la lectura, como hace EVA ACADEMY | Pendiente; poco peso |
| Preguntas de las fichas H5P | Fuente de preguntas para las evaluaciones con clave en el servidor | Pendiente; sólo las que pasen revisión jurídica |
| Casos Twine (p. ej. «lo que se subió») | Enlace a la lección que los contiene | Pendiente de elegir por unidad |

## Riesgos y cuidados

- **Revisión jurídica.** Las referencias de EVA ACADEMY también deben pasar la revisión de una persona antes de que
  la Escuela las presente como propias.
- **Direcciones.** Si EVA ACADEMY reordena o renombra una lección, el enlace se rompe. Sus ids son su avance
  guardado y no se renombran por regla; aun así, correr `node scripts/enlaces-academy.mjs` antes de cada publicación.
- **Numeración distinta.** «Módulo 1» allá no es «Curso 1» aquí. Los enlaces usan el nombre de la lección, no el número.

## Más adelante

- Unir el avance: que EVA ACADEMY avise a esta plataforma cuando se termina una lección enlazada (con cuenta, un
  registro por lección; sin cuenta, no es posible entre dos sitios distintos).
- Abrir una lección de EVA ACADEMY dentro de la plataforma, en un marco, si la Escuela prefiere no salir del sitio.
