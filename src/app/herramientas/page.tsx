import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Herramientas' };

const HERRAMIENTAS = [
  {
    nombre: 'Antes de subir',
    texto: 'Responde seis preguntas sobre un documento y te dice si puedes pegarlo en una IA, qué cambiar y por qué.',
    href: '/herramientas/antes-de-subir',
    estado: 'operativa',
  },
  {
    nombre: 'Verificador de referencias',
    texto: 'Pega una bibliografía y revisa cada cita contra la fuente: existe, dice lo que se le atribuye, está vigente.',
    estado: 'diseno',
  },
  {
    nombre: 'Bitácora de investigación',
    texto: 'Qué buscaste, dónde, con qué palabras y qué encontraste, para que tu investigación se pueda repetir.',
    estado: 'diseno',
  },
] as const;

export default function Herramientas() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Herramientas</p>
        <h1 className="titular pagina__titulo">Hechas para usar, no para mirar.</h1>
        <p className="entradilla">Funcionan en tu navegador: no piden cuenta y no envían tus documentos a ninguna parte.</p>
      </header>
      <ul className="tarjetas">
        {HERRAMIENTAS.map((h) => (
          <li key={h.nombre} className="panel tarjeta">
            <p>
              <span className="etiqueta" data-tono={h.estado}>
                {h.estado === 'operativa' ? 'Operativa' : 'En diseño'}
              </span>
            </p>
            <h2 className="tarjeta__titulo">{'href' in h ? <Link href={h.href}>{h.nombre}</Link> : h.nombre}</h2>
            <p className="tarjeta__texto">{h.texto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
