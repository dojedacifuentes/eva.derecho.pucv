'use client';

import { useEffect, useState } from 'react';
import { RESPUESTA_IA_C3_U3 } from '@/content/lecciones/c3-u3-guion';
import { useSemaforo } from '@/lib/progreso/semaforo';
import { useAvance } from './usarAvance';

const LECCION = 'c3-u3';
const CLAVE = `eva-derecho:fichas:${LECCION}:v1`;
const BUSCADOR = 'https://juris.pjud.cl/';

type Existe = 'si' | 'con-diferencias' | 'no';
type Resultado = 'tal-cual' | 'corregida' | 'no-la-uso';

interface Ficha {
  existe: Existe | '';
  sala: string;
  fecha: string;
  dice: 'si' | 'no' | 'no-pude' | '';
  enlace: string;
  resultado: Resultado | '';
}
interface Fichas {
  fichas: Record<string, Ficha>;
  sinIa: string;
  confio: string;
}

const VACIA: Fichas = {
  fichas: Object.fromEntries(RESPUESTA_IA_C3_U3.citas.map((c) => [c.id, { existe: '', sala: '', fecha: '', dice: '', enlace: '', resultado: '' }])),
  sinIa: '',
  confio: '',
};

const EXISTE: { valor: Existe; texto: string }[] = [
  { valor: 'si', texto: 'Existe y coincide' },
  { valor: 'con-diferencias', texto: 'Existe, con datos distintos' },
  { valor: 'no', texto: 'No aparece' },
];
const DICE = [
  ['si', 'Sí'],
  ['no', 'No'],
  ['no-pude', 'No pude leerlo'],
] as const;
const RESULTADOS: { valor: Resultado; texto: string; color: string }[] = [
  { valor: 'tal-cual', texto: 'La uso tal cual', color: 'verde' },
  { valor: 'corregida', texto: 'La uso corregida', color: 'amarillo' },
  { valor: 'no-la-uso', texto: 'No la uso', color: 'rojo' },
];
const SEMAFORO = { verde: 'existe', amarillo: 'dudo', rojo: 'es falsa' } as const;

/**
 * Práctica de la 3.3 (≈ 15 min): una ficha de verificación por cita (MATERIAL.md §4 de la cápsula 1.3), en el
 * buscador del Poder Judicial, más la variante sin IA (buscar por texto). No revela el resultado: eso pasa en la
 * evaluación. Queda en el navegador.
 */
export function PracticaC3U3() {
  const { marcar, hecho } = useAvance(LECCION);
  const semaforo = useSemaforo(LECCION);
  const [f, setF] = useState<Fichas>(VACIA);
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
      // Se carga después de montar para que el HTML del servidor y el del navegador coincidan.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (g?.fichas) setF({ ...VACIA, ...g, fichas: { ...VACIA.fichas, ...g.fichas } });
    } catch {
      // sin almacenamiento
    }
  }, []);

  const cambiar = (id: string, campo: keyof Ficha, valor: string) =>
    setF((x) => ({ ...x, fichas: { ...x.fichas, [id]: { ...x.fichas[id], [campo]: valor } } }));

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    const fichas = Object.values(f.fichas);
    if (fichas.some((x) => !x.existe || !x.resultado)) return setAviso('Cada ficha necesita si la encontraste y qué haces con la cita.');
    if (fichas.some((x) => x.enlace.trim().length < 6))
      return setAviso('Anota el enlace de cada búsqueda (si no apareció, el del buscador y cómo buscaste).');
    if (f.confio.trim().length < 10) return setAviso('Responde la última pregunta: ¿acertó tu semáforo?');
    try {
      localStorage.setItem(CLAVE, JSON.stringify(f));
    } catch {
      // sin almacenamiento: igual se marca el paso en esta visita
    }
    marcar('practica');
    setAviso('Fichas guardadas en este navegador. La revelación, en la evaluación.');
  };

  return (
    <form className="practica investigacion" onSubmit={guardar}>
      <ol className="practica__pasos">
        <li>
          Abre el{' '}
          <a href={BUSCADOR} target="_blank" rel="noreferrer">
            buscador de jurisprudencia del Poder Judicial
          </a>
          , pestaña <strong>Corte Suprema</strong>.
        </li>
        <li>
          Busca cada cita por <strong>rol y era</strong>. Si no aparece, prueba sin la era y en otras pestañas.
        </li>
        <li>
          Compara <strong>sala y fecha</strong> con la ficha oficial, y lee el extracto: ¿dice lo que la IA dice?
        </li>
        <li>Llena una ficha por cita. La cita 1 ya la viste en la presentación: confírmala tú igual.</li>
      </ol>
      <p className="mono que-subir__nota">
        Si el buscador no carga, intenta más tarde o desde otra red, y anótalo en la ficha: también es parte de documentar.
      </p>

      {RESPUESTA_IA_C3_U3.citas.map((c, k) => {
        const x = f.fichas[c.id];
        const marca = semaforo[c.id];
        return (
          <fieldset key={c.id} className="investigacion__paso panel">
            <legend className="auditoria__titulo">
              <span className="mono">Ficha {k + 1}</span> Rol {c.rol}-{c.era}
            </legend>
            <p className="auditoria__fuente">
              La IA dijo: {c.tribunal}, Rol N° {c.rol}-{c.era}, {c.fecha}.{' '}
              <span className="mono">Tu semáforo antes de buscar: {marca ? SEMAFORO[marca] : 'sin marcar'}.</span>
            </p>
            <div className="auditoria__decision" role="radiogroup" aria-label={`¿Encontraste la cita ${k + 1}?`}>
              {EXISTE.map((o) => (
                <label key={o.valor} className="pregunta__chip">
                  <input type="radio" name={`existe-${c.id}`} checked={x.existe === o.valor} onChange={() => cambiar(c.id, 'existe', o.valor)} />
                  <span>{o.texto}</span>
                </label>
              ))}
            </div>
            <div className="investigacion__fila">
              <label className="bitacora__campo">
                <span>Sala que muestra el buscador</span>
                <input className="campo" value={x.sala} maxLength={80} onChange={(e) => cambiar(c.id, 'sala', e.target.value)} />
              </label>
              <label className="bitacora__campo">
                <span>Fecha que muestra el buscador</span>
                <input className="campo" value={x.fecha} maxLength={40} onChange={(e) => cambiar(c.id, 'fecha', e.target.value)} />
              </label>
            </div>
            <div className="auditoria__decision" role="radiogroup" aria-label={`¿La cita ${k + 1} dice lo que la IA dice?`}>
              <span className="rotulo">¿Dice lo que la IA dice?</span>
              {DICE.map(([valor, texto]) => (
                <label key={valor} className="pregunta__chip">
                  <input type="radio" name={`dice-${c.id}`} checked={x.dice === valor} onChange={() => cambiar(c.id, 'dice', valor)} />
                  <span>{texto}</span>
                </label>
              ))}
            </div>
            <label className="bitacora__campo">
              <span>Enlace oficial (o cómo buscaste, si no apareció)</span>
              <input className="campo" value={x.enlace} maxLength={300} onChange={(e) => cambiar(c.id, 'enlace', e.target.value)} />
            </label>
            <div className="auditoria__decision" role="radiogroup" aria-label={`Resultado de la cita ${k + 1}`}>
              {RESULTADOS.map((r) => (
                <label key={r.valor} className="v-semaforo__opcion" data-color={r.color}>
                  <input type="radio" name={`resultado-${c.id}`} checked={x.resultado === r.valor} onChange={() => cambiar(c.id, 'resultado', r.valor)} />
                  <span>{r.texto}</span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}

      <fieldset className="investigacion__paso panel">
        <legend className="auditoria__titulo">
          <span className="mono">Sin IA · 2 min</span> Busca por texto
        </legend>
        <label className="bitacora__campo">
          <span>En el buscador, escribe «sentido natural y obvio». ¿Cuál es el primer fallo de la Corte Suprema que aparece? (rol y fecha)</span>
          <input className="campo" value={f.sinIa} maxLength={200} onChange={(e) => setF((x) => ({ ...x, sinIa: e.target.value }))} />
        </label>
        <label className="bitacora__campo">
          <span>¿Acertó tu semáforo? Si no, ¿qué te hizo confiar?</span>
          <textarea rows={2} maxLength={800} value={f.confio} onChange={(e) => setF((x) => ({ ...x, confio: e.target.value }))} />
        </label>
      </fieldset>

      <div className="bitacora__pie">
        <button type="submit" className="boton boton--primario">
          {hecho('practica') ? 'Actualizar fichas' : 'Guardar fichas'}
        </button>
        <p className="bitacora__aviso" aria-live="polite">
          {aviso}
        </p>
      </div>
    </form>
  );
}
