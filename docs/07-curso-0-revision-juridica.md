# 07 · Curso 0 «¿Qué es la inteligencia artificial?»: qué debe cotejar el revisor jurídico

Armado el 23-10-2026 a partir del apunte `eva.academy/reports/Apunte concepto de inteligencia artificial.md` (fuentes
al 20-10-2026). Las cuatro unidades (`c0-u1` a `c0-u4`) están disponibles en el sitio con la ficha marcada «Revisión
jurídica pendiente». Nada de lo que sigue debe presentarse a los alumnos como seguro sin cotejo. Dentro de cada lectura,
los mismos puntos aparecen como avisos «Por cotejar»; en «Recursos y fuentes», como fuentes «Pendiente».

## Cómo revisar

1. Abrir cada unidad en `/cursos/que-es-la-ia/<unidad>` y leer la lectura (paso 03) con esta lista al lado.
2. Para cada punto: confirmar en la fuente primaria, corregir el texto en `src/content/lecciones/c0-uN-lectura.mdx` y
   cambiar el estado en `src/content/lecciones/c0-uN-fuentes.ts` de `pendiente` a `verificada` (o quitar el dato).
3. Cuando todo esté cotejado, cambiar la etiqueta de la ficha (hoy fija en «Revisión jurídica pendiente» en
   `src/app/cursos/[curso]/[unidad]/page.tsx`) por «Aprobada (quién, cuándo)».

## Unidad 0.1 · Las definiciones que usan las leyes

- **Estado del proyecto de ley chileno (Boletín 16821-19).** Se verificó el Mensaje (2024) y las noticias del Senado.
  No se obtuvo el oficio de la Cámara del 13 de octubre de 2025: no consta si el art. 3 n.º 1 cambió en el primer
  trámite. No se confirmó si la indicación sustitutiva de «ley marco» anunciada en 2026 ingresó ni si altera la
  definición. El último trámite (1 de septiembre de 2026, urgencia simple) se leyó en un portal privado. **Revisar en
  senado.cl y camara.cl.**
- **Directrices de la Comisión Europea (6 de febrero de 2025).** Se citan por resúmenes de estudios jurídicos; los
  «siete elementos» y las exclusiones (heurísticas clásicas, regresión lineal) deben cotejarse con el PDF.
- **Convenio Marco del Consejo de Europa.** No se confirmó el número de ratificaciones ni la entrada en vigor: una
  fuente decía vigencia desde el 1 de noviembre de 2025 y otra ratificación de la UE el 15 de mayo de 2026.
- **Los 38.477 escritos (julio de 2026).** Sólo prensa (Diario Constitucional, 28-07-2026); sin expediente ni informe
  técnico a la vista.
- **UNESCO, párrafo 2.** Verificado en la página de asuntos jurídicos de UNESCO; el PDF de UNESDOC dio error.

## Unidad 0.2 · Las dudas recientes

- **Apple, «La ilusión del pensamiento», y la réplica de Lawsen (arXiv:2506.09250).** Citados por sus resúmenes.
- **«On the Biology of a Large Language Model» (Anthropic, marzo de 2025).** Se leyó poco más de la mitad; las cifras
  del 25 % y 39 % vienen de la publicación de abril de 2025 y la del 20 % de la de octubre.
- **ARC-AGI-3.** Conflicto de datos no resuelto: prensa de marzo-abril de 2026 situaba a los mejores modelos bajo el
  0,4 %; la tabla oficial leída por herramienta automática el 20-10-2026 mostraba hasta 99,95 %. La lección no cita
  cifras. Confirmar en el navegador antes de usar alguna.
- **Índice de IA de Stanford 2026.** La fecha de publicación (13 de abril) es de cobertura secundaria.

## Unidad 0.3 · Lo propio de la IA y lo que concedemos

- **Cuadrantes de Russell y Norvig.** Verificados en la Enciclopedia de Stanford, no en el manual.
- **Definición de «aprender» de Tom Mitchell (1997).** Fuente secundaria.
- **Citas sólo secundarias que el apunte menciona y la lección NO usa:** Pearl («curve fitting»), Sutskever
  (compresión), el «modelo estándar» de Russell en *Human Compatible*, Floridi («divorce between agency and
  intelligence», fragmento), las cifras del experimento de BCG (758 consultores). Si se quieren añadir, cotejar primero.

## Unidad 0.4 · De dónde viene «inteligencia» y qué exige ya el Derecho chileno

- **Ley 21.719, art. 8 bis.** El texto oficial y la fecha de vigencia (1 de diciembre de 2026) no pudieron abrirse en
  LeyChile al redactar el apunte; se citan por Diario Constitucional (22-07-2025). La práctica de la unidad pide al
  estudiante verificarlo. **Prioridad alta: es una norma vigente que la lección cita.**
- **Rol 23.322-2025.** La fecha de la resolución (22 de abril de 2026) se verificó en el fallo; la noticia judicial es
  del 3 de junio. Que las citas salieron de un chatbot lo dice la noticia oficial, no el fallo. El curso no usa el
  nombre de la abogada.
- **Caso de Concepción (C-6127-2025, multa de 1 UTM).** Sólo prensa (CNN Chile, 05-02-2026).
- **Resolución 372/2024 del CPLT, 92 sistemas en 42 organismos; Sistema Alerta Niñez; ILIA 2025.** Fragmentos o no
  encontrado. La lección no los usa; están en el apunte.
- **Psicometría.** Fechas de Galton, Stern, Terman, Yerkes, Gardner, Goleman y Flynn: Wikipedia como agregador. El voto
  8-1 de *Buck v. Bell* no consta en la página abierta (no se cita).
- **Dartmouth.** El presupuesto de $13.500 no tiene fuente primaria (no se cita). La fecha de la reseña de McCarthy
  sobre Bloomfield (c. 1988-89) no consta.
- **«As soon as it works, no one calls it AI».** No aparece textual en ninguna fuente primaria; la atribución a
  McCarthy apareció tras su muerte (Quote Investigator, 2024). La lección lo dice así.
- **Minsky y «suitcase word» aplicado a «inteligencia».** Sólo un perfil biográfico; la lección no lo usa.
- **RAE.** La entrada del DLE se leyó con herramienta de línea de comandos; el año 1992 y la «palabra del año 2022» son
  de prensa y no se usan.
- **Turing.** La paginación correcta es 433-460; *Antiqua et nova* la cita como 443-460.
- **Wiktionary («intellego»).** Diccionario colaborativo: cotejar con un diccionario latino académico si se quiere citar.

## Decisiones de redacción que el revisor puede querer cambiar

- La palabra «desafío» no se usa en el sitio; la comisión del Senado que estudia el proyecto se nombra sin su nombre
  propio por esa razón. Si el revisor prefiere el nombre oficial, está en el apunte.
- Las citas en inglés se dejan en inglés con traducción o paráfrasis en el texto, como en el apunte.
- EVA dice en cada guion que es una inteligencia artificial.
- Los guiones de «EVA presenta» son recreaciones mientras no exista la cápsula; no incluyen ningún dato marcado
  «pendiente».
