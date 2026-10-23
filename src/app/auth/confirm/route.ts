import type { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { rutaSegura } from '@/lib/auth/rutas';
import { clienteServidor } from '@/lib/supabase/servidor';

const TIPOS: EmailOtpType[] = ['email', 'magiclink', 'signup', 'invite', 'recovery', 'email_change'];

/**
 * Destino del enlace del correo: Supabase verifica el token y deja la sesión en cookies. El destino final sólo
 * puede ser una ruta interna (`rutaSegura`).
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const tokenHash = url.searchParams.get('token_hash');
  const tipo = url.searchParams.get('type') as EmailOtpType | null;
  const siguiente = rutaSegura(url.searchParams.get('siguiente'));

  const supabase = await clienteServidor();
  if (supabase && tokenHash && tipo && TIPOS.includes(tipo)) {
    const { error } = await supabase.auth.verifyOtp({ type: tipo, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(new URL(siguiente, url.origin));
  }
  return NextResponse.redirect(new URL('/ingresar?error=enlace', url.origin));
}
