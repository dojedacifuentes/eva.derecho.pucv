import Link from 'next/link';
import { EscudoPlano } from '@/components/marca/EscudoPlano';
import { IndiceSecciones } from '@/components/secciones/IndiceSecciones';

/*
 * Portada «Plano» (23-10-2026): dos diapositivas del alto de la pantalla.
 *   1. El escudo de la Facultad dibujado como plano, con las cuatro secciones anotadas a cada lado (simétrico).
 *   2. El índice: todo lo que hay en la plataforma, en cuatro columnas.
 */
const LLAMADAS = {
  izquierda: [
    { href: '/cursos', titulo: 'Cursos', texto: 'Ocho cursos de cuatro módulos, cada uno con una tarea jurídica real y una evaluación.' },
    { href: '/videocapsulas', titulo: 'Videocápsulas', texto: 'Una explicación de tres minutos por módulo, publicada a medida que se graba.' },
  ],
  derecha: [
    { href: '/docentes', titulo: 'Docentes', texto: 'Guías escritas, planes de clase y lecturas recomendadas.' },
    { href: '/estudiantes', titulo: 'Estudiantes', texto: 'Por dónde empezar, herramientas y tu avance, sin crear cuenta.' },
  ],
};

export default function Portada() {
  return (
    <div className="diapos">
      <section className="diapo plano" aria-labelledby="t-portada">
        <div className="envoltura plano__marco">
          <header className="plano__cabeza">
            <p className="rotulo">Escuela de Derecho de la Pontificia Universidad Católica de Valparaíso</p>
            <h1 id="t-portada" className="plano__titulo recorte-115">
              Inteligencia artificial para la profesión legal
            </h1>
          </header>

          <div className="plano__lamina">
            {(['izquierda', 'derecha'] as const).map((lado) => (
              <ul key={lado} className={`plano__llamadas plano__llamadas--${lado}`}>
                {LLAMADAS[lado].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="llamada">
                      <span className="llamada__titulo">{l.titulo}</span>
                      <span className="llamada__texto">{l.texto}</span>
                      <span className="llamada__guia" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
            <EscudoPlano className="plano__escudo" />
          </div>

          <p className="plano__acciones">
            <Link className="boton boton--primario" href="/estudiantes">
              Soy estudiante
            </Link>
            <Link className="boton" href="/docentes">
              Soy docente
            </Link>
          </p>
        </div>
      </section>

      <section className="diapo" aria-labelledby="t-indice">
        <div className="envoltura indice">
          <header className="indice__cabeza">
            <h2 id="t-indice" className="indice__titulo recorte-115">
              Todo lo que hay en la plataforma
            </h2>
            <p className="indice__bajada">
              Cada línea lleva a su página. El punto lleno marca lo que ya puedes usar; el vacío, lo que está en
              preparación.
            </p>
          </header>
          <IndiceSecciones />
        </div>
      </section>
    </div>
  );
}
