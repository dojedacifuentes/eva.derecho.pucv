import type { Metadata } from 'next';
import Link from 'next/link';
import { CabezaSeccion } from '@/components/secciones/CabezaSeccion';
import { ListaIndice } from '@/components/secciones/ListaIndice';
import { PARA_ESTUDIANTES } from '@/content/secciones';

export const metadata: Metadata = { title: 'Estudiantes' };

export default function Estudiantes() {
  return (
    <div className="pagina envoltura">
      <CabezaSeccion
        titulo="Estudiantes"
        acciones={
          <Link className="boton boton--primario" href="/cursos/que-es-la-ia">
            Empezar el Curso 0
          </Link>
        }
      >
        No necesitas cuenta: tu avance queda en este navegador. Empieza por el Curso 0 y sigue en orden; cada módulo te
        pide verificar algo en una fuente real.
      </CabezaSeccion>
      <ListaIndice entradas={PARA_ESTUDIANTES} />
      <p className="pagina__nota">
        El curso con juegos y laboratorios de EVA está en <Link href="/recursos#academy">EVA ACADEMY</Link>; las fuentes
        chilenas para investigar, en la <Link href="/biblioteca">Biblioteca</Link>.
      </p>
    </div>
  );
}
