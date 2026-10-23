import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

/** Nota al margen: en escritorio va al costado del texto; en el teléfono, en línea. */
function Nota({ children }: { children: ReactNode }) {
  return <aside className="nota-margen">{children}</aside>;
}

/** Aviso de algo que falta confirmar antes de publicar (fuente por cotejar, revisión jurídica). */
function Pendiente({ children }: { children: ReactNode }) {
  // Un <div>, no un <p>: cuando el aviso ocupa varias líneas, MDX envuelve su texto en un párrafo propio.
  return (
    <div className="aviso-pendiente">
      <span className="etiqueta" data-tono="por-verificar">
        Por cotejar
      </span>{' '}
      {children}
    </div>
  );
}

/** Cita de una norma o de una definición, con su fuente. */
function Cita({ fuente, children }: { fuente: ReactNode; children: ReactNode }) {
  return (
    <figure className="cita">
      <blockquote>{children}</blockquote>
      <figcaption className="mono">{fuente}</figcaption>
    </figure>
  );
}

const componentes: MDXComponents = { Nota, Pendiente, Cita };

export function useMDXComponents(): MDXComponents {
  return componentes;
}
