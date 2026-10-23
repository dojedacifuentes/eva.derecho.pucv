'use server';

import { redirect } from 'next/navigation';
import { rutaSegura, validarCorreo } from '@/lib/auth/rutas';
import { sitioUrl } from '@/lib/config';
import { clienteServidor } from '@/lib/supabase/servidor';

export type EstadoIngreso = { ok: boolean; mensaje: string } | null;

/**
 * Pide a Supabase un enlace de ingreso por correo (sin contraseñas). La autenticación la hace Supabase Auth: aquí
 * sólo se valida el correo, el dominio permitido y el destino. La respuesta no revela si el correo ya tenía cuenta.
 */
export async function pedirEnlace(_previo: EstadoIngreso, datos: FormData): Promise<EstadoIngreso> {
  const supabase = await clienteServidor();
  if (!supabase) return { ok: false, mensaje: 'El ingreso con cuenta no está configurado en este prototipo.' };

  const v = validarCorreo(datos.get('correo'), process.env.DOMINIOS_PERMITIDOS ?? '');
  if (!v.ok) return { ok: false, mensaje: v.motivo };

  const siguiente = rutaSegura(datos.get('siguiente')?.toString());
  const { error } = await supabase.auth.signInWithOtp({
    email: v.correo,
    options: { emailRedirectTo: `${sitioUrl()}/auth/confirm?siguiente=${encodeURIComponent(siguiente)}` },
  });
  if (error && error.status === 429) return { ok: false, mensaje: 'Pediste muchos enlaces seguidos. Espera unos minutos.' };
  return { ok: true, mensaje: `Si el correo puede ingresar, te llegará un enlace a ${v.correo}. Vence en una hora.` };
}

export async function cerrarSesion() {
  const supabase = await clienteServidor();
  await supabase?.auth.signOut();
  redirect('/');
}
