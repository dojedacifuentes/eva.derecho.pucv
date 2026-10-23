import type { Metadata } from 'next';
import { MiAvance } from '@/components/avance/MiAvance';
import { modoDemostracion } from '@/lib/config';

export const metadata: Metadata = { title: 'Mi avance' };

export default function PaginaMiAvance() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Mi avance</p>
        <h1 className="titular pagina__titulo">Lo que llevas.</h1>
        <p className="entradilla">
          {modoDemostracion()
            ? 'Sin cuenta: tu avance vive sólo en este navegador. Nadie más lo ve, y si borras los datos del sitio, se pierde.'
            : 'Aquí ves el avance de este navegador. Con tu cuenta, las evaluaciones también quedan guardadas en la plataforma.'}
        </p>
      </header>
      <MiAvance />
    </div>
  );
}
