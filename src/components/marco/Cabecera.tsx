import Link from 'next/link';
import { MarcaSobria } from '@/components/marca/MarcaSobria';
import { Menu } from './Menu';
import { SelectorTema } from './SelectorTema';

/** Las cuatro secciones del sitio, en el mismo orden en la cabecera, la portada y el pie. */
export const NAVEGACION = [
  { href: '/cursos', texto: 'Cursos' },
  { href: '/videocapsulas', texto: 'Videocápsulas' },
  { href: '/docentes', texto: 'Docentes' },
  { href: '/estudiantes', texto: 'Estudiantes' },
];

/** Lo que va sólo en el menú del teléfono, después de las cuatro secciones. */
const EXTRAS = [
  { href: '/mi-avance', texto: 'Mi avance' },
  { href: '/herramientas', texto: 'Herramientas' },
  { href: '/recursos', texto: 'Tutoriales y EVA ACADEMY' },
  { href: '/biblioteca', texto: 'Biblioteca' },
  { href: '/acerca', texto: 'Acerca' },
  { href: '/ingresar', texto: 'Ingresar' },
];

/* Barra del plano: marca a la izquierda, las cuatro secciones al centro exacto, avance, tema e ingreso a la derecha. */
export function Cabecera({ demo }: { demo: boolean }) {
  return (
    <header className="cabecera">
      <div className="envoltura cabecera__fila">
        <Link href="/" className="cabecera__marca" aria-label="Inicio · Derecho PUCV × EVA">
          <MarcaSobria />
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
          <Link href="/mi-avance" className="cabecera__ingresar cabecera__avance">
            Mi avance
          </Link>
          <SelectorTema />
          <Link href="/ingresar" className="cabecera__ingresar" title={demo ? 'Modo demostración: el avance queda en este navegador' : undefined}>
            Ingresar
          </Link>
          <Menu enlaces={[...NAVEGACION, ...EXTRAS]} />
        </div>
      </div>
    </header>
  );
}
