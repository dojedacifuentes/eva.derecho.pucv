'use client';

import Link from 'next/link';
import { useAvance } from './usarAvance';

export interface DatosCierre {
  /** Qué midió la calibración inicial, para completar «Al empezar dijiste N/5 …». */
  calibracion: string;
  /** Reflexión si empezó muy confiado (4 o 5) y si no. */
  siConfiaba: string;
  siNo: string;
}

/** La unidad que sigue, según el catálogo; con `href` si ya está disponible. */
export interface Siguiente {
  titulo: string;
  href?: string;
}

/** Cierre: la calibración del inicio frente al resultado, el estado de la lección y lo que viene. */
export function Cierre({ leccionId, datos, siguiente }: { leccionId: string; datos: DatosCierre; siguiente?: Siguiente }) {
  const { avance } = useAvance(leccionId);
  const c = avance.calibracionInicial;
  const m = avance.mejor;
  return (
    <div className="cierre">
      <div className="cierre__fila">
        <div className="panel cierre__dato">
          <p className="rotulo">Al empezar dijiste</p>
          <p className="cierre__cifra">{c ? `${c}/5` : '—'}</p>
          <p>{datos.calibracion}</p>
        </div>
        <div className="panel cierre__dato">
          <p className="rotulo">En la evaluación</p>
          <p className="cierre__cifra">{m ? `${m.correctas}/${m.total}` : '—'}</p>
          <p>{avance.dominio ? 'Dominio logrado.' : 'Aún sin dominio (4 de 5).'}</p>
        </div>
        <div className="panel cierre__dato">
          <p className="rotulo">La lección</p>
          <p className="cierre__cifra">{avance.completada ? '✓' : `${avance.pasos.length}/5`}</p>
          <p>{avance.completada ? 'Completada.' : 'Pasos hechos.'}</p>
        </div>
      </div>
      <p className="cierre__reflexion">{c && c >= 4 ? datos.siConfiaba : datos.siNo}</p>
      <p className="cierre__siguiente">
        {siguiente?.href ? (
          <>
            Siguiente: <Link href={siguiente.href}>{siguiente.titulo} →</Link>
          </>
        ) : (
          <>
            {siguiente && (
              <>
                Siguiente: <strong>{siguiente.titulo}</strong> (en preparación).{' '}
              </>
            )}
            Revisa <Link href="/mi-avance">tu avance</Link> o vuelve a <Link href="/cursos">los cursos</Link>.
          </>
        )}
      </p>
    </div>
  );
}
