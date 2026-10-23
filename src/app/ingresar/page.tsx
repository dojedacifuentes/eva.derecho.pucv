import type { Metadata } from 'next';
import Link from 'next/link';
import { FormIngreso } from '@/components/ingreso/FormIngreso';
import { rutaSegura } from '@/lib/auth/rutas';
import { modoDemostracion } from '@/lib/config';
import { sesionActual } from '@/lib/supabase/servidor';
import { cerrarSesion } from './acciones';

export const metadata: Metadata = { title: 'Ingresar' };

type Parametros = { searchParams: Promise<{ siguiente?: string; error?: string }> };

export default async function Ingresar({ searchParams }: Parametros) {
  const { siguiente, error } = await searchParams;
  const destino = rutaSegura(siguiente);

  if (modoDemostracion()) {
    return (
      <div className="pagina envoltura">
        <header className="pagina__cabeza">
          <p className="rotulo rotulo--acento">Modo demostración</p>
          <h1 className="titular pagina__titulo">No necesitas cuenta.</h1>
          <p className="entradilla">
            Este prototipo funciona sin cuentas: eliges si eres estudiante o docente en la portada y tu avance queda en
            este navegador. El ingreso institucional (con enlace por correo, sin contraseñas) se activa cuando la Escuela
            conecte su base de datos.
          </p>
          <p>
            <Link className="boton boton--primario" href="/cursos">
              Ir a los cursos
            </Link>{' '}
            <Link className="boton" href="/docente">
              Ver el panel docente con datos ficticios
            </Link>
          </p>
        </header>
      </div>
    );
  }

  const sesion = await sesionActual();
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Ingresar</p>
        <h1 className="titular pagina__titulo">{sesion ? 'Ya ingresaste.' : 'Sin contraseña: te enviamos un enlace.'}</h1>
        {error && <p className="evaluacion__error">El enlace venció o ya se usó. Pide otro.</p>}
      </header>
      {sesion ? (
        <div className="ingreso panel">
          <p>
            Con {sesion.correo ?? 'tu cuenta'} · rol {sesion.rol}.
          </p>
          <p>
            <Link className="boton boton--primario" href={sesion.rol === 'estudiante' ? '/mi-avance' : '/docente'}>
              Continuar
            </Link>
          </p>
          <form action={cerrarSesion}>
            <button type="submit" className="boton">
              Cerrar sesión
            </button>
          </form>
        </div>
      ) : (
        <FormIngreso siguiente={destino} />
      )}
    </div>
  );
}
