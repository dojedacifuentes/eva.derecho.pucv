import type { Metadata } from 'next';
import Link from 'next/link';
import { ACADEMY } from '@/content/academy';
import { RECURSOS } from '@/content/recursos';

export const metadata: Metadata = { title: 'Recursos' };

/** Tutoriales planificados, de básico a avanzado. Los planes y precios cambian: se revisan antes de publicar cada uno. */
const TUTORIALES = [
  {
    nivel: 'Básico',
    nombre: 'ChatGPT para estudiar',
    texto: 'Que te examine, no que te responda; dónde desactivar el uso de tus conversaciones para entrenar.',
    acceso: [['gratis', 'Gratis']],
  },
  {
    nivel: 'Básico',
    nombre: 'Claude para estudiar',
    texto: 'Proyectos con tus apuntes, el encargo del examinador y cómo pedir que cite el párrafo.',
    acceso: [['gratis', 'Gratis']],
  },
  {
    nivel: 'Intermedio',
    nombre: 'Investigar con IA sin inventar',
    texto: 'Búsqueda con fuentes, verificación de citas y qué no delegar nunca.',
    acceso: [
      ['gratis', 'Gratis'],
      ['pago', 'Pago'],
    ],
  },
  {
    nivel: 'Avanzado',
    nombre: 'Claude Code y Codex',
    texto: 'Construir una herramienta jurídica pequeña: un repositorio, un encargo claro y pruebas.',
    acceso: [['pago', 'Pago']],
  },
  {
    nivel: 'Avanzado',
    nombre: 'Navegación asistida',
    texto: 'Dejar que una IA use el navegador: permisos, cuentas reales y lo que nunca debe hacer sola.',
    acceso: [
      ['pago', 'Pago'],
      ['institucional', 'Institucional'],
    ],
  },
] as const;

export default function Recursos() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Recursos</p>
        <h1 className="titular pagina__titulo">Todo lo que hay. Y lo que todavía no.</h1>
        <p className="entradilla">Cada recurso dice su estado real y si es gratis, de pago o institucional.</p>
      </header>

      <ul className="tarjetas">
        {RECURSOS.map((r) => (
          <li key={r.id} className="panel tarjeta">
            <p className="tarjeta__cifra mono">{r.cifra}</p>
            <h2 className="tarjeta__titulo">
              <Link href={r.href}>{r.nombre}</Link>
            </h2>
            <p className="tarjeta__texto">{r.texto}</p>
            <p className="tarjeta__etiquetas">
              {r.etiquetas.map((e) => (
                <span key={e.texto} className="etiqueta" data-tono={e.tono}>
                  {e.texto}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>

      <section id="guias" className="bloque" aria-labelledby="t-guias">
        <h2 id="t-guias" className="bloque__titulo">Guías</h2>
        <p className="bloque__texto">
          Una guía por unidad, para imprimir o repasar: el objetivo, lo esencial, el ejercicio, la autoevaluación y las
          fuentes verificadas. Saldrán de las mismas páginas de cada unidad, así que no se desactualizan.{' '}
          <span className="etiqueta" data-tono="preparacion">
            En preparación
          </span>
        </p>
      </section>

      <section id="academy" className="bloque" aria-labelledby="t-academy">
        <h2 id="t-academy" className="bloque__titulo">EVA ACADEMY</h2>
        <p className="bloque__texto">
          El curso gamificado de EVA: 30 lecciones en diapositivas, laboratorios, casos con decisiones y juegos. Cada
          unidad de esta plataforma enlaza lo que le sirve; aquí está entero. Se abre en otra pestaña y guarda su avance
          en tu navegador.{' '}
          <span className="etiqueta" data-tono="gratis">
            Gratis
          </span>
        </p>
        <ul className="tarjetas">
          {(
            [
              ['/', 'El curso completo', 'Cuatro módulos: dentro de la máquina, la frontera, construir y publicar.'],
              ['/sala', 'Sala de juegos', 'Diez juegos cortos: alucinaciones, inyecciones, anonimizar, el encargo.'],
              ['/glosario', 'Glosario', 'Los términos del curso, explicados sin jerga.'],
              ['/guia', 'Guías de estudio', 'Lo esencial de cada lección, con autoevaluación y fuentes, también en PDF.'],
            ] as const
          ).map(([ruta, nombre, texto]) => (
            <li key={ruta} className="panel tarjeta">
              <h3 className="tarjeta__titulo">
                <a href={`${ACADEMY}${ruta}`} target="_blank" rel="noreferrer">
                  {nombre} <span aria-hidden="true">↗</span>
                </a>
              </h3>
              <p className="tarjeta__texto">{texto}</p>
            </li>
          ))}
        </ul>
        <p className="bloque__texto">
          Recorrido optativo: <Link href="/cursos#lo-humano">Lo humano en cuestión</Link> (transhumanismo, dataísmo,
          neuroderechos, estatus moral de las máquinas).
        </p>
      </section>

      <section id="tutoriales" className="bloque" aria-labelledby="t-tutoriales">
        <h2 id="t-tutoriales" className="bloque__titulo">Tutoriales</h2>
        <p className="bloque__texto">
          De básico a avanzado. Todos <span className="etiqueta" data-tono="preparacion">en preparación</span>; los
          planes y precios de cada producto cambian, así que cada tutorial los revisa el día que se publica.
        </p>
        <ol className="tutoriales">
          {TUTORIALES.map((t) => (
            <li key={t.nombre} className="tutorial">
              <span className="tutorial__nivel mono">{t.nivel}</span>
              <span className="tutorial__cuerpo">
                <strong>{t.nombre}</strong>
                <span className="tutorial__texto">{t.texto}</span>
              </span>
              <span className="tutorial__acceso">
                {t.acceso.map(([tono, texto]) => (
                  <span key={tono} className="etiqueta" data-tono={tono}>
                    {texto}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
