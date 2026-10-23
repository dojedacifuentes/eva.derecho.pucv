-- EVA — Plataforma académica de IA y Derecho
-- Esquema inicial: perfiles y roles, catálogo, secciones, avance, intentos y bitácoras.
--
-- Regla de diseño: toda tabla de `public` tiene RLS. Los estudiantes no escriben su avance ni sus puntajes
-- directamente: lo hacen las funciones `marcar_paso` y `enviar_evaluacion`, que validan. La clave de las
-- evaluaciones vive en el esquema `privado`, que la API de Supabase no expone.

create schema if not exists privado;
revoke all on schema privado from public;

-- ---------------------------------------------------------------- tipos

create type public.rol_usuario as enum ('estudiante', 'docente', 'admin');
create type public.paso_leccion as enum ('entrada', 'presentacion', 'lectura', 'practica', 'evaluacion');

-- ---------------------------------------------------------------- perfiles

create table public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre_visible text check (char_length(nombre_visible) <= 80),
  rol public.rol_usuario not null default 'estudiante',
  creado_en timestamptz not null default now()
);
comment on table public.perfiles is 'Una fila por cuenta. El rol sólo lo cambia administración con asignar_rol().';

-- ---------------------------------------------------------------- catálogo (lectura pública)

create table public.cursos (
  id text primary key,
  orden smallint not null unique check (orden between 0 and 9),   -- 0: el curso de entrada
  titulo text not null
);

create table public.lecciones (
  id text primary key,                       -- «c1-u1»: es la llave del avance; no se renombra
  curso_id text not null references public.cursos (id),
  unidad smallint not null check (unidad between 1 and 9),
  titulo text not null,
  publicada boolean not null default false,
  unique (curso_id, unidad)
);

create table public.evaluaciones (
  id text primary key,
  leccion_id text not null unique references public.lecciones (id),
  total smallint not null check (total > 0),
  umbral_dominio smallint not null,
  check (umbral_dominio between 1 and total)
);

create table privado.claves (
  evaluacion_id text not null references public.evaluaciones (id) on delete cascade,
  pregunta smallint not null check (pregunta > 0),
  opcion_correcta text not null,
  primary key (evaluacion_id, pregunta)
);

-- ---------------------------------------------------------------- secciones

create table public.secciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  codigo_ramo text,                          -- para cruzar con el sistema académico
  periodo text not null,                     -- p. ej. «2027-1»
  docente_id uuid not null references public.perfiles (id),
  creado_en timestamptz not null default now()
);
create index on public.secciones (docente_id);

create table public.inscripciones (
  seccion_id uuid not null references public.secciones (id) on delete cascade,
  estudiante_id uuid not null references public.perfiles (id) on delete cascade,
  primary key (seccion_id, estudiante_id)
);
create index on public.inscripciones (estudiante_id);

-- ---------------------------------------------------------------- avance

create table public.progreso (
  estudiante_id uuid not null references public.perfiles (id) on delete cascade,
  leccion_id text not null references public.lecciones (id),
  pasos public.paso_leccion[] not null default '{}',
  dominio boolean not null default false,
  completada boolean not null default false,
  calibracion_inicial smallint check (calibracion_inicial between 1 and 5),
  actualizado_en timestamptz not null default now(),
  primary key (estudiante_id, leccion_id)
);

create table public.intentos (
  id uuid primary key default gen_random_uuid(),
  estudiante_id uuid not null references public.perfiles (id) on delete cascade,
  evaluacion_id text not null references public.evaluaciones (id),
  respuestas jsonb not null,
  correctas smallint not null,
  total smallint not null,
  creado_en timestamptz not null default now()
);
create index on public.intentos (estudiante_id, evaluacion_id);

create table public.bitacoras (
  estudiante_id uuid not null default auth.uid() references public.perfiles (id) on delete cascade,
  leccion_id text not null references public.lecciones (id),
  que_pedi text not null default '' check (char_length(que_pedi) <= 2000),
  que_verifique text not null default '' check (char_length(que_verifique) <= 2000),
  que_haria_distinto text not null default '' check (char_length(que_haria_distinto) <= 2000),
  compartida boolean not null default false,
  actualizado_en timestamptz not null default now(),
  primary key (estudiante_id, leccion_id)
);

-- ---------------------------------------------------------------- funciones auxiliares de permisos
-- SECURITY DEFINER para que las políticas no se llamen a sí mismas en bucle; search_path vacío por seguridad.

create function public.es_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin');
$$;

create function public.es_docente_de(p_estudiante uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.inscripciones i
    join public.secciones s on s.id = i.seccion_id
    join public.perfiles p on p.id = s.docente_id
    where i.estudiante_id = p_estudiante
      and s.docente_id = auth.uid()
      and p.rol in ('docente', 'admin')
  );
$$;

create function public.esta_inscrito_en(p_seccion uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.inscripciones where seccion_id = p_seccion and estudiante_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------- privilegios
-- Supabase da por defecto todos los privilegios a anon y authenticated sobre las tablas de public.
-- Se quitan y se conceden sólo los necesarios; RLS filtra las filas.

revoke all on all tables in schema public from anon, authenticated;
revoke all on all tables in schema privado from anon, authenticated;

grant select on public.cursos, public.lecciones, public.evaluaciones to anon, authenticated;
grant select on public.perfiles, public.secciones, public.inscripciones,
  public.progreso, public.intentos, public.bitacoras to authenticated;
grant update (nombre_visible) on public.perfiles to authenticated;
grant insert (leccion_id, que_pedi, que_verifique, que_haria_distinto, compartida),
  update (que_pedi, que_verifique, que_haria_distinto, compartida, actualizado_en),
  delete on public.bitacoras to authenticated;

-- ---------------------------------------------------------------- RLS

alter table public.perfiles enable row level security;
alter table public.cursos enable row level security;
alter table public.lecciones enable row level security;
alter table public.evaluaciones enable row level security;
alter table public.secciones enable row level security;
alter table public.inscripciones enable row level security;
alter table public.progreso enable row level security;
alter table public.intentos enable row level security;
alter table public.bitacoras enable row level security;
alter table privado.claves enable row level security;  -- sin políticas: nadie fuera de las funciones

create policy "catálogo visible" on public.cursos for select to anon, authenticated using (true);
create policy "catálogo visible" on public.lecciones for select to anon, authenticated using (true);
create policy "catálogo visible" on public.evaluaciones for select to anon, authenticated using (true);

create policy "ver mi perfil, el de mis estudiantes o todos si administro" on public.perfiles
  for select to authenticated
  using (id = (select auth.uid()) or public.es_docente_de(id) or public.es_admin());
create policy "editar mi nombre" on public.perfiles
  for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "ver secciones propias o en que estoy inscrito" on public.secciones
  for select to authenticated
  using (docente_id = (select auth.uid()) or public.esta_inscrito_en(id) or public.es_admin());

create policy "ver inscripciones propias o de mis secciones" on public.inscripciones
  for select to authenticated
  using (
    estudiante_id = (select auth.uid())
    or exists (select 1 from public.secciones s where s.id = seccion_id and s.docente_id = (select auth.uid()))
    or public.es_admin()
  );

create policy "ver mi avance o el de mis estudiantes" on public.progreso
  for select to authenticated
  using (estudiante_id = (select auth.uid()) or public.es_docente_de(estudiante_id) or public.es_admin());

create policy "ver mis intentos o los de mis estudiantes" on public.intentos
  for select to authenticated
  using (estudiante_id = (select auth.uid()) or public.es_docente_de(estudiante_id) or public.es_admin());

create policy "ver mi bitácora o la compartida por mis estudiantes" on public.bitacoras
  for select to authenticated
  using (estudiante_id = (select auth.uid()) or (compartida and public.es_docente_de(estudiante_id)));
create policy "escribir mi bitácora" on public.bitacoras
  for insert to authenticated with check (estudiante_id = (select auth.uid()));
create policy "editar mi bitácora" on public.bitacoras
  for update to authenticated
  using (estudiante_id = (select auth.uid())) with check (estudiante_id = (select auth.uid()));
create policy "borrar mi bitácora" on public.bitacoras
  for delete to authenticated using (estudiante_id = (select auth.uid()));

-- ---------------------------------------------------------------- perfil al crear la cuenta

create function privado.crear_perfil()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.perfiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

create trigger crear_perfil_al_registrarse
  after insert on auth.users
  for each row execute function privado.crear_perfil();

-- ---------------------------------------------------------------- funciones que escriben el avance

-- Una lección queda completada con los pasos entrada, presentacion, lectura y practica, y el dominio.
create function privado.recalcular(p public.progreso)
returns public.progreso
language plpgsql immutable set search_path = ''
as $$
begin
  p.completada := p.dominio
    and p.pasos @> array['entrada', 'presentacion', 'lectura', 'practica']::public.paso_leccion[];
  p.actualizado_en := now();
  return p;
end;
$$;

create function public.marcar_paso(p_leccion text, p_paso public.paso_leccion, p_calibracion smallint default null)
returns public.progreso
language plpgsql security definer set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_fila public.progreso;
begin
  if v_uid is null then
    raise exception 'Se requiere una sesión' using errcode = '42501';
  end if;
  if p_paso = 'evaluacion' then
    raise exception 'La evaluación se registra con enviar_evaluacion' using errcode = '22023';
  end if;
  if not exists (select 1 from public.lecciones where id = p_leccion and publicada) then
    raise exception 'Lección no disponible' using errcode = '22023';
  end if;
  if p_calibracion is not null and (p_paso <> 'entrada' or p_calibracion not between 1 and 5) then
    raise exception 'Calibración inválida' using errcode = '22023';
  end if;

  insert into public.progreso (estudiante_id, leccion_id)
  values (v_uid, p_leccion)
  on conflict (estudiante_id, leccion_id) do nothing;

  select * into v_fila from public.progreso
  where estudiante_id = v_uid and leccion_id = p_leccion
  for update;

  if not (v_fila.pasos @> array[p_paso]) then
    v_fila.pasos := v_fila.pasos || p_paso;
  end if;
  if p_calibracion is not null and v_fila.calibracion_inicial is null then
    v_fila.calibracion_inicial := p_calibracion;
  end if;
  v_fila := privado.recalcular(v_fila);

  update public.progreso
  set pasos = v_fila.pasos, calibracion_inicial = v_fila.calibracion_inicial,
      completada = v_fila.completada, actualizado_en = v_fila.actualizado_en
  where estudiante_id = v_uid and leccion_id = p_leccion;

  return v_fila;
end;
$$;

-- Corrige en la base: el navegador sólo manda las opciones elegidas. Devuelve el detalle por pregunta.
-- p_respuestas: {"1": {"opcion": "c", "confianza": "seguro"}, ..., "semaforo": {...}} (claves extra se guardan tal cual)
create function public.enviar_evaluacion(p_evaluacion text, p_respuestas jsonb)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_eval public.evaluaciones;
  v_clave record;
  v_correctas smallint := 0;
  v_detalle jsonb := '[]'::jsonb;
  v_opcion text;
  v_acierto boolean;
  v_fila public.progreso;
  v_hoy integer;
begin
  if v_uid is null then
    raise exception 'Se requiere una sesión' using errcode = '42501';
  end if;
  select * into v_eval from public.evaluaciones where id = p_evaluacion;
  if not found or not exists (select 1 from public.lecciones where id = v_eval.leccion_id and publicada) then
    raise exception 'Evaluación no disponible' using errcode = '22023';
  end if;
  if jsonb_typeof(p_respuestas) <> 'object' or pg_column_size(p_respuestas) > 8000 then
    raise exception 'Respuestas inválidas' using errcode = '22023';
  end if;

  -- Freno simple contra envíos en masa: 30 intentos por evaluación cada 24 horas.
  select count(*) into v_hoy from public.intentos
  where estudiante_id = v_uid and evaluacion_id = p_evaluacion and creado_en > now() - interval '24 hours';
  if v_hoy >= 30 then
    raise exception 'Demasiados intentos; vuelve mañana' using errcode = '54000';
  end if;

  for v_clave in
    select pregunta, opcion_correcta from privado.claves where evaluacion_id = p_evaluacion order by pregunta
  loop
    v_opcion := p_respuestas -> v_clave.pregunta::text ->> 'opcion';
    v_acierto := v_opcion is not null and v_opcion = v_clave.opcion_correcta;
    if v_acierto then
      v_correctas := v_correctas + 1;
    end if;
    v_detalle := v_detalle || jsonb_build_object(
      'pregunta', v_clave.pregunta, 'correcta', v_acierto, 'opcion_correcta', v_clave.opcion_correcta
    );
  end loop;

  insert into public.intentos (estudiante_id, evaluacion_id, respuestas, correctas, total)
  values (v_uid, p_evaluacion, p_respuestas, v_correctas, v_eval.total);

  insert into public.progreso (estudiante_id, leccion_id)
  values (v_uid, v_eval.leccion_id)
  on conflict (estudiante_id, leccion_id) do nothing;

  select * into v_fila from public.progreso
  where estudiante_id = v_uid and leccion_id = v_eval.leccion_id
  for update;

  if not (v_fila.pasos @> array['evaluacion']::public.paso_leccion[]) then
    v_fila.pasos := v_fila.pasos || 'evaluacion'::public.paso_leccion;
  end if;
  v_fila.dominio := v_fila.dominio or v_correctas >= v_eval.umbral_dominio;
  v_fila := privado.recalcular(v_fila);

  update public.progreso
  set pasos = v_fila.pasos, dominio = v_fila.dominio, completada = v_fila.completada,
      actualizado_en = v_fila.actualizado_en
  where estudiante_id = v_uid and leccion_id = v_eval.leccion_id;

  return jsonb_build_object(
    'correctas', v_correctas,
    'total', v_eval.total,
    'dominio', v_fila.dominio,
    'completada', v_fila.completada,
    'detalle', v_detalle
  );
end;
$$;

-- Administración: cambiar el rol de una cuenta.
create function public.asignar_rol(p_usuario uuid, p_rol public.rol_usuario)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.es_admin() then
    raise exception 'Sólo administración asigna roles' using errcode = '42501';
  end if;
  update public.perfiles set rol = p_rol where id = p_usuario;
end;
$$;

-- Todo lo que la plataforma guarda de quien consulta (portabilidad).
create function public.mis_datos()
returns jsonb
language sql stable security definer set search_path = ''
as $$
  select jsonb_build_object(
    'perfil', (select to_jsonb(p) from public.perfiles p where p.id = auth.uid()),
    'inscripciones', coalesce((select jsonb_agg(to_jsonb(i)) from public.inscripciones i where i.estudiante_id = auth.uid()), '[]'),
    'progreso', coalesce((select jsonb_agg(to_jsonb(g)) from public.progreso g where g.estudiante_id = auth.uid()), '[]'),
    'intentos', coalesce((select jsonb_agg(to_jsonb(t)) from public.intentos t where t.estudiante_id = auth.uid()), '[]'),
    'bitacoras', coalesce((select jsonb_agg(to_jsonb(b)) from public.bitacoras b where b.estudiante_id = auth.uid()), '[]')
  )
  where auth.uid() is not null;
$$;

-- Las funciones se ejecutan sólo con sesión (PostgreSQL las abre a PUBLIC por defecto).
revoke execute on all functions in schema public from public, anon;
revoke execute on all functions in schema privado from public, anon, authenticated;
grant execute on function public.marcar_paso(text, public.paso_leccion, smallint),
  public.enviar_evaluacion(text, jsonb),
  public.asignar_rol(uuid, public.rol_usuario),
  public.mis_datos(),
  public.es_admin(),
  public.es_docente_de(uuid),
  public.esta_inscrito_en(uuid)
  to authenticated;
