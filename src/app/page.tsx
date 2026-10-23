import Image from 'next/image';
import Link from 'next/link';
import { ConsolaEva } from '@/components/portada/ConsolaEva';
import { Deepfake } from '@/components/portada/Deepfake';
import { Entradas } from '@/components/portada/Entradas';
import { EscenasFacultad } from '@/components/portada/EscenasFacultad';
import type { Escena } from '@/components/portada/escenas';
import { TarjetaCurso } from '@/components/portada/TarjetaCurso';
import { VideoBienvenida } from '@/components/portada/VideoBienvenida';
import { CURSOS } from '@/content/catalogo';
import { RECURSOS } from '@/content/recursos';
import { BIENVENIDA } from '@/content/videos';

const TARJETAS: Record<string, { titular: string; escena: Escena }> = {
  c0: { titular: 'Antes de opinar, la definición.', escena: 'frontera' },
  c1: { titular: 'La IA no sabe Derecho. Predice.', escena: 'prediccion' },
  c2: { titular: 'Que te pregunte. No que te responda.', escena: 'tutor' },
  c3: { titular: 'Si no está en la fuente, no existe.', escena: 'fuente' },
  c4: { titular: 'Construye algo útil. Que no parezca plantilla.', escena: 'sistema' },
};

export default function Portada() {
  return (
    <>
      {/* ------------------------------------------------ apertura */}
      <section className="apertura zona-oscura" aria-labelledby="titulo-portada">
        <div className="envoltura apertura__rejilla">
          <div className="apertura__contenido">
            <p className="rotulo rotulo--acento" data-aparece style={{ '--i': 0 } as React.CSSProperties}>
              Derecho PUCV × EVA
            </p>
            <h1 id="titulo-portada" className="titular apertura__titulo" data-aparece style={{ '--i': 1 } as React.CSSProperties}>
              IA para el Derecho. <span className="degradado-texto">Con criterio.</span>
            </h1>
            <p className="entradilla apertura__bajada" data-aparece style={{ '--i': 2 } as React.CSSProperties}>
              Cursos, videocápsulas, guías y herramientas para usar la IA en la Escuela sin dejar de pensar.
            </p>
            <Entradas />
          </div>
          <EscenasFacultad />
        </div>
      </section>

      {/* ------------------------------------------------ qué hay aquí */}
      <section className="seccion envoltura" aria-labelledby="titulo-recursos">
        <div className="seccion__cabeza">
          <p className="rotulo">01 · Qué hay aquí</p>
          <h2 id="titulo-recursos" className="titular seccion__titulo">
            Todo lo que necesitas para no firmar algo que inventó una máquina.
          </h2>
        </div>
        <ul className="bento">
          {RECURSOS.map((r) => (
            <li key={r.id} className={`bento__celda panel bento__celda--${r.tamano}`}>
              <Link href={r.href} className="bento__enlace">
                <span className="bento__cifra">{r.cifra}</span>
                <span className="bento__nombre">{r.nombre}</span>
                <span className="bento__texto">{r.texto}</span>
                <span className="bento__etiquetas">
                  {r.etiquetas.map((e) => (
                    <span key={e.texto} className="etiqueta" data-tono={e.tono}>
                      {e.texto}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ cursos */}
      <section className="seccion envoltura" aria-labelledby="titulo-cursos">
        <div className="seccion__cabeza">
          <p className="rotulo">02 · Un curso de entrada, cuatro cursos, dieciséis videocápsulas</p>
          <h2 id="titulo-cursos" className="titular seccion__titulo">
            Primero la usas. Después entiendes por qué falló.
          </h2>
          <p className="entradilla">
            El Curso 0 explica qué es la IA según las leyes. Desde el curso 1, cada unidad abre con una tarea jurídica
            real, esconde un error y termina con una evaluación que te dice cuánto sabías y cuánto creías saber.
          </p>
        </div>
        <div className="cursos">
          {CURSOS.map((c) => (
            <TarjetaCurso
              key={c.id}
              href={`/cursos/${c.slug}`}
              numero={c.numero}
              titulo={c.titulo}
              titular={TARJETAS[c.id].titular}
              bajada={c.pregunta}
              escena={TARJETAS[c.id].escena}
              disponibles={c.unidades.filter((u) => u.estado === 'disponible').length}
              total={c.unidades.length}
            />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ EVA en la Facultad */}
      <section className="facultad zona-oscura" aria-labelledby="titulo-facultad">
        <div className="envoltura">
          <div className="seccion__cabeza">
            <p className="rotulo rotulo--acento">03 · EVA en Derecho PUCV</p>
            <h2 id="titulo-facultad" className="titular seccion__titulo">
              La misma Casa Central. Otra forma de estudiar en ella.
            </h2>
          </div>
          <div className="facultad__galeria">
            <figure className="facultad__escena facultad__escena--ancha">
              <Image src="/facultad/fachada-noche.webp" alt="La Casa Central en avenida Brasil, de noche, con líneas de luz azul y violeta sobre la fachada" fill sizes="(max-width: 900px) 100vw, 66vw" />
              <figcaption className="mono">Av. Brasil · recreación</figcaption>
            </figure>
            <figure className="facultad__escena">
              <Image src="/facultad/eva-patio.webp" alt="EVA, con chaqueta y libro, camina por el patio de las palmeras de la Facultad" fill sizes="(max-width: 900px) 100vw, 33vw" />
              <figcaption className="mono">El patio · recreación</figcaption>
            </figure>
          </div>
          <p className="facultad__nota mono">
            Imágenes generadas con IA a partir de fotos reales de la Casa Central (créditos en «Acerca»). Que sean
            convincentes es justamente el punto de la sección siguiente.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ deepfakes y consola */}
      <section className="sombra zona-oscura" aria-labelledby="titulo-sombra">
        <div className="envoltura sombra__rejilla">
          <div>
            <p className="rotulo rotulo--acento">04 · Hablar con EVA</p>
            <h2 id="titulo-sombra" className="titular seccion__titulo">¿Y si esta EVA fuera un deepfake?</h2>
            <p className="entradilla">
              Lo es, en parte: su cara y su voz son sintéticas. En Derecho, una imagen nítida no prueba nada. Pasa el
              cursor por el vidrio y pregúntale lo que quieras saber antes de confiar.
            </p>
            <Deepfake />
          </div>
          <ConsolaEva />
        </div>
      </section>

      {/* ------------------------------------------------ bienvenida en video */}
      <section className="seccion envoltura bienvenida" aria-labelledby="titulo-bienvenida">
        <div className="bienvenida__video panel">
          <VideoBienvenida video={BIENVENIDA} />
        </div>
        <div>
          <p className="rotulo">05 · Antes de entrar</p>
          <h2 id="titulo-bienvenida" className="titular seccion__titulo">EVA te lo dice en 30 segundos.</h2>
          <details className="transcripcion">
            <summary>Leer lo que dice</summary>
            <p>
              Hola. Soy EVA, una inteligencia artificial. Y aquí te voy a enseñar a usarme… y a desconfiar de mí. En
              esta plataforma, hecha para Derecho PUCV, vas a usar la IA en tareas reales: estudiar, investigar,
              revisar un escrito. En cada lección escondo un error. Tu trabajo es encontrarlo. Si eres estudiante,
              empieza por la primera lección. Si eres docente, te muestro cómo llevarla a tu clase. Elige tu entrada.
            </p>
          </details>
          <div className="bienvenida__acciones">
            <Link className="boton boton--primario" href="/cursos/comprender-la-ia/que-es-la-ia">
              Empezar la lección 1 →
            </Link>
            <Link className="boton" href="/docentes">
              Soy docente
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
