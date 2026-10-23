# Visión de producto

## En una frase

EVA es una plataforma académica donde estudiantes y docentes de Derecho aprenden a **usar la inteligencia artificial con
criterio jurídico**: entender qué es, usarla en tareas reales del estudio y la profesión, verificar lo que produce y,
al final, construir herramientas pequeñas y responsables.

## El problema

- Casi todos los estudiantes ya usan IA (en la U. de Chile, el 81 % de quienes ingresaron en 2025, sobre todo para
  resolver dudas; Encuesta Única de Admisión 2025). Les falta **criterio**, no acceso.
- La profesión ya fijó deberes: la Corte Suprema (rol 23.322-2025) sancionó a una abogada por citar obras inexistentes,
  y la guía del Colegio de Abogados (julio de 2026) exige verificar personalmente toda cita. La verificación hecha por
  otra IA no cuenta.
- Usar la IA para que responda puede dañar el aprendizaje: en el estudio de Bastani et al. (PNAS, 2025), quienes
  practicaron con un chat que daba respuestas rindieron 17 % menos en la prueba sin IA.

(Fuentes y salvedades en `eva.academy/videocapsulas/curso-1/1.1-examen/FUENTES.md`.)

## Para quién

| Público | Qué necesita | Qué le da EVA |
|---|---|---|
| Estudiante de Derecho (primer público) | Usar IA sin dejar de aprender y sin cometer faltas | Cursos cortos con práctica real, retroalimentación inmediata y avance guardado |
| Docente | Integrar IA en su ramo con reglas claras | Guías de uso de cada lección, panel de avance de sus secciones, formación |
| Investigador / ayudante | Investigar en fuentes chilenas sin citas falsas | Biblioteca de investigación: búsqueda, verificación y organización |
| Escuela | Un piloto medible e integrable | Roles, secciones, datos protegidos, exportación |

## Principios

1. **Primero un uso con resultado visible; el concepto justo a tiempo.** Desde la primera lección hay una tarea jurídica
   real (estudiar los arts. 19 a 24 del Código Civil con una IA examinadora), sin saltarse qué es la IA.
2. **La verificación va dentro de cada lección**, no al final del curso: cada lección esconde un error para encontrar.
3. **Un objetivo verificable por lección**, con criterio de logro conocido de antemano.
4. **EVA presenta, el estudiante decide.** EVA es una IA que dice que es una IA y que también se equivoca.
5. **Honestidad del producto**: lo que no funciona se rotula; lo no verificado no entra a la voz de EVA ni a una
   afirmación del curso.
6. **Gratis primero.** Cada práctica dice qué acceso requiere: gratis, pago o institucional.

## Arquitectura académica

Cuatro cursos × cuatro unidades = dieciséis videocápsulas de EVA (3:00 para el aula, 1:30 para redes):

| Curso | Pregunta que responde | Resultado del curso |
|---|---|---|
| 1. Comprender la inteligencia artificial | ¿Qué es y por qué se equivoca? | Explica cómo produce respuestas un modelo de lenguaje y por qué puede fallar, a partir de casos jurídicos, para decidir cómo pedirle un trabajo |
| 2. Aprender y trabajar con IA | ¿Cómo la uso sin dejar de aprender ni romper deberes? | Usa la IA para estudiar y analizar documentos, protegiendo datos y sin delegar lo indelegable |
| 3. Investigar Derecho con IA | ¿Cómo investigo sin citas falsas? | Investiga una pregunta jurídica chilena con IA, verificando en fuentes oficiales y documentando el proceso |
| 4. Crear herramientas jurídicas | ¿Cómo construyo algo útil y seguro? | Crea un prototipo LegalTech simple, probado y documentado, a partir de un problema real |

Espacios transversales: **Biblioteca de investigación jurídica** y **Formación y herramientas para docentes**.

El orden toma la recomendación del informe de diseño instruccional (Comprender → Responder → Aplicar → Crear) y la
adapta a los cuatro cursos pedidos; la decisión del propietario de empezar por usos con resultado visible se respeta
dentro de cada lección.

## Qué es éxito en el piloto

- El 80 % de quienes empiezan la lección 1 la termina (medible con `progreso`).
- Calibración: en la evaluación, baja la proporción de respuestas «seguro» incorrectas entre el primer y el segundo
  intento.
- Los docentes del piloto pueden ver el avance de su sección sin pedir datos a nadie.
- Cero datos personales reales en pruebas; cero claves en el repositorio.

## Qué no es

- No es un LMS ni una réplica de Moodle: no gestiona notas oficiales, matrícula ni asistencia.
- No da asesoría jurídica ni conecta la IA con cuentas reales de nadie.
- No reemplaza la revisión docente: cada lección pasa por un profesor antes de publicarse.
