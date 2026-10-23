import type { Metadata } from 'next';
import Link from 'next/link';
import { AntesDeSubir } from '@/components/herramientas/AntesDeSubir';

export const metadata: Metadata = { title: 'Antes de subir' };

export default function PaginaAntesDeSubir() {
  return (
    <div className="pagina envoltura">
      <nav className="migas mono" aria-label="Ruta">
        <Link href="/herramientas">Herramientas</Link> <span aria-hidden="true">/</span> <span aria-current="page">Antes de subir</span>
      </nav>
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Herramienta · operativa</p>
        <h1 className="titular pagina__titulo">Antes de subir un documento a una IA</h1>
        <p className="entradilla">
          No pegues el documento aquí: responde sobre él. El veredicto sale de reglas fijas que puedes leer, no de una
          IA, y nada sale de tu navegador.
        </p>
      </header>
      <AntesDeSubir />
      <p className="aviso-pagina mono">
        <span className="etiqueta" data-tono="pendiente">
          Revisión jurídica pendiente
        </span>{' '}
        Criterio orientativo para estudiar, no asesoría. Lo revisa la Escuela a la luz de la protección de datos
        personales, el secreto profesional, la propiedad intelectual y su reglamento de integridad académica.
      </p>
    </div>
  );
}
