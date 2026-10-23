import Link from 'next/link';

export function Pie({ demo }: { demo: boolean }) {
  return (
    <footer className="pie zona-oscura">
      <div className="envoltura pie__rejilla">
        <div>
          <p className="rotulo">EVA × Derecho PUCV</p>
          <p className="pie__texto">
            Prototipo de plataforma académica de IA y Derecho, propuesto para la Escuela de Derecho de la Pontificia
            Universidad Católica de Valparaíso. EVA es una inteligencia artificial: también se equivoca.
          </p>
        </div>
        <div>
          <p className="rotulo">Estado</p>
          <ul className="pie__lista">
            <li>{demo ? 'Modo demostración: el avance se guarda en este navegador.' : 'Cuentas activas con Supabase.'}</li>
            <li>Contenido jurídico pendiente de revisión docente.</li>
            <li>Lecciones piloto: unidad 1.1 y el curso 3 completo.</li>
          </ul>
        </div>
        <div>
          <p className="rotulo">Más</p>
          <ul className="pie__lista">
            <li>
              <Link href="/acerca">Método, fuentes y privacidad</Link>
            </li>
            <li>
              <Link href="/herramientas">Herramientas</Link>
            </li>
            <li>
              <Link href="/acerca#creditos">Créditos de imágenes</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
