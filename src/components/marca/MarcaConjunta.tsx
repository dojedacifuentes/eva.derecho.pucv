'use client';

import { useId, useState } from 'react';
import { duracion, MOMENTO_NOMBRE, PULSO } from '@/lib/marca-movimiento';
import { Descifra } from './Descifra';
import { EscudoLinea } from './EscudoLinea';
import { Marca } from './Marca';

/*
 * Derecho PUCV × EVA (v5, rítmica). Un solo hilo de luz une las dos marcas, con las piezas reales: el escudo vectorial
 * reconstruido del archivo oficial (en línea de luz, el lenguaje de EVA) y la marca de EVA de eva.proyecto01.
 *
 * Todo va en una grilla de 120 pulsos por minuto (un pulso = 500 ms; un ciclo = 16 pulsos = 8 s, ver
 * lib/marca-movimiento.ts): pulso 1 EVA (□X) · 2 sale el hilo de luz · 3 se dibuja el escudo · 5 el haz lo escanea ·
 * 6 se descifra «DERECHO PUCV» · 8 EVA forma su nombre. En cada vuelta siguiente, en el pulso 8 el haz recorre el
 * escudo, el halo y el separador laten y el nombre se descifra otra vez.
 * Botón de pausa (WCAG 2.2.2); con «reducir movimiento», todo quieto y visible.
 *
 * tamano="cabecera": compacta y quieta (EVA hace su transformación al cargar y al pasar el puntero).
 */
export function MarcaConjunta({ tamano = 'grande', conPausa = true }: { tamano?: 'grande' | 'cabecera'; conPausa?: boolean }) {
  const [pausada, setPausada] = useState(false);
  const [vuelta, setVuelta] = useState(0);
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const grande = tamano === 'grande';
  const ciclo = duracion();

  return (
    <div className={`conjunta-caja conjunta-caja--${tamano}`}>
      <div
        key={vuelta}
        className={`conjunta conjunta--${tamano}`}
        data-pausada={pausada ? 'si' : undefined}
        style={{ '--ciclo': `${ciclo}ms` } as React.CSSProperties}
        onPointerEnter={grande ? undefined : () => setVuelta((v) => v + 1)}
        role="img"
        aria-label="Derecho PUCV, Pontificia Universidad Católica de Valparaíso, y EVA"
      >
        <div className="conjunta__escudo">
          <EscudoLinea id={id} />
          <span className="conjunta__haz" />
        </div>
        <div className="conjunta__texto">
          <Descifra
            className="conjunta__palabra"
            texto="DERECHO PUCV"
            inicioMs={grande ? 5 * PULSO : 300}
            cadaMs={grande ? ciclo : undefined}
            repetirDesdeMs={ciclo + MOMENTO_NOMBRE - 2 * PULSO}
            duracionMs={2 * PULSO}
            pausado={pausada}
          />
          {grande && (
            <Descifra
              className="conjunta__universidad"
              texto="Pontificia Universidad Católica de Valparaíso"
              inicioMs={5 * PULSO}
              duracionMs={2 * PULSO}
              pausado={pausada}
            />
          )}
        </div>
        <span className="conjunta__separador" />
        <div className="conjunta__eva">
          <Marca animacion={grande ? 'bucle' : 'entrada'} pose="isotype" pausada={pausada} />
        </div>
        {grande && <span className="conjunta__hilo" />}
      </div>
      {grande && conPausa && (
        <button type="button" className="conjunta__pausa mono" aria-pressed={pausada} onClick={() => setPausada((p) => !p)}>
          {pausada ? '▶ animar marcas' : '❚❚ pausar marcas'}
        </button>
      )}
    </div>
  );
}
