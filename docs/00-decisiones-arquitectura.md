# Decisiones de arquitectura

Primer entregable de EVA — Plataforma académica de IA y Derecho (propuesta para la Escuela de Derecho PUCV).
Redactado el 22-10-2026, antes de escribir código. Cada decisión dice qué se eligió, por qué y qué queda abierto.

## D1. Proyecto nuevo, separado de EVA ACADEMY

- **Qué:** repositorio propio en `PROYECTO EVA01/eva.derecho`. No reutiliza la interfaz de EVA ACADEMY ni de Moodle.
- **Por qué:** EVA ACADEMY es un sitio estático sin cuentas (el avance vive en el navegador). Esta plataforma necesita
  cuentas, roles (estudiante, docente, administración), datos protegidos y, después, integración institucional. Mezclar
  los dos modelos en un repositorio haría frágiles a ambos.
- **Qué se reutiliza:** el contenido ya investigado y verificado de la serie de videocápsulas (`eva.academy/videocapsulas/curso-1/`,
  `eva.academy/reports/`), el retrato de EVA y sus colores. El texto se adapta, no se copia la presentación.

## D2. Pila técnica

| Capa | Elección | Motivo |
|---|---|---|
| Interfaz y servidor | Next.js 16 (App Router) + React 19 + TypeScript | Versión ya probada en EVA ACADEMY; Server Components y Server Actions dejan la lógica sensible en el servidor |
| Estilos | Tailwind CSS 4 con variables de diseño propias (`@theme`) | La retícula y los tokens viven en un solo archivo (`src/app/globals.css`) |
| Contenido | MDX (`@next/mdx`) para el texto de lecciones y guías; TypeScript para estructura y evaluaciones | El texto lo puede editar un docente sin tocar componentes; las preguntas quedan tipadas |
| Cuentas | Supabase Auth con enlace o código por correo (sin contraseñas) | No construimos autenticación propia; el correo institucional basta para un piloto |
| Datos | Supabase PostgreSQL con RLS en todas las tablas | La protección vive en la base, no sólo en la interfaz |
| Pruebas | Vitest + PGlite (PostgreSQL real compilado a WebAssembly) + Playwright | Las políticas RLS se prueban con el mismo SQL que va a producción, sin Docker |
| Despliegue de prueba | Vercel (o cualquier servicio compatible con Next.js) | Igual que EVA ACADEMY |

Sin Docker en este equipo, el CLI de Supabase local no corre. Por eso las pruebas de base de datos usan PGlite con una
réplica mínima del esquema `auth` de Supabase (`tests/db/supabase-shim.sql`): la función `auth.uid()` y los roles
`anon` y `authenticated` se comportan como en Supabase.

## D3. Dos modos de funcionamiento, siempre rotulados

| Modo | Cuándo | Dónde se guarda el avance | Qué se ve |
|---|---|---|---|
| **Demostración** | No hay credenciales de Supabase configuradas | En este navegador (`localStorage`) | Franja fija «Modo demostración»; «Ingresar» explica que las cuentas no están activas |
| **Con cuenta** | Hay Supabase y la persona ingresó | En PostgreSQL, protegido por RLS | Su avance en cualquier equipo; el docente ve el de sus secciones |
| Sin sesión, con Supabase | Hay Supabase pero la persona no ingresó | En este navegador, con aviso | Invitación a ingresar para guardar |

Nada se presenta como operativo si no lo está: los módulos aún no construidos aparecen como «En preparación» o «En
diseño», con lo que harán y sin botones falsos.

## D4. La evaluación se corrige en el servidor

- Las preguntas y opciones llegan al navegador; **la clave y la retroalimentación no**, hasta que se envía la respuesta.
- La clave vive en `src/content/evaluaciones/*.clave.ts` (marcado `server-only`) y se copia a la tabla `privado.claves`
  con `npm run db:catalogo` (una prueba falla si quedan desalineadas).
- Con cuenta, corrige la función de base de datos `enviar_evaluacion` (SECURITY DEFINER): la persona no puede escribir
  su puntaje ni su avance directamente, sólo a través de funciones que validan.
- Sin cuenta, corrige una Server Action con la misma clave, y la misma función de puntaje (`calificar`) se prueba contra
  la versión SQL.

## D5. Roles y permisos (detalle en `04-modelo-datos.md`)

- **Estudiante:** lee el catálogo; ve y modifica sólo lo suyo; su bitácora es privada salvo que la comparta.
- **Docente:** ve el avance e intentos de quienes están inscritos en **sus** secciones; ve una bitácora sólo si el
  estudiante la compartió. No modifica avances.
- **Administración:** asigna roles y crea secciones (por función `asignar_rol`, no por edición directa).
- El rol nunca se cambia desde la interfaz del propio usuario: la columna no es editable por `authenticated`.

## D6. Identidad visual «Academic Tech Editorial»

Retícula de 12 columnas con márgenes de lectura (máx. ~68 caracteres), tipografía serif para leer (Source Serif 4),
sans para la interfaz (IBM Plex Sans) y monoespaciada para la capa técnica (IBM Plex Mono). Superficie clara tipo papel
para leer; bandas oscuras para encabezados y la presentación de EVA. Separadores de filete y numeración de secciones en
lugar de tarjetas redondeadas. Detalle en `05-sistema-visual.md`.

## D7. EVA como presentadora

La videocápsula 1.1 todavía no está grabada (el guion espera revisión jurídica). La lección muestra una **presentación
animada del guion**, con el texto exacto de la voz como subtítulo y el rótulo «Recreación del guion · el video con la
voz de EVA está en producción». Cuando exista `public/videos/c1-u1.mp4`, el componente lo muestra en su lugar con
subtítulos. No se simula un video que no existe.

## D8. Seguridad

- Ninguna clave en el repositorio: `.env.local` está en `.gitignore`; `.env.example` sólo trae nombres.
- La app usa **sólo** la clave pública (`anon`) de Supabase; la de servicio no se usa en la app.
- Redirecciones después de ingresar: sólo rutas internas (`rutaSegura`), para evitar redirecciones abiertas.
- Cabeceras de seguridad (CSP, `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`) en `next.config.ts`.
- Los datos de prueba son ficticios (`@example.com`, dominio reservado para ejemplos).

## D9. Preparado para la integración institucional

- `perfiles` separa la identidad (Supabase Auth) del rol académico: un SSO institucional (SAML u OAuth) se conecta en
  Supabase sin cambiar las tablas.
- `secciones` lleva `codigo_ramo` y `periodo` para cruzar con el sistema académico.
- `mis_datos()` devuelve todo lo que la plataforma guarda de una persona (portabilidad, Ley 21.719).
- Variable `DOMINIOS_PERMITIDOS` para limitar el ingreso a correos institucionales en el piloto.

## Estructura del proyecto

```
eva.derecho/
├─ docs/                    documentos del entregable (auditoría, visión, arquitectura, datos, diseño, operación)
├─ supabase/
│  ├─ migrations/           esquema, RLS y funciones (SQL que va a producción)
│  └─ seed.sql              datos ficticios de demostración
├─ scripts/catalogo-sql.mjs genera la migración del catálogo y la clave desde src/content
├─ src/
│  ├─ app/                  rutas (portada, cursos, lección, biblioteca, docentes, herramientas, ingresar, mi avance, docente)
│  ├─ components/           sistema visual (marco, tipografía) y componentes de lección (EVA, semáforo, evaluación…)
│  ├─ content/              catálogo de cursos, lecciones MDX, evaluaciones y claves
│  ├─ lib/                  Supabase, avance, calificación, rutas seguras
│  └─ proxy.ts              refresca la sesión y protege rutas privadas
├─ tests/                   Vitest: RLS (PGlite), calificación, avance, autenticación
└─ e2e/                     Playwright: recorrido completo de la lección en modo demostración
```

## Lo que queda abierto (decisiones del propietario o de la Escuela)

1. Nombre definitivo y dominio. Hoy: «EVA — Plataforma académica de IA y Derecho».
2. Crear el proyecto de Supabase (requiere una cuenta; no lo hace este asistente) y decidir región y plan.
3. Si el ingreso se limita a correos `@pucv.cl` / `@mail.pucv.cl` (por confirmar los dominios con la Escuela).
4. Revisión jurídica de la lección piloto antes de mostrarla a estudiantes (ver `RESULTADO.md`).
