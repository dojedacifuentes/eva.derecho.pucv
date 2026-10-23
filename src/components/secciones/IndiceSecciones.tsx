import Link from 'next/link';
import { CURSOS, type Curso } from '@/content/catalogo';
import { PARA_DOCENTES, PARA_ESTUDIANTES, type Entrada } from '@/content/secciones';

/* El índice de la portada: las cuatro secciones en columnas, con todo su contenido y el estado de cada línea. */
const abiertos = (c: Curso) => c.unidades.filter((u) => u.estado === 'disponible').length;

export function Punto({ lleno }: { lleno: boolean }) {
  return (
    <span className="punto" data-lleno={lleno ? 'si' : undefined}>
      <span className="sr-only">{lleno ? 'disponible' : 'en preparación'}</span>
    </span>
  );
}

function Columna({ titulo, href, children }: { titulo: string; href: string; children: React.ReactNode }) {
  return (
    <div className="indice__columna">
      <h3 className="indice__seccion">
        <Link href={href}>{titulo}</Link>
      </h3>
      <ol className="indice__lista">{children}</ol>
    </div>
  );
}

function Linea({ href, numero, texto, lleno }: { href: string; numero?: string; texto: string; lleno: boolean }) {
  return (
    <li>
      <Link href={href} className="indice__linea">
        {numero !== undefined && <span className="indice__numero">{numero}</span>}
        <span className="indice__texto">{texto}</span>
        <Punto lleno={lleno} />
      </Link>
    </li>
  );
}

const entradas = (lista: Entrada[]) =>
  lista.map((e) => <Linea key={e.href} href={e.href} texto={e.titulo} lleno={e.disponible} />);

export function IndiceSecciones() {
  return (
    <div className="indice__columnas">
      <Columna titulo="Cursos" href="/cursos">
        {CURSOS.map((c) => (
          <Linea key={c.id} href={`/cursos/${c.slug}`} numero={String(c.numero)} texto={c.titulo} lleno={abiertos(c) > 0} />
        ))}
      </Columna>
      <Columna titulo="Videocápsulas" href="/videocapsulas">
        {CURSOS.map((c) => (
          <Linea key={c.id} href="/videocapsulas" numero={String(c.numero)} texto={`Las cuatro del curso ${c.numero}`} lleno={false} />
        ))}
      </Columna>
      <Columna titulo="Docentes" href="/docentes">
        {entradas(PARA_DOCENTES)}
      </Columna>
      <Columna titulo="Estudiantes" href="/estudiantes">
        {entradas(PARA_ESTUDIANTES)}
      </Columna>
    </div>
  );
}
