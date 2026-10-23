import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SECCION_DEMO, type FilaPanel, type SeccionPanel } from '@/content/demo-docente';
import type { EnvioEvaluacion } from '@/content/evaluaciones/tipos';
import { calificar, segurosErrados } from '@/lib/evaluacion/calificar';
import { obtenerEvaluacionConClave } from '@/lib/evaluacion/claves.server';
import { clienteServidor, sesionActual } from '@/lib/supabase/servidor';

export const metadata: Metadata = { title: 'Panel docente' };
export const dynamic = 'force-dynamic';

const LECCION = 'c1-u1';

/**
 * Panel de sección para la unidad 1.1. Con Supabase: sólo docentes y administración, y lo que se ve lo limita RLS
 * (las políticas `es_docente_de`). En modo demostración: datos ficticios, rotulados como tales.
 */
export default async function PanelDocente() {
  const supabase = await clienteServidor();
  let secciones: SeccionPanel[];
  let demo = false;

  if (!supabase) {
    secciones = [SECCION_DEMO];
    demo = true;
  } else {
    const sesion = await sesionActual();
    if (!sesion) redirect('/ingresar?siguiente=/docente');
    if (sesion.rol === 'estudiante') {
      return (
        <div className="pagina envoltura">
          <header className="pagina__cabeza">
            <h1 className="titular pagina__titulo">Este panel es para docentes.</h1>
            <p className="entradilla">
              Tu cuenta es de estudiante. Si eres docente, pide a la administración de la plataforma que asigne tu rol.
            </p>
            <p>
              <Link href="/mi-avance">Ver mi avance →</Link>
            </p>
          </header>
        </div>
      );
    }
    secciones = await seccionesDe(supabase, sesion.id, sesion.rol === 'admin');
  }

  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Panel docente · unidad 1.1</p>
        <h1 className="titular pagina__titulo">Tu sección, sin pedirle datos a nadie.</h1>
        {demo && (
          <p className="aviso-pagina mono">
            <span className="etiqueta" data-tono="pendiente">
              Datos ficticios
            </span>{' '}
            Modo demostración: no hay base de datos configurada. Estas personas no existen.
          </p>
        )}
      </header>
      {secciones.length === 0 && <p className="entradilla">Aún no tienes secciones asignadas.</p>}
      {secciones.map((s) => (
        <section key={s.nombre} className="bloque" aria-label={s.nombre}>
          <h2 className="bloque__titulo">
            {s.nombre} <span className="mono panel-docente__periodo">{s.periodo}</span>
          </h2>
          <Resumen filas={s.filas} />
          <div className="tabla-desplazable">
            <table className="panel-docente">
              <thead>
                <tr>
                  <th scope="col">Estudiante</th>
                  <th scope="col">Pasos</th>
                  <th scope="col">Evaluación</th>
                  <th scope="col">Seguro y errado</th>
                  <th scope="col">Confianza inicial</th>
                  <th scope="col">Bitácora</th>
                </tr>
              </thead>
              <tbody>
                {s.filas.map((f) => (
                  <tr key={f.estudiante}>
                    <th scope="row">{f.estudiante}</th>
                    <td>{f.completada ? 'Completada' : `${f.pasos}/5`}</td>
                    <td>{f.correctas === null ? '—' : `${f.correctas}/5 ${f.dominio ? '· dominio' : ''}`}</td>
                    <td data-alerta={f.segurosErrados ? 'si' : undefined}>{f.segurosErrados ?? '—'}</td>
                    <td>{f.calibracion ?? '—'}</td>
                    <td>{f.bitacoraCompartida ? 'Compartida' : 'Privada'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function Resumen({ filas }: { filas: FilaPanel[] }) {
  const completadas = filas.filter((f) => f.completada).length;
  const fluidez = filas.filter((f) => (f.segurosErrados ?? 0) > 0).length;
  return (
    <p className="panel-docente__resumen">
      {filas.length} estudiantes · {completadas} con la unidad completada · {fluidez} con alguna respuesta «segura»
      equivocada: con ese grupo conviene repasar la regla «lo que corrige, se verifica».
    </p>
  );
}

type Cliente = NonNullable<Awaited<ReturnType<typeof clienteServidor>>>;

async function seccionesDe(supabase: Cliente, docenteId: string, admin: boolean): Promise<SeccionPanel[]> {
  let consulta = supabase.from('secciones').select('id, nombre, periodo, inscripciones(estudiante_id)');
  if (!admin) consulta = consulta.eq('docente_id', docenteId);
  const { data: secs } = await consulta;
  if (!secs?.length) return [];

  const ids = [...new Set(secs.flatMap((s) => (s.inscripciones ?? []).map((i: { estudiante_id: string }) => i.estudiante_id)))];
  const [{ data: perfiles }, { data: progreso }, { data: intentos }, { data: bitacoras }] = await Promise.all([
    supabase.from('perfiles').select('id, nombre_visible').in('id', ids),
    supabase.from('progreso').select('estudiante_id, pasos, dominio, completada, calibracion_inicial').eq('leccion_id', LECCION).in('estudiante_id', ids),
    supabase.from('intentos').select('estudiante_id, correctas, respuestas, creado_en').eq('evaluacion_id', `${LECCION}-eval`).in('estudiante_id', ids).order('creado_en', { ascending: false }),
    supabase.from('bitacoras').select('estudiante_id').eq('leccion_id', LECCION).in('estudiante_id', ids),
  ]);

  return secs.map((s) => ({
    nombre: s.nombre,
    periodo: s.periodo ?? '',
    filas: (s.inscripciones ?? []).map(({ estudiante_id: id }: { estudiante_id: string }, k: number) => {
      const p = progreso?.find((x) => x.estudiante_id === id);
      const ultimo = intentos?.find((x) => x.estudiante_id === id);
      return {
        estudiante: perfiles?.find((x) => x.id === id)?.nombre_visible ?? `Estudiante ${k + 1}`,
        pasos: p?.pasos?.length ?? 0,
        dominio: !!p?.dominio,
        completada: !!p?.completada,
        calibracion: p?.calibracion_inicial ?? null,
        correctas: ultimo?.correctas ?? null,
        segurosErrados: ultimo ? contarSegurosErrados(ultimo.respuestas) : null,
        // RLS sólo deja ver las bitácoras compartidas: si aparece, está compartida.
        bitacoraCompartida: !!bitacoras?.some((b) => b.estudiante_id === id),
      };
    }),
  }));
}

/** Se recalcula en el servidor con la clave (nunca llega al navegador): cuántas veces dijo «seguro» y se equivocó. */
function contarSegurosErrados(respuestas: unknown) {
  const datos = obtenerEvaluacionConClave(`${LECCION}-eval`);
  if (!datos || !respuestas || typeof respuestas !== 'object') return null;
  const r = calificar(datos.clave, { respuestas: respuestas as EnvioEvaluacion['respuestas'] }, datos.evaluacion.umbral);
  return segurosErrados(r.detalle);
}
