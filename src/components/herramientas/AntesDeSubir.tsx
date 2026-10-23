'use client';

import { useState } from 'react';
import { clasificar, RESPUESTAS_INICIALES, type Plan, type Respuestas } from '@/lib/herramientas/antes-de-subir';

const PREGUNTAS: { campo: Exclude<keyof Respuestas, 'plan'>; texto: string; ayuda: string }[] = [
  { campo: 'datosPersonales', texto: '¿Tiene datos que identifican a una persona?', ayuda: 'Nombres, RUT, correos, teléfonos, direcciones, rol de una causa con partes.' },
  { campo: 'datosSensibles', texto: '¿Tiene datos sensibles o de menores de edad?', ayuda: 'Salud, vida sexual, origen étnico, creencias, antecedentes penales, niños, niñas y adolescentes.' },
  { campo: 'confidencial', texto: '¿Es confidencial?', ayuda: 'Información de un cliente, de una causa no pública o protegida por secreto profesional (también en la clínica jurídica).' },
  { campo: 'obraAjena', texto: '¿Es un manual, libro o artículo de otra persona?', ayuda: 'Una obra protegida, aunque la tengas en PDF.' },
  { campo: 'deOtroSinPermiso', texto: '¿Son apuntes o trabajos de otra persona, sin su permiso?', ayuda: 'Por ejemplo, el resumen de un compañero.' },
  { campo: 'autorizadoPorDocente', texto: '¿Tu profesor autorizó expresamente usarlo con IA?', ayuda: 'Por escrito, en el programa o en el aula virtual.' },
];

const PLANES: { valor: Plan; texto: string }[] = [
  { valor: 'gratis', texto: 'Gratis, con mi cuenta personal' },
  { valor: 'pago-personal', texto: 'De pago, con mi cuenta personal' },
  { valor: 'institucional', texto: 'Institucional (contratado por la universidad)' },
];

const NIVEL = { verde: 'Verde', ambar: 'Ámbar', rojo: 'Rojo' } as const;

/** El formulario y el veredicto. Nada sale del navegador: ni el documento (que no se pide) ni las respuestas. */
export function AntesDeSubir() {
  const [r, setR] = useState<Respuestas>(RESPUESTAS_INICIALES);
  const v = clasificar(r);
  return (
    <div className="antes-subir">
      <form className="antes-subir__form panel" onSubmit={(e) => e.preventDefault()}>
        {PREGUNTAS.map((p) => (
          <label key={p.campo} className="antes-subir__pregunta">
            <input type="checkbox" checked={r[p.campo]} onChange={(e) => setR((x) => ({ ...x, [p.campo]: e.target.checked }))} />
            <span>
              <strong>{p.texto}</strong>
              <span className="antes-subir__ayuda">{p.ayuda}</span>
            </span>
          </label>
        ))}
        <fieldset className="antes-subir__plan">
          <legend className="rotulo">¿Qué cuenta de IA vas a usar?</legend>
          {PLANES.map((p) => (
            <label key={p.valor} className="pregunta__chip">
              <input type="radio" name="plan" checked={r.plan === p.valor} onChange={() => setR((x) => ({ ...x, plan: p.valor }))} />
              <span>{p.texto}</span>
            </label>
          ))}
        </fieldset>
      </form>
      <div className="antes-subir__veredicto panel" data-nivel={v.nivel} aria-live="polite">
        <p className="rotulo">Veredicto · {NIVEL[v.nivel]}</p>
        <p className="antes-subir__titulo">{v.titulo}</p>
        <ul>
          {v.motivos.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="rotulo">Qué hacer</p>
        <ul>
          {v.queHacer.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
