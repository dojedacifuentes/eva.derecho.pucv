import type { Metadata } from 'next';
import Link from 'next/link';
import { CabezaSeccion } from '@/components/secciones/CabezaSeccion';
import { ListaIndice } from '@/components/secciones/ListaIndice';
import { PARA_DOCENTES } from '@/content/secciones';

export const metadata: Metadata = { title: 'Docentes' };

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
      <CabezaSeccion titulo="Docentes">
        Guías escritas para llevar cada módulo a clase, planes de clase y lecturas recomendadas. Los estudiantes no
        necesitan cuenta ni entregan datos; si la Escuela activa el ingreso institucional, verás el avance de tu sección.
      </CabezaSeccion>
      <ListaIndice entradas={PARA_DOCENTES} />

      <section id="guia" className="bloque" aria-labelledby="t-clase">
        <h2 id="t-clase" className="bloque__titulo">Guía piloto: el módulo 1.1 en 45 minutos</h2>
        <p className="bloque__texto">
          Para <Link href="/cursos/comprender-la-ia/que-es-la-ia">el módulo 1.1</Link>. El avance de la clase se ve en
          el <Link href="/docente">panel de sección</Link> (en el prototipo, con datos ficticios).
        </p>
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

      <section id="guias" className="bloque" aria-labelledby="t-guias">
        <h2 id="t-guias" className="bloque__titulo">Guías por módulo</h2>
        <p className="bloque__texto">
          Una guía escrita por módulo, para imprimir o compartir: el objetivo, lo esencial, un ejercicio, la
          autoevaluación y las fuentes verificadas. Saldrán de las mismas páginas de cada módulo, así que no se
          desactualizan.{' '}
          <span className="etiqueta" data-tono="preparacion">
            En preparación
          </span>
        </p>
      </section>
    </div>
  );
}
