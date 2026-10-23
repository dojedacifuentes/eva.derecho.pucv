import type { Metadata } from 'next';
import { MarcaConjunta } from '@/components/marca/MarcaConjunta';

export const metadata: Metadata = { title: 'Marca' };

/** Sala de la marca: Derecho PUCV × EVA en bucle, grande, para verla y grabarla. ?fondo=claro para el negativo. */
export default async function SalaMarca({ searchParams }: { searchParams: Promise<{ fondo?: string; pausa?: string }> }) {
  const { fondo, pausa } = await searchParams;
  const claro = fondo === 'claro';
  return (
    <section className={`sala-marca ${claro ? 'sala-marca--clara' : 'zona-oscura fondo-reticula'}`} data-tema={claro ? 'claro' : undefined}>
      <h1 className="sr-only">Marca conjunta Derecho PUCV y EVA</h1>
      <div>
        <MarcaConjunta conPausa={pausa !== 'no'} />
      </div>
    </section>
  );
}
