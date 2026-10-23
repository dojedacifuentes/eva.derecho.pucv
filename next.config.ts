import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const desarrollo = process.env.NODE_ENV !== 'production';
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

/*
 * Política de contenido: sólo recursos propios y, si está configurado, el proyecto de Supabase.
 * Next inyecta scripts en línea para hidratar: sin nonces (que obligarían a renderizar todo en cada
 * petición) hay que permitir 'unsafe-inline'. Lo que sí se cierra: marcos ajenos (salvo el reproductor de YouTube
 * sin cookies, que se carga sólo al pulsar ▶), formularios a otros dominios, <base> y conexiones a servidores no
 * declarados.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${desarrollo ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  'frame-src https://www.youtube-nocookie.com',
  `connect-src 'self'${supabase ? ` ${supabase}` : ''}${desarrollo ? ' ws:' : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          ...(desarrollo ? [] : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]),
        ],
      },
    ];
  },
};

// remark-gfm: tablas en las lecciones MDX. Con Turbopack los complementos se nombran como texto.
export default createMDX({ options: { remarkPlugins: ['remark-gfm'] } })(nextConfig);
