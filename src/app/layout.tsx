import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google';
import { Cabecera } from '@/components/marco/Cabecera';
import { Pie } from '@/components/marco/Pie';
import { modoDemostracion } from '@/lib/config';
import './globals.css';
import './marca.css';
import './portada.css';
import './leccion.css';

const sans = Geist({ subsets: ['latin'], variable: '--fuente-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--fuente-mono', display: 'swap' });
// La serif sólo aparece en las lecturas: no se precarga en todas las páginas (se descarga cuando se usa).
const serif = Source_Serif_4({ subsets: ['latin'], variable: '--fuente-serif', display: 'swap', preload: false });

export const metadata: Metadata = {
  title: { default: 'EVA × Derecho PUCV · IA y Derecho', template: '%s · EVA × Derecho PUCV' },
  description:
    'Plataforma académica para aprender a usar la inteligencia artificial en Derecho con criterio jurídico: cursos, videocápsulas de EVA, guías y herramientas. Prototipo.',
  robots: { index: false, follow: false }, // prototipo: no se indexa
};

export const viewport: Viewport = {
  themeColor: '#08090a',
  colorScheme: 'dark light',
};

/* Aplica el tema guardado antes de pintar (evita el destello). Sólo lee una preferencia de este navegador. */
const temaInicial = `try{var t=localStorage.getItem('eva-tema');if(t==='claro'||t==='oscuro')document.documentElement.dataset.tema=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const demo = modoDemostracion();
  return (
    <html lang="es-CL" data-tema="oscuro" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
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
