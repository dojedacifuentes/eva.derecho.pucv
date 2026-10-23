import Link from 'next/link';
import { NAVEGACION } from './Cabecera';

/* Pie del plano: una línea de enlaces y una de estado, entre dos trazos. */
export function Pie({ demo }: { demo: boolean }) {
  return (
    <footer className="pie">
      <div className="envoltura pie__fila">
        <nav aria-label="Secciones" className="pie__nav">
          {NAVEGACION.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.texto}
            </Link>
          ))}
          <Link href="/acerca">Método, fuentes y privacidad</Link>
          <Link href="/acerca#creditos">Créditos</Link>
        </nav>
        <p className="pie__texto">
          Prototipo de la Escuela de Derecho de la Pontificia Universidad Católica de Valparaíso y EVA. El contenido
          jurídico está en revisión docente. {demo ? 'Tu avance se guarda sólo en este navegador. ' : ''}EVA es una
          inteligencia artificial: también se equivoca.
        </p>
      </div>
    </footer>
  );
}
