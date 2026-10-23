-- GENERADO por `npm run db:catalogo` desde src/content: no se edita a mano.
-- Catálogo de cursos y lecciones, evaluaciones y su clave (esquema privado).

insert into public.cursos (id, orden, titulo) values ('c0', 0, 'Qué es la IA: lo que dicen las leyes y la ciencia')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c1', 1, 'Cómo funciona la IA y por qué se equivoca')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c2', 2, 'Estudiar y trabajar con IA sin perder el criterio')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c3', 3, 'Investigación jurídica con IA: fuentes, citas y fallos')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c4', 4, 'Crea tus propias herramientas jurídicas con IA')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c5', 5, 'Ética profesional y responsabilidad al usar IA')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c6', 6, 'Prueba digital y deepfakes en el proceso')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;
insert into public.cursos (id, orden, titulo) values ('c7', 7, 'Regulación de la IA en Chile y el mundo')
  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;

insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c0-u1', 'c0', 1, 'Las definiciones que usan las leyes', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c0-u2', 'c0', 2, 'Las dudas recientes: ¿entiende? ¿razona? ¿qué es la AGI?', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c0-u3', 'c0', 3, 'Lo propio de la IA y lo que concedemos', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c0-u4', 'c0', 4, 'De dónde viene «inteligencia» y qué exige ya el Derecho chileno', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c1-u1', 'c1', 1, '¿Qué es una IA? Ponla a tomarte el examen', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c1-u2', 'c1', 2, 'La siguiente palabra: cómo responde un modelo de lenguaje', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c1-u3', 'c1', 3, 'Por qué inventa: citas falsas y la frontera dispareja', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c1-u4', 'c1', 4, 'Cómo pedirle bien: el encargo', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c2-u1', 'c2', 1, 'Estudiar con un tutor que pregunta', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c2-u2', 'c2', 2, 'Analizar un fallo sin perder el criterio', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c2-u3', 'c2', 3, 'Antes de subir: secreto profesional y datos personales', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c2-u4', 'c2', 4, 'Lo que no se delega', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c3-u1', 'c3', 1, 'Verificar antes de firmar', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c3-u2', 'c3', 2, 'Buscar en fuentes chilenas', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c3-u3', 'c3', 3, 'Jurisprudencia real, no inventada', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c3-u4', 'c3', 4, 'Organizar y documentar una investigación', true)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c4-u1', 'c4', 1, 'De una idea jurídica a una herramienta', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c4-u2', 'c4', 2, 'Construye tu primera herramienta', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c4-u3', 'c4', 3, 'Pruébala antes de confiar en ella', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c4-u4', 'c4', 4, 'Publica y comparte con sus límites', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c5-u1', 'c5', 1, 'Secreto profesional y confidencialidad', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c5-u2', 'c5', 2, 'Diligencia: saber usarla y saber cuándo no', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c5-u3', 'c5', 3, 'Transparencia: decirle al cliente cómo trabajas', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c5-u4', 'c5', 4, 'Cuando la IA se equivoca: quién responde', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c6-u1', 'c6', 1, 'Qué es un deepfake y cómo se fabrica', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c6-u2', 'c6', 2, 'Autenticidad y cadena de custodia', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c6-u3', 'c6', 3, 'Cuándo pedir un peritaje digital', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c6-u4', 'c6', 4, 'Valorar la prueba en tiempos de IA', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c7-u1', 'c7', 1, 'El modelo europeo: regular por nivel de riesgo', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c7-u2', 'c7', 2, 'El proyecto de ley chileno sobre IA', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c7-u3', 'c7', 3, 'Datos personales e IA', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;
insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values ('c7-u4', 'c7', 4, 'IA y derechos fundamentales', false)
  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;

insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c0-u1-eval', 'c0-u1', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c0-u1-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u1-eval', 1, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u1-eval', 2, 'v');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u1-eval', 3, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u1-eval', 4, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u1-eval', 5, 'b');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c0-u2-eval', 'c0-u2', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c0-u2-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u2-eval', 1, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u2-eval', 2, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u2-eval', 3, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u2-eval', 4, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u2-eval', 5, 'a');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c0-u3-eval', 'c0-u3', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c0-u3-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u3-eval', 1, 'a');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u3-eval', 2, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u3-eval', 3, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u3-eval', 4, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u3-eval', 5, 'b');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c0-u4-eval', 'c0-u4', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c0-u4-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u4-eval', 1, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u4-eval', 2, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u4-eval', 3, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u4-eval', 4, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c0-u4-eval', 5, 'c');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c1-u1-eval', 'c1-u1', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c1-u1-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c1-u1-eval', 1, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c1-u1-eval', 2, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c1-u1-eval', 3, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c1-u1-eval', 4, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c1-u1-eval', 5, 'c');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c3-u1-eval', 'c3-u1', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c3-u1-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u1-eval', 1, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u1-eval', 2, 'a');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u1-eval', 3, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u1-eval', 4, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u1-eval', 5, 'c');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c3-u2-eval', 'c3-u2', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c3-u2-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u2-eval', 1, 'd');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u2-eval', 2, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u2-eval', 3, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u2-eval', 4, 'a');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u2-eval', 5, 'c');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c3-u3-eval', 'c3-u3', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c3-u3-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u3-eval', 1, 'd');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u3-eval', 2, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u3-eval', 3, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u3-eval', 4, 'a');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u3-eval', 5, 'b');
insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values ('c3-u4-eval', 'c3-u4', 5, 4)
  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;
delete from privado.claves where evaluacion_id = 'c3-u4-eval';
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u4-eval', 1, 'b');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u4-eval', 2, 'a');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u4-eval', 3, 'f');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u4-eval', 4, 'c');
insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values ('c3-u4-eval', 5, 'd');
