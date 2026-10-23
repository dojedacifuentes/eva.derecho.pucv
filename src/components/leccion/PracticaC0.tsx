'use client';

import { useEffect, useState } from 'react';
import type { PracticaC0Datos } from '@/content/lecciones/c0-comun';
import { PRACTICA_C0_U1 } from '@/content/lecciones/c0-u1-guion';
import { PRACTICA_C0_U2 } from '@/content/lecciones/c0-u2-guion';
import { PRACTICA_C0_U3 } from '@/content/lecciones/c0-u3-guion';
import { PRACTICA_C0_U4 } from '@/content/lecciones/c0-u4-guion';
import { useAvance } from './usarAvance';

interface Guardado {
  respuestas: Record<string, string>;
  justificaciones: Record<string, string>;
  verificacion: Record<string, string>;
}
const VACIO: Guardado = { respuestas: {}, justificaciones: {}, verificacion: {} };

/**
 * Práctica guiada del Curso 0 (≈ 12 min), sin IA y con IA optativa: clasificar ítems con la definición o la caja de
 * concesiones a la vista y, en la 0.4, una ficha de verificación en LeyChile. La clave se muestra sólo después de
 * guardar. Todo queda en el navegador.
 */
function Practica({ datos }: { datos: PracticaC0Datos }) {
  const CLAVE = `eva-derecho:practica:${datos.leccionId}:v1`;
  const { marcar, hecho } = useAvance(datos.leccionId);
  const [g, setG] = useState<Guardado>(VACIO);
  const [revelado, setRevelado] = useState(false);
  const [aviso, setAviso] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [cotejo, setCotejo] = useState<boolean[]>(datos.cotejo.map(() => false));
  const { clasificacion: c, verificacion: v } = datos;

  useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
      if (guardado?.respuestas) {
        // Se carga después de montar para que el HTML del servidor y el del navegador coincidan.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setG({ ...VACIO, ...guardado });
        setRevelado(true);
      }
    } catch {
      // sin almacenamiento
    }
  }, [CLAVE]);

  const responder = (id: string, valor: string) => setG((x) => ({ ...x, respuestas: { ...x.respuestas, [id]: valor } }));
  const justificar = (id: string, valor: string) => setG((x) => ({ ...x, justificaciones: { ...x.justificaciones, [id]: valor } }));
  const verificar = (id: string, valor: string) => setG((x) => ({ ...x, verificacion: { ...x.verificacion, [id]: valor } }));

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (c.items.some((i) => !g.respuestas[i.id])) return setAviso('Falta clasificar algún caso.');
    if (c.justificar && c.items.some((i) => (g.justificaciones[i.id] ?? '').trim().length < 6)) {
      return setAviso('Escribe por qué en cada caso (al menos unas palabras).');
    }
    if (v && v.campos.some((campo) => !(g.verificacion[campo.id] ?? '').trim())) return setAviso('Falta completar la ficha de verificación.');
    try {
      localStorage.setItem(CLAVE, JSON.stringify(g));
    } catch {
      // sin almacenamiento: igual se marca el paso en esta visita
    }
    marcar('practica');
    setRevelado(true);
    setAviso('Guardado en este navegador. Abajo, la clave de cada caso.');
  };

  const aciertos = c.items.filter((i) => g.respuestas[i.id] === c.clave[i.id].correcta).length;
  const textoOpcion = (id: string) => c.opciones.find((o) => o.id === id)?.texto ?? '—';

  const ficha = () =>
    [
      `${c.titulo} · unidad ${datos.leccionId.replace('c0-u', '0.')}`,
      ...c.items.map((i, k) => `${k + 1}. ${textoOpcion(g.respuestas[i.id])}${g.justificaciones[i.id] ? ` · ${g.justificaciones[i.id]}` : ''}`),
      ...(v ? [v.titulo, ...v.campos.map((campo) => `${campo.etiqueta} ${campo.opciones ? campo.opciones.find((o) => o.id === g.verificacion[campo.id])?.texto ?? '—' : g.verificacion[campo.id] ?? '—'}`)] : []),
      `Fecha: ${new Date().toLocaleDateString('es-CL')}`,
    ].join('\n');

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
        {datos.pasos.map((p) => (
          <li key={p.titulo}>
            <strong>{p.titulo}</strong> {p.texto}
          </li>
        ))}
      </ol>

      <form className="clasificar" onSubmit={guardar}>
        <p className="rotulo rotulo--acento">{c.titulo}</p>
        <p className="clasificar__pregunta">{c.pregunta}</p>
        {c.items.map((item, k) => {
          const r = g.respuestas[item.id];
          const clave = c.clave[item.id];
          const acierto = revelado && r === clave.correcta;
          return (
            <fieldset key={item.id} className="clasificar__item panel" data-resultado={revelado ? (acierto ? 'si' : 'no') : undefined}>
              <legend className="clasificar__texto">
                <span className="mono">{k + 1}.</span> {item.texto}
              </legend>
              <div className="clasificar__opciones" role="radiogroup" aria-label={`Caso ${k + 1}`}>
                {c.opciones.map((o) => (
                  <label key={o.id} className="pregunta__chip">
                    <input type="radio" name={`${datos.leccionId}-${item.id}`} checked={r === o.id} onChange={() => responder(item.id, o.id)} />
                    <span>{o.texto}</span>
                  </label>
                ))}
              </div>
              {c.justificar && (
                <label className="bitacora__campo">
                  <span>¿Por qué?</span>
                  <input className="campo" maxLength={300} value={g.justificaciones[item.id] ?? ''} onChange={(e) => justificar(item.id, e.target.value)} />
                </label>
              )}
              {revelado && (
                <p className="clasificar__clave">
                  <strong>{acierto ? '✓ ' : `✗ Era: ${textoOpcion(clave.correcta)}. `}</strong>
                  {clave.porque}
                </p>
              )}
            </fieldset>
          );
        })}

        {v && (
          <fieldset className="clasificar__item panel">
            <legend className="clasificar__texto">{v.titulo}</legend>
            <p>
              {v.intro}{' '}
              <a href={v.enlace.url} target="_blank" rel="noreferrer">
                {v.enlace.texto} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
            </p>
            {v.campos.map((campo) =>
              campo.opciones ? (
                <div key={campo.id} className="clasificar__opciones" role="radiogroup" aria-label={campo.etiqueta}>
                  <span className="clasificar__etiqueta">{campo.etiqueta}</span>
                  {campo.opciones.map((o) => (
                    <label key={o.id} className="pregunta__chip">
                      <input type="radio" name={`${datos.leccionId}-${campo.id}`} checked={g.verificacion[campo.id] === o.id} onChange={() => verificar(campo.id, o.id)} />
                      <span>{o.texto}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <label key={campo.id} className="bitacora__campo">
                  <span>{campo.etiqueta}</span>
                  {campo.largo ? (
                    <textarea rows={2} maxLength={600} value={g.verificacion[campo.id] ?? ''} onChange={(e) => verificar(campo.id, e.target.value)} />
                  ) : (
                    <input className="campo" maxLength={300} value={g.verificacion[campo.id] ?? ''} onChange={(e) => verificar(campo.id, e.target.value)} />
                  )}
                </label>
              ),
            )}
          </fieldset>
        )}

        <div className="bitacora__pie">
          <button type="submit" className="boton boton--primario">
            {hecho('practica') ? 'Actualizar y ver la clave' : 'Guardar y ver la clave'}
          </button>
          {revelado && (
            <button type="button" className="boton" onClick={copiar}>
              {copiado ? '✓ Copiada' : 'Copiar ficha'}
            </button>
          )}
          <p className="bitacora__aviso" aria-live="polite">
            {aviso}
            {revelado && ` ${aciertos} de ${c.items.length} con la clave.`}
          </p>
        </div>
        <p className="bitacora__privacidad mono">Tus respuestas son privadas y quedan en este navegador.</p>
      </form>

      {datos.conIA && (
        <div className="encargo">
          <p className="rotulo">Con IA, optativo</p>
          <p>{datos.conIA.texto}</p>
          <pre className="mono">{datos.conIA.encargo}</pre>
          <p className="encargo__acceso">
            <span className="etiqueta" data-tono="gratis">
              Gratis
            </span>{' '}
            Basta un chat que acepte texto pegado. Lo que responda se compara con el texto de la norma, no al revés.
          </p>
        </div>
      )}

      <fieldset className="cotejo">
        <legend className="rotulo">Lista de cotejo (autoevaluación)</legend>
        {datos.cotejo.map((t, k) => (
          <label key={t} className="cotejo__item">
            <input type="checkbox" checked={cotejo[k]} onChange={() => setCotejo((x) => x.map((y, j) => (j === k ? !y : y)))} />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

export const PracticaC0U1 = () => <Practica datos={PRACTICA_C0_U1} />;
export const PracticaC0U2 = () => <Practica datos={PRACTICA_C0_U2} />;
export const PracticaC0U3 = () => <Practica datos={PRACTICA_C0_U3} />;
export const PracticaC0U4 = () => <Practica datos={PRACTICA_C0_U4} />;
