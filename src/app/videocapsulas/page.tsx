import type { Metadata } from 'next';
import { CabezaSeccion } from '@/components/secciones/CabezaSeccion';
import { RejillaCapsulas } from '@/components/secciones/RejillaCapsulas';

export const metadata: Metadata = { title: 'Videocápsulas' };

/* Maqueta (23-10-2026): el lugar de las videocápsulas de EVA. Se enlazan desde el canal de EVA cuando se graben. */
export default function Videocapsulas() {
  return (
    <div className="pagina envoltura">
      <CabezaSeccion titulo="Videocápsulas">
        Una explicación de tres minutos por módulo, para el aula, y una versión corta para repasar. Todavía no hay
        ninguna publicada: cada casilla se convertirá en un enlace cuando su cápsula esté lista.
      </CabezaSeccion>
      <RejillaCapsulas />
    </div>
  );
}
