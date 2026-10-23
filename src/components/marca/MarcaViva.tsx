'use client';

import { useState } from 'react';
import { Marca, type MarcaProps } from './Marca';

/** La marca en bucle con su botón de pausa (WCAG 2.2.2: lo que se mueve solo más de 5 s se puede detener). */
export function MarcaViva(props: Omit<MarcaProps, 'animacion' | 'pausada'>) {
  const [pausada, setPausada] = useState(false);
  return (
    <div className="marca-viva">
      <Marca {...props} animacion="bucle" pausada={pausada} />
      <button
        type="button"
        className="marca-viva__pausa mono"
        aria-pressed={pausada}
        onClick={() => setPausada((p) => !p)}
      >
        {pausada ? '▶ animar marca' : '❚❚ pausar marca'}
      </button>
    </div>
  );
}

/** La marca de la cabecera: hace la transformación al cargar y otra vez al pasar el puntero o el foco. */
export function MarcaEntrada(props: Omit<MarcaProps, 'animacion'>) {
  const [vuelta, setVuelta] = useState(0);
  const repetir = () => setVuelta((v) => v + 1);
  return (
    <span className="marca-entrada" onPointerEnter={repetir} onFocus={repetir}>
      <Marca key={vuelta} {...props} animacion="entrada" />
    </span>
  );
}
