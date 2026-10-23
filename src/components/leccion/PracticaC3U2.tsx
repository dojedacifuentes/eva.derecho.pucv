'use client';

import { useEffect, useState } from 'react';
import { PREGUNTA_C3_U2, RESPUESTA_IA_C3_U2 } from '@/content/lecciones/c3-u2-guion';
import { useAvance } from './usarAvance';

const LECCION = 'c3-u2';
const CLAVE = `eva-derecho:bitacora-investigacion:${LECCION}:v1`;

const ENCARGO = `Estoy investigando esta pregunta de Derecho chileno: «${PREGUNTA_C3_U2}»
No me des la respuesta final. Dame:
1. Los números de las leyes y los artículos que debo leer.
2. Los términos con que buscarlos.
3. Dónde se publican oficialmente.
Marca con [?] todo lo que no sepas con certeza.`;

const FUENTES = [
  { id: 'leychile', texto: 'LeyChile (texto y ficha de la norma)', url: 'https://www.bcn.cl/leychile/' },
  { id: 'diario', texto: 'Diario Oficial', url: 'https://www.diariooficial.interior.gob.cl/' },
  { id: 'senado', texto: 'Tramitación del Senado o la Cámara', url: 'https://tramitacion.senado.cl/' },
  { id: 'historia', texto: 'Historia de la Ley (BCN)', url: 'https://www.bcn.cl/historiadelaley/' },
] as const;

type Resultado = 'confirmada' | 'corregida' | 'sin-confirmar';
const RESULTADOS: { valor: Resultado; texto: string; color: string }[] = [
  { valor: 'confirmada', texto: 'Confirmada', color: 'verde' },
  { valor: 'corregida', texto: 'Corregida', color: 'rojo' },
  { valor: 'sin-confirmar', texto: 'Sin confirmar', color: 'amarillo' },
];

interface Bitacora {
  terminos: string;
  fuentes: string[];
  criterio: string;
  queDijoIa: string;
  verificacion: Record<string, { resultado: Resultado | ''; dato: string; enlace: string }>;
  respuesta: string;
  certeza: number;
}

const VACIA: Bitacora = {
  terminos: '',
  fuentes: [],
  criterio: '',
  queDijoIa: '',
  verificacion: Object.fromEntries(RESPUESTA_IA_C3_U2.afirmaciones.map((a) => [a.id, { resultado: '', dato: '', enlace: '' }])),
  respuesta: '',
  certeza: 0,
};

/**
 * Práctica de la 3.2 (≈ 20 min): la bitácora del ciclo planificar, pedir, verificar y documentar con la misma
 * pregunta de la presentación. No revela qué afirmación era falsa (eso pasa en la evaluación). Queda en el navegador
 * y se puede copiar, con la fecha de consulta, para el portafolio.
 */
export function PracticaC3U2() {
  const { marcar, hecho } = useAvance(LECCION);
  const [b, setB] = useState<Bitacora>(VACIA);
  const [aviso, setAviso] = useState('');
  const [copiado, setCopiado] = useState<'' | 'encargo' | 'bitacora'>('');
  // La fecha de consulta es la del navegador: la página es estática y se construye otro día.
  const [hoy, setHoy] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoy(new Date().toLocaleDateString('es-CL'));
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
      // Se carga después de montar para que el HTML del servidor y el del navegador coincidan.
      if (g) setB({ ...VACIA, ...g, verificacion: { ...VACIA.verificacion, ...g.verificacion } });
    } catch {
      // sin almacenamiento
    }
  }, []);

  const verificar = (id: string, campo: 'resultado' | 'dato' | 'enlace', valor: string) =>
    setB((x) => ({ ...x, verificacion: { ...x.verificacion, [id]: { ...x.verificacion[id], [campo]: valor } } }));

  const texto = () =>
    [
      `Bitácora de investigación · unidad 3.2 · consulta del ${hoy}`,
      `Pregunta: ${PREGUNTA_C3_U2}`,
      `Términos: ${b.terminos}`,
      `Fuentes: ${FUENTES.filter((f) => b.fuentes.includes(f.id)).map((f) => f.texto).join('; ')}`,
      `Qué contará como respuesta: ${b.criterio}`,
      `Qué me dio la IA: ${b.queDijoIa}`,
      ...RESPUESTA_IA_C3_U2.afirmaciones.map((a, k) => {
        const v = b.verificacion[a.id];
        return `Afirmación ${k + 1} («${a.texto}»): ${v.resultado || '—'} · dato oficial: ${v.dato || '—'} · ${v.enlace || '—'}`;
      }),
      `Respuesta (${b.certeza ? `${b.certeza}/5 de certeza` : 'sin certeza anotada'}): ${b.respuesta}`,
    ].join('\n');

  const copiar = async (que: 'encargo' | 'bitacora') => {
    try {
      await navigator.clipboard.writeText(que === 'encargo' ? ENCARGO : texto());
      setCopiado(que);
      setTimeout(() => setCopiado(''), 2500);
    } catch {
      setCopiado('');
    }
  };

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (b.terminos.trim().length < 3 || b.fuentes.length === 0 || b.criterio.trim().length < 10)
      return setAviso('Completa el paso 1: términos, al menos una fuente y qué contará como respuesta.');
    const v = Object.values(b.verificacion);
    if (v.some((x) => !x.resultado || x.enlace.trim().length < 6)) return setAviso('En el paso 3, marca cada afirmación y anota el enlace donde la verificaste.');
    if (b.respuesta.trim().length < 20 || !b.certeza) return setAviso('Escribe tu respuesta y qué tan seguro estás (1 a 5).');
    try {
      localStorage.setItem(CLAVE, JSON.stringify(b));
    } catch {
      // sin almacenamiento: igual se marca el paso en esta visita
    }
    marcar('practica');
    setAviso(`Bitácora guardada en este navegador, con fecha de consulta ${hoy}.`);
  };

  return (
    <form className="practica investigacion" onSubmit={guardar}>
      <p className="investigacion__pregunta panel">
        <span className="rotulo rotulo--acento">La pregunta</span>
        {PREGUNTA_C3_U2}
      </p>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">01</span> Planificar
        </legend>
        <label className="bitacora__campo">
          <span>Términos con que vas a buscar</span>
          <input className="campo" value={b.terminos} maxLength={300} onChange={(e) => setB((x) => ({ ...x, terminos: e.target.value }))} />
        </label>
        <div className="investigacion__fuentes" role="group" aria-label="Fuentes que vas a usar">
          <span className="rotulo">Fuentes que vas a usar</span>
          {FUENTES.map((f) => (
            <label key={f.id} className="cotejo__item">
              <input
                type="checkbox"
                checked={b.fuentes.includes(f.id)}
                onChange={(e) => setB((x) => ({ ...x, fuentes: e.target.checked ? [...x.fuentes, f.id] : x.fuentes.filter((y) => y !== f.id) }))}
              />
              <span>
                {f.texto} ·{' '}
                <a href={f.url} target="_blank" rel="noreferrer">
                  abrir <span aria-hidden="true">↗</span>
                </a>
              </span>
            </label>
          ))}
        </div>
        <label className="bitacora__campo">
          <span>¿Qué contará como respuesta?</span>
          <textarea rows={2} maxLength={600} value={b.criterio} onChange={(e) => setB((x) => ({ ...x, criterio: e.target.value }))} />
        </label>
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">02</span> Pedir: la IA como mapa
        </legend>
        <div className="encargo">
          <pre className="mono">{ENCARGO}</pre>
          <button type="button" className="boton" onClick={() => copiar('encargo')}>
            {copiado === 'encargo' ? '✓ Copiado' : 'Copiar encargo'}
          </button>
          <p className="encargo__acceso">
            <span className="etiqueta" data-tono="gratis">
              Gratis
            </span>{' '}
            Sirve cualquier chat. Si no quieres usar IA, salta al paso 3: el mapa está en la lectura.
          </p>
        </div>
        <label className="bitacora__campo">
          <span>¿Qué te dio la IA? (resumen, opcional)</span>
          <textarea rows={2} maxLength={800} value={b.queDijoIa} onChange={(e) => setB((x) => ({ ...x, queDijoIa: e.target.value }))} />
        </label>
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">03</span> Verificar las tres afirmaciones de la presentación
        </legend>
        {RESPUESTA_IA_C3_U2.afirmaciones.map((a, k) => {
          const v = b.verificacion[a.id];
          return (
            <div key={a.id} className="investigacion__afirmacion">
              <p>
                <span className="mono">{k + 1}.</span> {a.texto}
              </p>
              <div className="auditoria__decision" role="radiogroup" aria-label={`Resultado de la afirmación ${k + 1}`}>
                {RESULTADOS.map((r) => (
                  <label key={r.valor} className="v-semaforo__opcion" data-color={r.color}>
                    <input type="radio" name={`verificacion-${a.id}`} checked={v.resultado === r.valor} onChange={() => verificar(a.id, 'resultado', r.valor)} />
                    <span>{r.texto}</span>
                  </label>
                ))}
              </div>
              <div className="investigacion__fila">
                <label className="bitacora__campo">
                  <span>Dato oficial</span>
                  <input className="campo" value={v.dato} maxLength={200} onChange={(e) => verificar(a.id, 'dato', e.target.value)} />
                </label>
                <label className="bitacora__campo">
                  <span>Enlace donde lo verificaste</span>
                  <input className="campo" value={v.enlace} maxLength={300} onChange={(e) => verificar(a.id, 'enlace', e.target.value)} />
                </label>
              </div>
            </div>
          );
        })}
      </fieldset>

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">04</span> Documentar
        </legend>
        <p className="mono investigacion__fecha">Fecha de consulta: {hoy}</p>
        <label className="bitacora__campo">
          <span>Tu respuesta a la pregunta, con sus fuentes</span>
          <textarea rows={3} maxLength={1200} value={b.respuesta} onChange={(e) => setB((x) => ({ ...x, respuesta: e.target.value }))} />
        </label>
        <div className="escala" role="group" aria-label="Qué tan seguro estás de tu respuesta">
          <span className="escala__extremo mono">certeza</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" className="escala__punto" aria-pressed={b.certeza === n} onClick={() => setB((x) => ({ ...x, certeza: n }))}>
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="bitacora__pie">
        <button type="submit" className="boton boton--primario">
          {hecho('practica') ? 'Actualizar bitácora' : 'Guardar bitácora'}
        </button>
        <button type="button" className="boton" onClick={() => copiar('bitacora')}>
          {copiado === 'bitacora' ? '✓ Copiada' : 'Copiar bitácora'}
        </button>
        <p className="bitacora__aviso" aria-live="polite">
          {aviso}
        </p>
      </div>
    </form>
  );
}
