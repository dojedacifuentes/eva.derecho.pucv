'use client';

import { useEffect, useState } from 'react';
import { BITACORA_COMPANERO } from '@/content/lecciones/c3-u4-guion';
import { useAvance } from './usarAvance';

const LECCION = 'c3-u4';
const CLAVE = `eva-derecho:bitacora-informe:${LECCION}:v1`;

type Juicio = 'sostiene' | 'falta' | 'no-sostiene';
type Estado = 'verificada' | 'pendiente' | 'descartada';

interface Fila {
  cita: string;
  enlace: string;
  consulta: string;
  estado: Estado | '';
}
interface Bitacora {
  revision: Record<string, { juicio: Juicio | ''; corregir: string }>;
  pregunta: string;
  busquedas: string;
  fuentes: Fila[];
  usoIa: 'si' | 'no' | '';
  herramienta: string;
  paraQue: string;
  verifique: string;
  decisiones: string;
}

const FILA_VACIA: Fila = { cita: '', enlace: '', consulta: '', estado: '' };
const VACIA: Bitacora = {
  revision: Object.fromEntries(BITACORA_COMPANERO.entradas.map((e) => [e.id, { juicio: '', corregir: '' }])),
  pregunta: '',
  busquedas: '',
  fuentes: [FILA_VACIA, FILA_VACIA, FILA_VACIA],
  usoIa: '',
  herramienta: '',
  paraQue: '',
  verifique: '',
  decisiones: '',
};

const JUICIOS: { valor: Juicio; texto: string; color: string }[] = [
  { valor: 'sostiene', texto: 'Se sostiene', color: 'verde' },
  { valor: 'falta', texto: 'Falta algo', color: 'amarillo' },
  { valor: 'no-sostiene', texto: 'No se sostiene', color: 'rojo' },
];

const lista = (f: Fila) => f.cita.trim().length >= 6 && f.enlace.trim().length >= 3 && f.estado;

/**
 * Práctica de la 3.4 (≈ 20 min): revisar la bitácora del compañero (sin revelar el error: eso pasa en la evaluación)
 * y armar la propia para un informe: pregunta, búsquedas, tabla de fuentes, declaración de uso de IA y decisiones.
 * Queda en el navegador y se copia como tabla para pegarla en el informe o en una planilla.
 */
export function PracticaC3U4() {
  const { marcar, hecho } = useAvance(LECCION);
  const [b, setB] = useState<Bitacora>(VACIA);
  const [aviso, setAviso] = useState('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
      // Se carga después de montar para que el HTML del servidor y el del navegador coincidan.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (g) setB({ ...VACIA, ...g, revision: { ...VACIA.revision, ...g.revision } });
    } catch {
      // sin almacenamiento
    }
  }, []);

  const fila = (k: number, campo: keyof Fila, valor: string) =>
    setB((x) => ({ ...x, fuentes: x.fuentes.map((f, j) => (j === k ? { ...f, [campo]: valor } : f)) }));

  const declaracion = () =>
    b.usoIa === 'no'
      ? 'No usé herramientas de IA en este trabajo.'
      : `Usé ${b.herramienta || '[herramienta]'} para ${b.paraQue || '[tarea]'}. Verifiqué ${b.verifique || '[qué y dónde]'}. Ninguna cita proviene sólo de la IA.`;

  const markdown = () =>
    [
      `**Pregunta:** ${b.pregunta}`,
      '',
      `**Búsquedas:** ${b.busquedas}`,
      '',
      '| # | Cita | Enlace | Consulta | Estado |',
      '|---|---|---|---|---|',
      ...b.fuentes.filter((f) => f.cita.trim()).map((f, k) => `| ${k + 1} | ${f.cita} | ${f.enlace} | ${f.consulta} | ${f.estado} |`),
      '',
      `**Uso de IA:** ${declaracion()}`,
      '',
      `**Decisiones:** ${b.decisiones}`,
    ].join('\n');

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(b.revision).some((r) => !r.juicio)) return setAviso('Primero revisa las cuatro entradas del compañero.');
    if (b.pregunta.trim().length < 10) return setAviso('Escribe la pregunta de tu informe.');
    if (b.fuentes.filter(lista).length < 3) return setAviso('Tu tabla necesita al menos tres fuentes con cita, enlace y estado.');
    if (!b.usoIa || (b.usoIa === 'si' && (b.herramienta.trim().length < 2 || b.paraQue.trim().length < 5 || b.verifique.trim().length < 5)))
      return setAviso('Completa la declaración de uso de IA (o marca que no usaste).');
    try {
      localStorage.setItem(CLAVE, JSON.stringify(b));
    } catch {
      // sin almacenamiento: igual se marca el paso en esta visita
    }
    marcar('practica');
    setAviso('Bitácora guardada en este navegador. Cópiala como tabla para tu informe.');
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(markdown());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <form className="practica investigacion" onSubmit={guardar}>
      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">01</span> Revisa la bitácora del compañero
        </legend>
        <p className="auditoria__fuente">Abre cada enlace: ¿lleva a lo que la entrada afirma? ¿Lo pendiente está dicho?</p>
        {BITACORA_COMPANERO.entradas.map((e, k) => {
          const r = b.revision[e.id];
          return (
            <div key={e.id} className="investigacion__afirmacion">
              <p>
                <span className="mono">{k + 1}.</span> {e.afirma}{' '}
                <span className="auditoria__fuente">
                  ({e.fuente} ·{' '}
                  {e.enlace.startsWith('http') ? (
                    <a href={e.enlace} target="_blank" rel="noreferrer">
                      enlace <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    'sin enlace'
                  )}{' '}
                  · {e.consulta} · {e.estado}
                  {e.nota ? `: ${e.nota}` : ''})
                </span>
              </p>
              <div className="auditoria__decision" role="radiogroup" aria-label={`Juicio sobre la entrada ${k + 1}`}>
                {JUICIOS.map((j) => (
                  <label key={j.valor} className="v-semaforo__opcion" data-color={j.color}>
                    <input
                      type="radio"
                      name={`revision-${e.id}`}
                      checked={r.juicio === j.valor}
                      onChange={() => setB((x) => ({ ...x, revision: { ...x.revision, [e.id]: { ...x.revision[e.id], juicio: j.valor } } }))}
                    />
                    <span>{j.texto}</span>
                  </label>
                ))}
              </div>
              <label className="bitacora__campo">
                <span>¿Qué le corregirías? (opcional)</span>
                <input
                  className="campo"
                  value={r.corregir}
                  maxLength={300}
                  onChange={(ev) => setB((x) => ({ ...x, revision: { ...x.revision, [e.id]: { ...x.revision[e.id], corregir: ev.target.value } } }))}
                />
              </label>
            </div>
          );
        })}
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">02</span> Tu bitácora · la pregunta y las búsquedas
        </legend>
        <label className="bitacora__campo">
          <span>La pregunta de tu informe (o de un trabajo de otro ramo)</span>
          <textarea rows={2} maxLength={500} value={b.pregunta} onChange={(e) => setB((x) => ({ ...x, pregunta: e.target.value }))} />
        </label>
        <label className="bitacora__campo">
          <span>Tus búsquedas: dónde, con qué palabras, cuándo y qué encontraste</span>
          <textarea rows={3} maxLength={1500} value={b.busquedas} onChange={(e) => setB((x) => ({ ...x, busquedas: e.target.value }))} />
        </label>
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">03</span> La tabla de fuentes
        </legend>
        <div className="tabla-desplazable">
          <table className="tabla-fuentes">
            <thead>
              <tr>
                <th scope="col">Cita completa</th>
                <th scope="col">Enlace oficial</th>
                <th scope="col">Consulta</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {b.fuentes.map((f, k) => (
                <tr key={k}>
                  <td>
                    <input className="campo" aria-label={`Cita de la fuente ${k + 1}`} value={f.cita} maxLength={300} onChange={(e) => fila(k, 'cita', e.target.value)} />
                  </td>
                  <td>
                    <input className="campo" aria-label={`Enlace de la fuente ${k + 1}`} value={f.enlace} maxLength={300} onChange={(e) => fila(k, 'enlace', e.target.value)} />
                  </td>
                  <td>
                    <input className="campo" aria-label={`Fecha de consulta de la fuente ${k + 1}`} placeholder="dd-mm-aaaa" value={f.consulta} maxLength={20} onChange={(e) => fila(k, 'consulta', e.target.value)} />
                  </td>
                  <td>
                    <select className="campo" aria-label={`Estado de la fuente ${k + 1}`} value={f.estado} onChange={(e) => fila(k, 'estado', e.target.value)}>
                      <option value="">—</option>
                      <option value="verificada">Verificada</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="descartada">Descartada</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="boton" onClick={() => setB((x) => ({ ...x, fuentes: [...x.fuentes, FILA_VACIA] }))} disabled={b.fuentes.length >= 12}>
          + Otra fuente
        </button>
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">04</span> El uso de IA
        </legend>
        <div className="auditoria__decision" role="radiogroup" aria-label="¿Usaste IA?">
          {(
            [
              ['si', 'Usé IA'],
              ['no', 'No usé IA'],
            ] as const
          ).map(([valor, texto]) => (
            <label key={valor} className="pregunta__chip">
              <input type="radio" name="uso-ia" checked={b.usoIa === valor} onChange={() => setB((x) => ({ ...x, usoIa: valor }))} />
              <span>{texto}</span>
            </label>
          ))}
        </div>
        {b.usoIa === 'si' && (
          <div className="investigacion__fila investigacion__fila--tres">
            <label className="bitacora__campo">
              <span>¿Qué herramienta?</span>
              <input className="campo" value={b.herramienta} maxLength={80} onChange={(e) => setB((x) => ({ ...x, herramienta: e.target.value }))} />
            </label>
            <label className="bitacora__campo">
              <span>¿Para qué?</span>
              <input className="campo" value={b.paraQue} maxLength={200} onChange={(e) => setB((x) => ({ ...x, paraQue: e.target.value }))} />
            </label>
            <label className="bitacora__campo">
              <span>¿Qué verificaste y dónde?</span>
              <input className="campo" value={b.verifique} maxLength={200} onChange={(e) => setB((x) => ({ ...x, verifique: e.target.value }))} />
            </label>
          </div>
        )}
        {b.usoIa && <p className="investigacion__declaracion">{declaracion()}</p>}
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">05</span> Las decisiones
        </legend>
        <label className="bitacora__campo">
          <span>¿Qué descartaste y por qué? (opcional)</span>
          <textarea rows={2} maxLength={800} value={b.decisiones} onChange={(e) => setB((x) => ({ ...x, decisiones: e.target.value }))} />
        </label>
      </fieldset>

      <div className="bitacora__pie">
        <button type="submit" className="boton boton--primario">
          {hecho('practica') ? 'Actualizar bitácora' : 'Guardar bitácora'}
        </button>
        <button type="button" className="boton" onClick={copiar}>
          {copiado ? '✓ Copiada' : 'Copiar como tabla'}
        </button>
        <p className="bitacora__aviso" aria-live="polite">
          {aviso}
        </p>
      </div>
    </form>
  );
}
