-- DATOS FICTICIOS DE DEMOSTRACIÓN. Ninguna persona es real: nombres inventados y correos en example.com
-- (dominio reservado para ejemplos, RFC 2606). Sólo para un Supabase local o de prueba, nunca para producción.
-- Los mismos datos alimentan el panel docente en modo demostración (src/content/demo.ts) y las pruebas.

insert into auth.users (id, email) values
  ('00000000-0000-4000-8000-0000000000a1', 'admin.demo@example.com'),
  ('00000000-0000-4000-8000-0000000000d1', 'docente.uno@example.com'),
  ('00000000-0000-4000-8000-0000000000d2', 'docente.dos@example.com'),
  ('00000000-0000-4000-8000-0000000000e1', 'estudiante.uno@example.com'),
  ('00000000-0000-4000-8000-0000000000e2', 'estudiante.dos@example.com'),
  ('00000000-0000-4000-8000-0000000000e3', 'estudiante.tres@example.com'),
  ('00000000-0000-4000-8000-0000000000e4', 'estudiante.cuatro@example.com');

update public.perfiles set rol = 'admin', nombre_visible = 'Administración (demo)' where id = '00000000-0000-4000-8000-0000000000a1';
update public.perfiles set rol = 'docente', nombre_visible = 'Docente Uno (ficticio)' where id = '00000000-0000-4000-8000-0000000000d1';
update public.perfiles set rol = 'docente', nombre_visible = 'Docente Dos (ficticio)' where id = '00000000-0000-4000-8000-0000000000d2';
update public.perfiles set nombre_visible = 'Estudiante Uno (ficticio)' where id = '00000000-0000-4000-8000-0000000000e1';
update public.perfiles set nombre_visible = 'Estudiante Dos (ficticio)' where id = '00000000-0000-4000-8000-0000000000e2';
update public.perfiles set nombre_visible = 'Estudiante Tres (ficticio)' where id = '00000000-0000-4000-8000-0000000000e3';
update public.perfiles set nombre_visible = 'Estudiante Cuatro (ficticio)' where id = '00000000-0000-4000-8000-0000000000e4';

insert into public.secciones (id, nombre, codigo_ramo, periodo, docente_id) values
  ('00000000-0000-4000-8000-00000000005a', 'Introducción al Derecho · Sección demo A', 'DEMO-101', '2027-1', '00000000-0000-4000-8000-0000000000d1'),
  ('00000000-0000-4000-8000-00000000005b', 'Introducción al Derecho · Sección demo B', 'DEMO-101', '2027-1', '00000000-0000-4000-8000-0000000000d2');

insert into public.inscripciones (seccion_id, estudiante_id) values
  ('00000000-0000-4000-8000-00000000005a', '00000000-0000-4000-8000-0000000000e1'),
  ('00000000-0000-4000-8000-00000000005a', '00000000-0000-4000-8000-0000000000e2'),
  ('00000000-0000-4000-8000-00000000005a', '00000000-0000-4000-8000-0000000000e3'),
  ('00000000-0000-4000-8000-00000000005b', '00000000-0000-4000-8000-0000000000e4');

insert into public.progreso (estudiante_id, leccion_id, pasos, dominio, completada, calibracion_inicial) values
  ('00000000-0000-4000-8000-0000000000e1', 'c1-u1', '{entrada,presentacion,lectura,practica,evaluacion}', true, true, 4),
  ('00000000-0000-4000-8000-0000000000e2', 'c1-u1', '{entrada,presentacion,lectura}', false, false, 5),
  ('00000000-0000-4000-8000-0000000000e3', 'c1-u1', '{entrada,presentacion,lectura,practica,evaluacion}', false, false, 2),
  ('00000000-0000-4000-8000-0000000000e4', 'c1-u1', '{entrada}', false, false, 3);

insert into public.intentos (estudiante_id, evaluacion_id, respuestas, correctas, total) values
  ('00000000-0000-4000-8000-0000000000e1', 'c1-u1-eval',
   '{"1":{"opcion":"c","confianza":"seguro"},"2":{"opcion":"f","confianza":"seguro"},"3":{"opcion":"b","confianza":"dudoso"},"4":{"opcion":"b","confianza":"dudoso","pistas":0},"5":{"opcion":"c","confianza":"seguro"},"semaforo":{"c1":"verde","c2":"rojo"}}',
   5, 5),
  ('00000000-0000-4000-8000-0000000000e3', 'c1-u1-eval',
   '{"1":{"opcion":"c","confianza":"seguro"},"2":{"opcion":"v","confianza":"seguro"},"3":{"opcion":"b","confianza":"seguro"},"4":{"opcion":"a","confianza":"seguro","pistas":1},"5":{"opcion":"b","confianza":"dudoso"}}',
   2, 5);

insert into public.bitacoras (estudiante_id, leccion_id, que_pedi, que_verifique, que_haria_distinto, compartida) values
  ('00000000-0000-4000-8000-0000000000e1', 'c1-u1', 'Que me hiciera cinco preguntas sobre los arts. 19 a 24.', 'La corrección sobre el art. 21, en el §4 del apunte.', 'Responder sin mirar el apunte desde la primera pregunta.', true),
  ('00000000-0000-4000-8000-0000000000e3', 'c1-u1', 'Preguntas del apunte.', 'Nada todavía.', 'Verificar al menos una corrección.', false);
