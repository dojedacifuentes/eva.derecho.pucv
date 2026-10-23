'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ComponentType } from 'react';
import type { Semaforo } from '@/content/evaluaciones/tipos';
import { useSemaforo } from '@/lib/progreso/semaforo';
import { useAvance } from './usarAvance';

export interface TramoPresentacion {
  n: number;
  nombre: string;
  visual: string;
  voz: string;
}

export type PropsVisual<T extends TramoPresentacion> = { tramo: T; semaforo: Record<string, Semaforo> };

/**
 * «EVA presenta»: la recreación del guion de una videocápsula mientras el video con su voz no exista. Cada tramo con
 * su visual y el texto exacto de la voz como subtítulo. Avanza solo al ritmo de lectura (≈ 2,6 palabras por segundo)
 * y se detiene en el semáforo hasta que el estudiante marca todo (o sigue con «Siguiente»). Teclado: ← → y espacio.
 * Los visuales de cada unidad viven en su archivo (`PresentacionC1U1.tsx`, `PresentacionC3U1.tsx`).
 */
const PALABRAS_POR_SEGUNDO = 2.6;

export function PresentacionEva<T extends TramoPresentacion>({
  leccionId,
  guion,
  Visual,
  semaforos,
  etiqueta,
  descripcion,
}: {
  leccionId: string;
  guion: T[];
  Visual: ComponentType<PropsVisual<T>>;
  /** Ids del semáforo que hay que marcar antes de seguir (tramo con visual «semaforo»). */
  semaforos: string[];
  etiqueta: string;
  descripcion: string;
}) {
  const [i, setI] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const { marcar, hecho } = useAvance(leccionId);
  const semaforo = useSemaforo(leccionId);
  const tramo = guion[i];
  const ultimo = i === guion.length - 1;
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ultimo && !hecho('presentacion')) marcar('presentacion');
  }, [ultimo, hecho, marcar]);

  // En el semáforo espera a que marque todo (o a que pase con «Siguiente»).
  const esperando = tramo.visual === 'semaforo' && !semaforos.every((id) => semaforo[id]);
  const enMarcha = reproduciendo && !esperando;

  useEffect(() => {
    if (!enMarcha) return;
    const ms = Math.max(4500, (tramo.voz.split(/\s+/).length / PALABRAS_POR_SEGUNDO) * 1000 + 900);
    const t = setTimeout(() => {
      if (ultimo) setReproduciendo(false);
      else setI((n) => n + 1);
    }, ms);
    return () => clearTimeout(t);
  }, [enMarcha, i, tramo, ultimo]);

  const ir = (n: number) => setI(Math.max(0, Math.min(guion.length - 1, n)));
  const teclas = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') ir(i + 1);
    else if (e.key === 'ArrowLeft') ir(i - 1);
    else if (e.key === ' ' && e.target === raiz.current) {
      e.preventDefault();
      setReproduciendo(!enMarcha);
    }
  };

  return (
    <div ref={raiz} className="presenta zona-oscura" tabIndex={0} onKeyDown={teclas} aria-roledescription="presentación" aria-label={descripcion}>
      <div className="barra-panel">
        <span className="punto-vivo">{etiqueta}</span>
        <span>
          {tramo.n}/{guion.length} · {tramo.nombre}
        </span>
      </div>

      <div className="presenta__escena barrido" key={tramo.n}>
        <Visual tramo={tramo} semaforo={semaforo} />
      </div>

      <div className="presenta__subtitulo" aria-live="polite">
        <Image src="/eva/eva-avatar.webp" alt="" width={44} height={44} className="presenta__avatar" />
        <p>
          <span className="sr-only">EVA: </span>
          {tramo.voz}
        </p>
      </div>

      <div className="presenta__controles">
        <button type="button" className="boton" onClick={() => ir(i - 1)} disabled={i === 0}>
          ← Anterior
        </button>
        <button type="button" className="boton boton--primario" onClick={() => setReproduciendo(!enMarcha)} aria-pressed={enMarcha}>
          {enMarcha ? '❚❚ Pausar' : esperando && reproduciendo ? 'Marca el semáforo' : i === 0 ? '▶ Reproducir' : '▶ Seguir'}
        </button>
        <button type="button" className="boton" onClick={() => ir(i + 1)} disabled={ultimo}>
          Siguiente →
        </button>
        <ol className="presenta__puntos" aria-label="Tramos">
          {guion.map((t, k) => (
            <li key={t.n}>
              <button type="button" aria-current={k === i ? 'step' : undefined} onClick={() => ir(k)}>
                <span className="sr-only">
                  Tramo {t.n}: {t.nombre}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <p className="presenta__nota mono">
        El video con la voz de EVA está en producción (guion en revisión jurídica). Esta recreación usa su texto exacto.
      </p>
    </div>
  );
}
