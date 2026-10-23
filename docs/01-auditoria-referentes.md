# Auditoría metodológica de los referentes

Lectura hecha el 22-10-2026 con lectura automática (WebFetch, `curl`) y el navegador integrado. No se copiaron textos,
diseños, código ni elementos de marca: se describen patrones con palabras propias. Lo que no se pudo ver va marcado
**(no verificado)**.

| Sitio | Qué se abrió | Lectura |
|---|---|---|
| brilliant.org | Portada, `/courses/`, `/courses/logic-deduction/` | Completa en esas páginas; **ninguna lección por dentro** (la entrada pasa por un registro) |
| theodinproject.com | `/paths`, ruta Foundations, lección «The Box Model», proyecto «Recipes» | Completa |
| khanacademy.org | Curso de Álgebra 1 y su unidad 1, en el navegador | Completa; el centro de ayuda respondió 403: la regla exacta de dominio queda **(no verificado)** |
| gsd.harvard.edu | Portada, `/research/projects/` (parcial), programa M.Arch I | Como texto: retícula, tipografía y color **(no verificado)** |
| media.mit.edu | Página de proyectos (parcial), proyecto OctoStudio, grupo Lifelong Kindergarten | Como texto, sin imágenes |

## 1. Brilliant: el problema antes que la explicación

**Patrones.** El método declarado es resolver antes de recibir la teoría (cómo se aplica dentro de una lección: no
verificado). Los cursos se dividen en niveles cortos que cierran con un repaso del tramo. La ficha de cada curso tiene
siempre tres bloques: descripción, temas y requisitos/siguientes pasos. Declara un diagnóstico inicial y un plan que se
adapta (funcionamiento: no verificado).

**No trasladar.** Rótulos por curso escolar y tono de acertijo para todo público; pedir perfil y motivaciones antes de
mostrar contenido.

**En EVA.** Cada lección abre con un **punto de partida** (una pregunta de calibración y el encargo del curso) antes
de la explicación. La ficha del curso declara objetivo, unidades y qué viene después.

## 2. The Odin Project: ruta explícita y proyectos intercalados

**Patrones.** Un tronco común en orden fijo; cada ítem rotulado «lección» o «proyecto»; plantilla fija de lección
(introducción, objetivos, contenido breve, tarea con fuentes externas numeradas); proyectos en iteraciones con
requisitos verificables; ver soluciones ajenas sólo después de terminar la propia.

**No trasladar.** Instalar herramientas y usar terminal desde el inicio; lecciones que son casi sólo enlaces, sin
autocomprobación.

**En EVA.** Cuatro cursos en orden recomendado, con la misma plantilla de lección (objetivo verificable → EVA presenta
→ lectura → práctica → evaluación → recursos). Los recursos son fuentes oficiales (LeyChile, Poder Judicial) en orden,
con el motivo de cada una. El curso 4 (crear herramientas) pide entregas numeradas con lista de cotejo y sin instalar
nada.

## 3. Khan Academy: dominio por habilidad, evaluación repartida

**Patrones.** Cinco estados visibles por habilidad (de «no empezado» a «dominado»); ritmo fijo de práctica,
mini-control y prueba de unidad; separación entre «aprender» y «practicar»; puntos con tope anunciado; aviso «¿no te
sientes listo?» hacia un curso previo.

**No trasladar.** Que los puntos sean el centro; dividir el contenido en cientos de microhabilidades.

**En EVA.** Cada lección tiene **un** objetivo con su criterio de logro («dominio»: 4 de 5 en la evaluación y una
corrección verificada en la práctica). El avance muestra pasos y dominio, no puntos. La retroalimentación compara la
**confianza** declarada con el acierto (calibración), que en Derecho importa más que la velocidad.

## 4. Harvard GSD: identidad editorial y obra con créditos

**Patrones.** Menú por públicos; página de programa con secuencia fija (título, fechas, menú propio, presentación,
galería de trabajos con autor, profesor y semestre); separación entre lo vigente y lo histórico; rótulos de sección
sobrios; eventos con metadatos tipificados.

**No trasladar.** Llamadas a la acción repetidas; fichas sin fecha (en Derecho la vigencia importa).

**En EVA.** Cada lección lleva una **ficha editorial**: responsable, estado de la revisión jurídica, fecha de
verificación de fuentes. Entradas por público: estudiantes (cursos), docentes (formación), investigación (biblioteca).
Rótulos en versalitas y jerarquía de títulos sin saltos.

## 5. MIT Media Lab: proyectos experimentales con pertenencia y límites

**Patrones.** Fichas uniformes con tipo, título y grupo; buscador con filtros por tipo y año; menú propio de cada
proyecto con preguntas frecuentes (incluida la privacidad); misión del grupo en una frase; licencias y créditos
declarados.

**No trasladar.** Etiquetas desbordadas sin criterio; presentar lo experimental como producto terminado.

**En EVA.** Cada herramienta tiene su ficha con **estado** (operativa, en diseño, en preparación), **acceso** (gratis,
pago, institucional, por verificar) y «qué datos usa». Lo que aún no funciona se rotula así.

## Síntesis

| Referente | Principio que tomamos | Cómo se implementa en EVA | Qué evitamos |
|---|---|---|---|
| Brilliant | Problema antes que teoría | Punto de partida y semáforo antes de la revelación | Pedir datos antes del contenido |
| The Odin Project | Ruta explícita, plantilla fija, proyectos con iteraciones | Plantilla única de lección; curso 4 con entregas y lista de cotejo | Instalar herramientas al inicio |
| Khan Academy | Dominio por objetivo y evaluación repartida | Criterio de dominio por lección; calibración confianza/acierto | Que los puntos manden |
| Harvard GSD | Sobriedad editorial; obra con créditos y fechas | Ficha editorial con revisión jurídica y fecha de verificación | Llamadas a la acción repetidas |
| MIT Media Lab | Fichas uniformes con estado y límites declarados | Estado y acceso en cada herramienta; «qué datos usa» | Mostrar lo experimental como terminado |
