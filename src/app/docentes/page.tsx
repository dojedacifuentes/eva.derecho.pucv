import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Para docentes' };

const CLASE = [
  ['5 min', 'Punto de partida', 'Cada estudiante marca su confianza (1 a 5) en que una IA corrige bien. Anota la distribución en la pizarra: se retoma al cierre.'],
  ['6 min', 'EVA presenta', 'Se proyecta la presentación. Pausa en el semáforo: que cada uno marque las dos correcciones antes de seguir.'],
  ['12 min', 'Práctica guiada', 'En parejas, con el encargo del examinador y su propio apunte. Una persona responde; la otra verifica en LeyChile.'],
  ['8 min', 'Evaluación', 'Individual, con la confianza marcada en cada pregunta. La pregunta 4 revela el error de la presentación.'],
  ['10 min', 'Cierre', 'Compara la calibración inicial con los resultados. Pregunta: ¿en qué respuesta estabas seguro y te equivocaste?'],
];

const MIRAR = [
  'Quién estuvo «seguro» y se equivocó: ahí está la trampa de la fluidez, más que en la nota.',
  'Si la bitácora dice dónde verificó (párrafo o enlace). «Lo revisé» no basta.',
  'Si alguien subió material que no debía: es el momento de mostrar «Antes de subir».',
];

export default function Docentes() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Para docentes · guía piloto</p>
        <h1 className="titular pagina__titulo">Lleva la unidad 1.1 a tu clase.</h1>
        <p className="entradilla">
          Cuarenta y cinco minutos, sin cuentas para los estudiantes y sin pedirles datos. Si la Escuela configura el
          ingreso institucional, verás el avance de tu sección en el panel.
        </p>
        <p>
          <Link className="boton boton--primario" href="/cursos/comprender-la-ia/que-es-la-ia">
            Ver la unidad 1.1
          </Link>{' '}
          <Link className="boton" href="/docente">
            Panel de sección (demostración)
          </Link>
        </p>
      </header>

      <section className="bloque" aria-labelledby="t-clase">
        <h2 id="t-clase" className="bloque__titulo">Plan de clase</h2>
        <ol className="plan-clase">
          {CLASE.map(([min, paso, texto]) => (
            <li key={paso} className="panel">
              <span className="mono plan-clase__min">{min}</span>
              <strong>{paso}</strong>
              <span>{texto}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bloque" aria-labelledby="t-mirar">
        <h2 id="t-mirar" className="bloque__titulo">Qué mirar</h2>
        <ul className="lista-simple">
          {MIRAR.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="bloque" aria-labelledby="t-antes">
        <h2 id="t-antes" className="bloque__titulo">Antes de usarla</h2>
        <ul className="lista-simple">
          <li>
            Revisa las fuentes de la unidad: lo marcado «pendiente» (el cotejo del Código Civil en LeyChile y la
            doctrina del §8) lo confirma una persona.
          </li>
          <li>Ajusta la tabla «qué puedes subir a una IA» al reglamento de integridad académica de la Escuela.</li>
          <li>Prueba el encargo del examinador en el asistente que usarán tus estudiantes: los límites de uso cambian.</li>
        </ul>
      </section>
    </div>
  );
}
