import Link from 'next/link';
import { MarcaConjunta } from '@/components/marca/MarcaConjunta';
import { Menu } from './Menu';
import { SelectorTema } from './SelectorTema';

export const NAVEGACION = [
  { href: '/cursos', texto: 'Cursos' },
  { href: '/recursos', texto: 'Recursos' },
  { href: '/docentes', texto: 'Docentes' },
  { href: '/biblioteca', texto: 'Biblioteca' },
  { href: '/mi-avance', texto: 'Mi avance' },
];

export function Cabecera({ demo }: { demo: boolean }) {
  return (
    <header className="cabecera zona-oscura">
      <div className="envoltura cabecera__fila">
        <Link href="/" className="cabecera__marca" aria-label="Inicio · EVA × Derecho PUCV">
          <MarcaConjunta tamano="cabecera" />
        </Link>
        <nav aria-label="Principal" className="cabecera__nav">
          <ul>
            {NAVEGACION.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="cabecera__acciones">
          <SelectorTema />
          <Link href="/ingresar" className="boton cabecera__ingresar">
            {demo ? 'Demo' : 'Ingresar'}
          </Link>
          <Menu enlaces={NAVEGACION} />
        </div>
      </div>
    </header>
  );
}
