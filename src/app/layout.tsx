import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import { Cabecera } from '@/components/marco/Cabecera';
import { Pie } from '@/components/marco/Pie';
import { modoDemostracion } from '@/lib/config';
import './globals.css';
import './recorte.css';
import './marca.css';
import './portada.css';
import './leccion.css';

// Una sola familia, IBM Plex (OFL): la sans para todo, la mono sólo para cotas y datos del plano, la serif para leer.
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--fuente-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'], variable: '--fuente-mono', display: 'swap' });
// La serif sólo aparece en las lecturas: no se precarga en todas las páginas (se descarga cuando se usa).
const serif = IBM_Plex_Serif({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'], variable: '--fuente-serif', display: 'swap', preload: false });

export const metadata: Metadata = {
  title: { default: 'EVA × Derecho PUCV · IA y Derecho', template: '%s · EVA × Derecho PUCV' },
  description:
    'Plataforma académica para aprender a usar la inteligencia artificial en Derecho con criterio jurídico: cursos, videocápsulas de EVA, guías y herramientas. Prototipo.',
  robots: { index: false, follow: false }, // prototipo: no se indexa
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
};

/* Aplica el tema antes de pintar (evita el destello): el que se eligió en este navegador o, si no, el del sistema. */
const temaInicial = `try{var t=localStorage.getItem('eva-tema');if(t!=='claro'&&t!=='oscuro')t=matchMedia('(prefers-color-scheme: dark)').matches?'oscuro':'claro';document.documentElement.dataset.tema=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const demo = modoDemostracion();
  return (
    <html lang="es-CL" data-tema="claro"className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body className="fondo-reticula">
        <a className="saltar" href="#contenido">
          Saltar al contenido
        </a>
        <Cabecera demo={demo} />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Pie demo={demo} />
      </body>
    </html>
  );
}
