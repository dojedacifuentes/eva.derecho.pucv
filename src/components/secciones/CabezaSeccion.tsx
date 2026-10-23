/** Cabeza de las páginas de sección (formato «Índice»): el nombre a la izquierda, para qué sirve a la derecha, un trazo. */
export function CabezaSeccion({ titulo, children, acciones }: { titulo: string; children: React.ReactNode; acciones?: React.ReactNode }) {
  return (
    <header className="cabeza-seccion">
      <h1 className="cabeza-seccion__titulo recorte-105">{titulo}</h1>
      <div className="cabeza-seccion__texto">
        <p>{children}</p>
        {acciones && <p className="cabeza-seccion__acciones">{acciones}</p>}
      </div>
    </header>
  );
}
