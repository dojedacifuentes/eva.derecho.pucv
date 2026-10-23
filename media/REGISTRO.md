# Registro de medios generados con IA

Antes de publicar cualquiera de estas piezas, anotarla también en `eva.proyecto01/docs/ASSET_LICENSES.md`
(sección «Generado con IA para redes»), como pide la skill `eva-voz-y-avatar`.

| Fecha | Pieza | Herramienta | Origen | Costo | Dónde está |
|---|---|---|---|---|---|
| 22-10-2026 | EVA en la portada (8 s, sin voz, 16:9) | Google Flow · Omni 1.1 Flash, fotograma inicial, 720p | Encuadre armado con `public/eva/eva-retrato.webp` (`media/fuente/eva-encuadre-16x9.png`); proyecto Flow «oct 22 - 22:00» | 12 puntos de Flow | Original `media/flow/eva-portada-flow-720p.mp4`; web (ida y vuelta, sin audio) `public/video/eva-portada.{mp4,webm,webp}` |
| 22-10-2026 | EVA da la bienvenida (31 s, 4:5) | HeyGen · `create_speech` (Camila Vega `6ce26db0…`, ElevenLabs `eleven_v4`, es) + `create_video_from_image` (retrato, 1080p, expresividad media) | Retrato `eva-retrato.webp`; guion abajo | 14 créditos premium (600 → 586) | Original `media/heygen/eva-bienvenida-1080.mp4`; web `public/video/eva-bienvenida.{mp4,webp}`; video HeyGen `6c829311f783556c7d655f03c91478b9` |

| 22-10-2026 | Escenas de la Facultad (imágenes): EVA en el patio, EVA en la escalera, Código Civil que se vuelve red de luz, fachada de noche | Google Flow · Nano Banana 2.1 (0 puntos), con referencias: retrato de EVA y fotos de la Casa Central de Wikimedia Commons (ver «Créditos») | Prompts en este registro y en STORYBOARD.md | 0 | `media/flow/*.jpg`; web `public/facultad/*.webp` |
| 22-10-2026 | Escenas animadas (4 × 6 s, 1080p) | HeyGen · `image_to_video` (heygen-video-1) | Las cuatro imágenes anteriores | 5 créditos c/u (≈ 20; 586 → ≈ 566) | `media/heygen/escena-*.mp4`; montaje `public/video/portada-escenas*.mp4` (`scripts/montaje-portada.mjs`) |

| 22/23-10-2026 | Escenas biblioteca y galería (v1 descartadas: el rostro se alejó de EVA; v2 con los retratos oficiales `eva-capsula-perfil` y `eva-consola` como referencia) | Flow · Nano Banana 2.1 + HeyGen `image_to_video` | `media/flow/eva-{biblioteca,pasillo}-v2.jpg` | 0 + 4 × 5 créditos | `media/heygen/escena-*.mp4` (las v1 quedan como `*-v1.mp4`) |
| 23-10-2026 | Voz «El Derecho se está transformando» (30,7 s) | HeyGen `create_speech` · Camila Vega · ElevenLabs `eleven_v4` · es | Guion abajo | incluido (créditos: 586 → 544 en total por escenas y voz) | `media/heygen/voz-transformacion.wav`; montaje con voz `public/video/portada-escenas-voz.mp4` + `portada-escenas.vtt` |
| 23-10-2026 | Loop oficial de EVA en el montaje («Soy EVA…») | — (archivo de eva.proyecto01) | `eva.proyecto01/public/eva/eva-loop.mp4` | 0 | dentro del montaje |

## Guion «El Derecho se está transformando» (voz exacta)

> El Derecho siempre ha cambiado. Con la imprenta. Con los códigos. Con internet. Hoy cambia otra vez. Y no es el
> futuro: ya es tu presente. La pregunta no es si vas a usar inteligencia artificial. Es si vas a saber cuándo creerle.
> Aquí aprendes a usarla, a verificarla… y a construir con ella. Soy EVA, una inteligencia artificial. Y el Derecho que
> viene… lo vas a escribir tú.

## Créditos de fotos de referencia (Wikimedia Commons)

- «Casa Central PUCV, Valparaíso 20230903 01/03» y «20230901», Carlos Figueroa Rojas, CC BY-SA 4.0.
- «Frontis de la casa central…» y «Casa central de la Universidad Católica de Valparaíso», SebaTomas, CC BY-SA 3.0.
- «Pontificia Universidad Católica de Valparaíso, Casa Central, escalas», Carlos Reusser Monsalvez, CC BY 2.0.
- «Casa Central de la PUCV 2007 01/02/03» y «Capilla…», Warko, CC BY-SA 3.0.
Las imágenes generadas son obras derivadas de referencia; al publicar, citar estos créditos en «Acerca».

## Guion de la bienvenida (voz exacta)

> Hola. Soy EVA, una inteligencia artificial. Y aquí te voy a enseñar a usarme… y a desconfiar de mí. En esta
> plataforma, hecha para Derecho PUCV, vas a usar la IA en tareas reales: estudiar, investigar, revisar un escrito.
> En cada lección escondo un error. Tu trabajo es encontrarlo. Si eres estudiante, empieza por la primera lección.
> Si eres docente, te muestro cómo llevarla a tu clase. Elige tu entrada.

## Marca de Derecho PUCV

`public/pucv/derecho-pucv-logo.png` (280 × 90) y `derecho-pucv-vertical.png` (250 × 132) son los archivos que publica
la propia Facultad en derecho.pucv.cl (cabecera y pie), bajados el 22-10-2026. `escudo.png` y `palabra.png` son
recortes de ese archivo, sin redibujar ni recolorear (en fondo oscuro la palabra se muestra en negativo blanco).
**Pendiente:** pedir a la Facultad el logo vectorial y su manual de marca, y su autorización de uso en la plataforma.
