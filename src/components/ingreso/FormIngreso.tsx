'use client';

import { useActionState } from 'react';
import { pedirEnlace, type EstadoIngreso } from '@/app/ingresar/acciones';

export function FormIngreso({ siguiente }: { siguiente: string }) {
  const [estado, accion, enviando] = useActionState<EstadoIngreso, FormData>(pedirEnlace, null);
  return (
    <form action={accion} className="ingreso panel">
      <input type="hidden" name="siguiente" value={siguiente} />
      <label className="bitacora__campo">
        <span>Tu correo institucional</span>
        <input type="email" name="correo" required autoComplete="email" maxLength={254} className="campo" />
      </label>
      <button type="submit" className="boton boton--primario" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Enviarme un enlace'}
      </button>
      <p className="ingreso__estado" role="status" data-ok={estado?.ok ? 'si' : undefined}>
        {estado?.mensaje}
      </p>
    </form>
  );
}
