'use client';

import { useEffect, useState } from 'react';
import { BORRADOR_C3_U1 } from '@/content/lecciones/c3-u1-guion';
import { useAvance } from './usarAvance';

const LECCION = 'c3-u1';
const CLAVE = `eva-derecho:auditoria:${LECCION}:v1`;

type Decision = 'aceptar' | 'revisar' | 'rechazar';
type Final = 'presentar' | 'corregir' | 'no-presentar';

interface Fila {
  decision: Decision | '';
  donde: string;
  encontre: string;
}
interface Auditoria {
  filas: Record<string, Fila>;
  final: Final | '';
}

const VACIA: Auditoria = {
  filas: Object.fromEntries(BORRADOR_C3_U1.citas.map((c) => [c.id, { decision: '', donde: '', encontre: '' }])),
  final: '',
};

const DECISIONES: { valor: Decision; texto: string; color: string }[] = [
  { valor: 'aceptar', texto: 'Aceptar', color: 'verde' },
  { valor: 'revisar', texto: 'Revisar', color: 'amarillo' },
  { valor: 'rechazar', texto: 'Rechazar', color: 'rojo' },
];

const FINALES: { valor: Final; texto: string }[] = [
  { valor: 'presentar', texto: 'Lo presento así' },
  { valor: 'corregir', texto: 'Lo corrijo antes de presentarlo' },
  { valor: 'no-presentar', texto: 'No lo presento' },
];

/**
 * Práctica de la 3.1 (≈ 15 min): auditar el borrador cita por cita en su fuente oficial y llenar la ficha de
 * auditoría (decisión + dónde se verificó). No revela cuál es el error: eso pasa en la evaluación. Todo queda en el
 * navegador; la ficha se puede copiar para el portafolio.
 */
export function PracticaC3U1() {
  const { marcar, hecho } = useAvance(LECCION);
  const [a, setA] = useState<Auditoria>(VACIA);
  const [aviso, setAviso] = useState('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
      // Se carga después de montar para que el HTML del servidor y el del navegador coincidan.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (g?.filas) setA({ filas: { ...VACIA.filas, ...g.filas }, final: g.final ?? '' });
    } catch {
      // sin almacenamiento
    }
  }, []);

  const cambiar = (id: string, campo: keyof Fila, valor: string) =>
    setA((x) => ({ ...x, filas: { ...x.filas, [id]: { ...x.filas[id], [campo]: valor } } }));

  const ficha = () =>
    [
      'Ficha de auditoría · unidad 3.1 · borrador de cobro de honorarios (ficticio)',
      ...BORRADOR_C3_U1.citas.map((c, k) => {
        const f = a.filas[c.id];
        return `${k + 1}. ${c.tipo}: ${f.decision || '—'} · verificada en: ${f.donde || '—'}${f.encontre ? ` · ${f.encontre}` : ''}`;
      }),
      `Decisión sobre el escrito: ${FINALES.find((f) => f.valor === a.final)?.texto ?? '—'}`,
      `Fecha: ${new Date().toLocaleDateString('es-CL')}`,
    ].join('\n');

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    const filas = Object.values(a.filas);
    if (filas.some((f) => !f.decision)) return setAviso('Falta decidir alguna cita: aceptar, revisar o rechazar.');
    if (filas.some((f) => f.donde.trim().length < 6)) return setAviso('Anota dónde verificaste cada cita (el enlace o la fuente).');
    if (!a.final) return setAviso('Falta tu decisión sobre el escrito.');
    try {
      localStorage.setItem(CLAVE, JSON.stringify(a));
    } catch {
      // sin almacenamiento: igual se marca el paso en esta visita
    }
    marcar('practica');
    setAviso('Ficha guardada en este navegador. La revelación, en la evaluación.');
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(ficha());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="practica">
      <ol className="practica__pasos">
        <li>
          <strong>Eres quien firma.</strong> Lee el borrador completo una vez, sin buscar nada.
        </li>
        <li>
          <strong>Verifica cada cita en su fuente oficial</strong>, no en un chat: el enlace de cada una está en su ficha.
          Lee el pasaje, no sólo el título.
        </li>
        <li>
          <strong>Decide</strong> (aceptar, revisar o rechazar) y <strong>anota dónde</strong> la verificaste.
        </li>
        <li>
          <strong>Decide sobre el escrito completo</strong> y guarda la ficha. Cópiala si la quieres para tu portafolio.
        </li>
      </ol>

      <div className="hoja prosa auditoria__borrador">
        <p className="rotulo">{BORRADOR_C3_U1.encabezado}</p>
        <p>{BORRADOR_C3_U1.introduccion}</p>
        <ol>
          {BORRADOR_C3_U1.citas.map((c) => (
            <li key={c.id}>{c.texto}</li>
          ))}
        </ol>
        <p>{BORRADOR_C3_U1.cierre}</p>
      </div>

      <form className="auditoria" onSubmit={guardar}>
        {BORRADOR_C3_U1.citas.map((c, k) => {
          const f = a.filas[c.id];
          return (
            <fieldset key={c.id} className="auditoria__cita panel">
              <legend className="auditoria__titulo">
                <span className="mono">Cita {k + 1}</span> {c.tipo}
              </legend>
              <p className="auditoria__fuente">
                Dónde:{' '}
                <a href={c.fuente.url} target="_blank" rel="noreferrer">
                  {c.fuente.nombre} <span aria-hidden="true">↗</span>
                </a>
                . {c.fuente.como}
              </p>
              <div className="auditoria__decision" role="radiogroup" aria-label={`Decisión sobre la cita ${k + 1}`}>
                {DECISIONES.map((d) => (
                  <label key={d.valor} className="v-semaforo__opcion" data-color={d.color}>
                    <input type="radio" name={`auditoria-${c.id}`} checked={f.decision === d.valor} onChange={() => cambiar(c.id, 'decision', d.valor)} />
                    <span>{d.texto}</span>
                  </label>
                ))}
              </div>
              <label className="bitacora__campo">
                <span>¿Dónde la verificaste? (enlace o fuente y lugar)</span>
                <input className="campo" value={f.donde} maxLength={300} onChange={(e) => cambiar(c.id, 'donde', e.target.value)} />
              </label>
              <label className="bitacora__campo">
                <span>¿Qué encontraste? (opcional)</span>
                <input className="campo" value={f.encontre} maxLength={300} onChange={(e) => cambiar(c.id, 'encontre', e.target.value)} />
              </label>
            </fieldset>
          );
        })}

        <fieldset className="auditoria__final panel">
          <legend className="auditoria__titulo">El escrito</legend>
          <div className="auditoria__decision">
            {FINALES.map((d) => (
              <label key={d.valor} className="pregunta__chip">
                <input type="radio" name="auditoria-final" checked={a.final === d.valor} onChange={() => setA((x) => ({ ...x, final: d.valor }))} />
                <span>{d.texto}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="bitacora__pie">
          <button type="submit" className="boton boton--primario">
            {hecho('practica') ? 'Actualizar ficha' : 'Guardar ficha de auditoría'}
          </button>
          <button type="button" className="boton" onClick={copiar}>
            {copiado ? '✓ Copiada' : 'Copiar ficha'}
          </button>
          <p className="bitacora__aviso" aria-live="polite">
            {aviso}
          </p>
        </div>
      </form>
    </div>
  );
}
