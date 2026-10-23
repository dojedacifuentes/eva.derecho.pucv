import type { Metadata } from 'next';
import { IndiceCursos } from '@/components/cursos/IndiceCursos';
import { RecorridoFilosofico } from '@/components/cursos/RecorridoFilosofico';
import { CabezaSeccion } from '@/components/secciones/CabezaSeccion';
import { CURSOS } from '@/content/catalogo';

export const metadata: Metadata = { title: 'Cursos' };

export default function Cursos() {
  const modulos = CURSOS.flatMap((c) => c.unidades);
  const disponibles = modulos.filter((u) => u.estado === 'disponible').length;
  return (
    <div className="pagina envoltura">
      <CabezaSeccion titulo="Cursos">
        Ocho cursos de cuatro módulos, del qué es la IA a cómo se regula. Cada módulo abre con una tarea jurídica real y
        termina con una evaluación. Hoy puedes hacer {disponibles} de los {modulos.length} módulos; abre un curso para ver
        los suyos.
      </CabezaSeccion>
      <IndiceCursos abierto="c0" />
      <RecorridoFilosofico />
    </div>
  );
}
