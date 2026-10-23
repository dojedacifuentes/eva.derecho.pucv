import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Método, privacidad y créditos' };

const COMMONS = [
  ['«Casa Central PUCV, Valparaíso 20230903» y «20230901»', 'Carlos Figueroa Rojas', 'CC BY-SA 4.0'],
  ['«Frontis de la casa central…» y «Casa central de la Universidad Católica de Valparaíso»', 'SebaTomas', 'CC BY-SA 3.0'],
  ['«Pontificia Universidad Católica de Valparaíso, Casa Central, escalas»', 'Carlos Reusser Monsalvez', 'CC BY 2.0'],
  ['«Casa Central de la PUCV 2007» y «Capilla…»', 'Warko', 'CC BY-SA 3.0'],
];

export default function Acerca() {
  return (
    <div className="pagina envoltura">
      <header className="pagina__cabeza">
        <p className="rotulo rotulo--acento">Acerca</p>
        <h1 className="titular pagina__titulo">Cómo está hecha, qué guarda y de quién es cada imagen.</h1>
        <p className="entradilla">
          Prototipo de plataforma académica de IA y Derecho, propuesto para la Escuela de Derecho de la Pontificia
          Universidad Católica de Valparaíso. EVA es una inteligencia artificial: también se equivoca.
        </p>
      </header>

      <section className="bloque" aria-labelledby="t-metodo">
        <h2 id="t-metodo" className="bloque__titulo">Método</h2>
        <ul className="lista-simple">
          <li>Cada unidad tiene un objetivo que se puede comprobar, una tarea jurídica real y una evaluación con criterio de logro.</li>
          <li>La IA se usa como examinadora, no como oráculo: primero respondes tú; lo que corrige, se verifica en la fuente.</li>
          <li>
            Cada dato lleva su fuente y su estado. Lo que falta confirmar dice «pendiente» y no va en la voz de EVA. El
            contenido jurídico lo revisa un docente antes de publicarse.
          </li>
          <li>Las unidades que no están listas dicen «en preparación»: no se simula contenido.</li>
        </ul>
      </section>

      <section className="bloque" aria-labelledby="t-privacidad">
        <h2 id="t-privacidad" className="bloque__titulo">Privacidad</h2>
        <ul className="lista-simple">
          <li>
            <strong>Sin cuenta</strong> (como ahora): tu avance, tu calibración, el semáforo y tu bitácora se guardan sólo
            en este navegador (almacenamiento local, claves que empiezan con <code>eva-derecho:</code>). No se envían a
            ningún servidor. Los borras en «Mi avance» o borrando los datos del sitio.
          </li>
          <li>
            <strong>La evaluación</strong> se corrige en el servidor para que la clave no llegue al navegador: viajan tus
            respuestas, no tu identidad, y sin cuenta no se guardan allí.
          </li>
          <li>
            <strong>Con cuenta institucional</strong> (cuando se active): tu correo, tu avance y tus intentos quedan en una
            base de datos donde cada fila sólo la ve su dueño, su docente de sección y la administración. Tu bitácora es
            privada salvo que decidas compartirla.
          </li>
          <li>«Antes de subir» funciona entero en tu navegador y no pide el documento.</li>
          <li>Sin publicidad, sin rastreadores y sin analítica de terceros. El sitio no se indexa en buscadores mientras sea prototipo.</li>
        </ul>
      </section>

      <section id="creditos" className="bloque" aria-labelledby="t-creditos">
        <h2 id="t-creditos" className="bloque__titulo">Créditos de imágenes</h2>
        <p className="bloque__texto">
          Las escenas de EVA en la Casa Central son imágenes y videos generados con IA (Google Flow y HeyGen) a partir
          del retrato oficial de EVA y de fotos de la Casa Central publicadas en Wikimedia Commons:
        </p>
        <ul className="lista-simple">
          {COMMONS.map(([obra, autor, licencia]) => (
            <li key={obra}>
              {obra}, {autor}, {licencia}.
            </li>
          ))}
        </ul>
        <p className="bloque__texto">
          El escudo y la palabra de Derecho PUCV pertenecen a la Pontificia Universidad Católica de Valparaíso; se usan
          en este prototipo con fines de propuesta.{' '}
          <span className="etiqueta" data-tono="pendiente">
            Autorización de uso pendiente
          </span>{' '}
          La marca EVA y su retrato son de EVA. Tipografías: Geist y Geist Mono, y Source Serif 4 (licencia SIL Open Font).
        </p>
      </section>
    </div>
  );
}
