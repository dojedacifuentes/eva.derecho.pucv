# Arquitectura de información

## Mapa del sitio

```
/                                 Portada: qué es EVA, los cuatro cursos, espacios transversales, estado del prototipo
├─ /cursos                        Índice de los 4 cursos y sus 16 unidades (con estado de cada una)
│  └─ /cursos/[curso]             Ficha del curso: pregunta, resultado, unidades, qué viene después
│     └─ /cursos/[curso]/[unidad] Lección (operativas: Curso 0 completo, c1·u1 y c3·u1; las demás muestran su plan)
│                                 El Curso 0 «¿Qué es la inteligencia artificial?» es el curso de entrada (ids c0-u1…c0-u4);
│                                 añade al paso 06 glosario, «¿Sabías que?», preguntas para discutir y lecturas.
├─ /biblioteca                    Biblioteca de investigación jurídica (fuentes oficiales; módulos en diseño)
├─ /docentes                      Formación y herramientas para docentes (guía de la lección piloto)
├─ /herramientas                  Herramientas especiales con estado y acceso
│  └─ /herramientas/antes-de-subir  Clasificador de documentos antes de subirlos a una IA (operativo, por reglas)
├─ /mi-avance                     Avance propio (en este navegador o en la cuenta)
├─ /docente                       Panel de la sección (rol docente; en modo demostración, con datos ficticios)
├─ /ingresar                      Ingreso por correo (Supabase Auth)
├─ /auth/confirm                  Recibe el enlace del correo y abre la sesión
└─ /acerca                        Método, estado del prototipo, fuentes y privacidad
```

## Navegación

- **Cabecera** (banda oscura): marca EVA · Cursos · Biblioteca · Docentes · Herramientas · Mi avance · Ingresar/Salir.
  En el teléfono, un botón «Menú» que abre la lista completa (con foco atrapado y cierre con Esc).
- **Enlace «Saltar al contenido»** como primer elemento tabulable.
- **Migas** en curso y lección: Cursos › Curso 1 › Unidad 1.
- **Índice de la lección** fijo a la izquierda en escritorio y como barra de pasos en el teléfono, con el estado de
  cada paso.

## Plantilla de lección (igual para las dieciséis)

| # | Paso | Qué contiene | Se marca como hecho cuando |
|---|---|---|---|
| 0 | Ficha | Objetivo verificable, criterio de logro, duración, acceso requerido, revisión jurídica | — |
| 1 | Punto de partida | Pregunta de calibración (1 a 5) y el encargo del curso | Se responde la calibración |
| 2 | EVA presenta | Videocápsula (o la recreación del guion mientras no exista) con subtítulos y semáforo | Se llega al final |
| 3 | Lectura | Texto MDX con notas al margen y fuentes | Se pulsa «Terminé la lectura» |
| 4 | Práctica guiada | Encargo copiable, pasos, variante sin IA, bitácora de tres preguntas, lista de cotejo | Se guarda la bitácora |
| 5 | Evaluación | Preguntas con confianza declarada; corrección en el servidor; retroalimentación y pistas | Se envía (dominio si 4 de 5) |
| 6 | Recursos y fuentes | Fuentes con su estado de verificación, descargas | — |
| 7 | Cierre | Calibración inicial frente al resultado; siguiente unidad | — |

La lección queda **completada** con los pasos 1 a 4 hechos y el **dominio** de la evaluación.

## Estados que se muestran

| Elemento | Estados |
|---|---|
| Unidad | Disponible · En preparación (con su objetivo planificado) |
| Herramienta | Operativa · En diseño · En preparación |
| Acceso | Gratis · Pago · Institucional · Por verificar |
| Fuente | Verificada (fecha) · Por cotejar |
| Revisión jurídica | Pendiente · Aprobada (por quién y cuándo) |
| Avance del estudiante | Sin empezar · En curso · Completada (+ Dominio) |

## Contenido por espacio

- **Biblioteca de investigación jurídica**: búsqueda de doctrina y jurisprudencia chilena; verificación y auditoría de
  referencias; organización de investigaciones. En el prototipo: la lista de fuentes oficiales verificadas y el diseño
  de los tres módulos.
- **Formación para docentes**: cómo usar la lección piloto en clase (antes, durante y después), la lista de cotejo, qué
  revisar del contenido jurídico y la política de uso de IA de la Escuela (por definir).
- **Herramientas especiales**: clasificador «Antes de subir» (operativo); tutoriales de ChatGPT, Claude, Claude Code,
  Codex y navegación asistida (en preparación, con acceso por verificar); juegos y simuladores (el semáforo y la
  conversación recreada de la lección 1); prototipos LegalTech (curso 4).
