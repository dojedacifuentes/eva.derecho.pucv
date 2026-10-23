import { expect, test } from '@playwright/test';

/**
 * Recorrido de la unidad 1.1 sin cuenta (modo demostración): punto de partida, semáforo, lectura, práctica y
 * evaluación corregida en el servidor; el avance aparece en «Mi avance». Requiere el servidor en marcha (npm run dev).
 */
test('la unidad 1.1 se completa y el avance queda en el navegador', async ({ page }) => {
  await page.goto('/cursos/comprender-la-ia/que-es-la-ia', { waitUntil: 'networkidle' });

  // Punto de partida
  await page.getByRole('group', { name: /qué tan seguro estás de que su corrección/i }).getByRole('button', { name: '4' }).click();
  await expect(page.getByText('Anotado: 4 de 5')).toBeVisible();

  // Presentación: ir al semáforo y marcar (rojo la segunda corrección), luego al último tramo
  const presenta = page.locator('#presentacion');
  for (let i = 0; i < 4; i++) await presenta.getByRole('button', { name: 'Siguiente →' }).click();
  await page.locator('input[name="semaforo-c1"]').nth(0).check();
  await page.locator('input[name="semaforo-c2"]').nth(2).check();
  for (let i = 0; i < 3; i++) await presenta.getByRole('button', { name: 'Siguiente →' }).click();

  // Lectura y práctica
  await page.getByRole('button', { name: 'Terminé la lectura' }).click();
  const campos = page.locator('.bitacora textarea');
  await campos.nth(0).fill('Que me hiciera cinco preguntas sobre los arts. 19 a 24.');
  await campos.nth(1).fill('La corrección del art. 20, en el apunte y en LeyChile.');
  await campos.nth(2).fill('Responder sin mirar el apunte desde la primera.');
  await page.getByRole('button', { name: 'Guardar bitácora' }).click();
  await expect(page.getByText('Bitácora guardada en este navegador.')).toBeVisible();

  // Evaluación: primero incompleta, luego todo correcto con confianza
  await page.getByRole('button', { name: 'Enviar respuestas' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Falta responder' })).toBeVisible();
  const respuestas: Record<number, string> = { 1: 'c', 2: 'f', 3: 'b', 4: 'b', 5: 'c' };
  for (const [n, op] of Object.entries(respuestas)) {
    // Se toca la opción entera (la etiqueta), como en el teléfono; antes se centra, porque el índice queda fijo arriba.
    for (const opcion of [
      page.locator('label', { has: page.locator(`input[name="p${n}"][value="${op}"]`) }),
      page.locator('label', { has: page.locator(`input[name="c${n}"]`) }).first(),
    ]) {
      const input = opcion.locator('input');
      await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await opcion.click();
      await expect(input).toBeChecked();
    }
  }
  await page.getByRole('button', { name: 'Enviar respuestas' }).click();
  await expect(page.getByText('Dominio logrado.').first()).toBeVisible({ timeout: 20_000 }); // la corrige el servidor
  await expect(page.locator('.resultado__cifra')).toHaveText('5/5', { timeout: 20_000 });
  await expect(page.getByText(/Ojo clínico/)).toBeVisible();

  // Cierre e índice
  await expect(page.locator('.indice-leccion__estado')).toHaveText('Completada');

  // Mi avance
  await page.goto('/mi-avance', { waitUntil: 'networkidle' });
  await expect(page.getByText(/Completada · 100 % · 5\/5 · Ojo clínico/)).toBeVisible();
});

test('la unidad 3.1: semáforo, ficha de auditoría y evaluación con «Ojo clínico»', async ({ page }) => {
  await page.goto('/cursos/investigar-derecho/verificar-antes-de-firmar', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Verificar antes de firmar');

  // Semáforo de la presentación: rojo sólo a la cita 2
  const presenta = page.locator('#presentacion');
  for (let i = 0; i < 3; i++) await presenta.getByRole('button', { name: 'Siguiente →' }).click();
  const marcas = { c1: 0, c2: 2, c3: 1, c4: 1 } as const;
  for (const [id, k] of Object.entries(marcas)) {
    const opcion = page.locator(`input[name="semaforo-c3-u1-${id}"]`).nth(k);
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.check();
  }

  // Ficha de auditoría: primero incompleta, luego completa
  await page.getByRole('button', { name: 'Guardar ficha de auditoría' }).click();
  await expect(page.getByText('Falta decidir alguna cita')).toBeVisible();
  const decisiones = { c1: 'Aceptar', c2: 'Rechazar', c3: 'Revisar', c4: 'Revisar' };
  for (const [id, texto] of Object.entries(decisiones)) {
    const cita = page.locator('fieldset.auditoria__cita').filter({ has: page.locator(`input[name="auditoria-${id}"]`) });
    const opcion = cita.locator('label', { hasText: texto });
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.click();
    await cita.getByLabel('¿Dónde la verificaste?').fill(id === 'c4' ? 'Catálogo Biblioteca PUCV' : 'https://www.bcn.cl/leychile');
  }
  const corregir = page.locator('label', { hasText: 'Lo corrijo antes de presentarlo' });
  await corregir.evaluate((e) => e.scrollIntoView({ block: 'center' }));
  await corregir.click();
  await page.getByRole('button', { name: 'Guardar ficha de auditoría' }).click();
  await expect(page.getByText('Ficha guardada en este navegador.')).toBeVisible();

  // Evaluación perfecta, sin pistas
  for (const [n, op] of Object.entries({ 1: 'c', 2: 'a', 3: 'f', 4: 'b', 5: 'c' })) {
    for (const opcion of [
      page.locator('label', { has: page.locator(`input[name="p${n}"][value="${op}"]`) }),
      page.locator('label', { has: page.locator(`input[name="c${n}"]`) }).first(),
    ]) {
      await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await opcion.click();
    }
  }
  await page.getByRole('button', { name: 'Enviar respuestas' }).click();
  await expect(page.locator('.resultado__cifra')).toHaveText('5/5', { timeout: 20_000 });
  await expect(page.getByText(/Ojo clínico/)).toBeVisible();
});

test('la unidad 3.2: semáforo, bitácora del ciclo y evaluación con «Ojo clínico»', async ({ page }) => {
  await page.goto('/cursos/investigar-derecho/fuentes-chilenas', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Buscar en fuentes chilenas');

  const presenta = page.locator('#presentacion');
  for (let i = 0; i < 2; i++) await presenta.getByRole('button', { name: 'Siguiente →' }).click();
  for (const [id, k] of Object.entries({ c1: 2, c2: 1, c3: 0 })) {
    const opcion = page.locator(`input[name="semaforo-c3-u2-${id}"]`).nth(k);
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.check();
  }

  // Bitácora: incompleta, luego completa
  const practica = page.locator('#practica');
  await practica.getByRole('button', { name: 'Guardar bitácora' }).click();
  await expect(practica.getByText(/Completa el paso 1/)).toBeVisible();
  await practica.getByLabel('Términos con que vas a buscar').fill('Ley 21.719, vigencia, transitorio');
  await practica.getByLabel(/LeyChile \(texto y ficha/).check();
  await practica.getByLabel('¿Qué contará como respuesta?').fill('Una fecha, el artículo que la fija y su fuente oficial.');
  for (const [id, r] of Object.entries({ c1: 'Corregida', c2: 'Confirmada', c3: 'Confirmada' })) {
    const opcion = practica.locator('label', { has: page.locator(`input[name="verificacion-${id}"]`) }).filter({ hasText: r });
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.click();
  }
  const enlaces = practica.getByLabel('Enlace donde lo verificaste');
  for (let i = 0; i < 3; i++) await enlaces.nth(i).fill('https://www.bcn.cl/leychile/navegar?idNorma=1209272');
  await practica.getByLabel('Tu respuesta a la pregunta, con sus fuentes').fill('Al día de hoy, sus cambios rigen el 1-12-2026 (art. 1° transitorio); mientras tanto rige la Ley 19.628.');
  await practica.getByRole('group', { name: 'Qué tan seguro estás de tu respuesta' }).getByRole('button', { name: '4' }).click();
  await practica.getByRole('button', { name: 'Guardar bitácora' }).click();
  await expect(practica.getByText(/Bitácora guardada en este navegador, con fecha de consulta/)).toBeVisible();

  for (const [n, op] of Object.entries({ 1: 'd', 2: 'b', 3: 'f', 4: 'a', 5: 'c' })) {
    for (const opcion of [
      page.locator('label', { has: page.locator(`input[name="p${n}"][value="${op}"]`) }),
      page.locator('label', { has: page.locator(`input[name="c${n}"]`) }).first(),
    ]) {
      await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await opcion.click();
    }
  }
  await page.getByRole('button', { name: 'Enviar respuestas' }).click();
  await expect(page.locator('.resultado__cifra')).toHaveText('5/5', { timeout: 20_000 });
  await expect(page.getByText(/Ojo clínico/)).toBeVisible();
});

test('la unidad 3.3: semáforo, fichas de verificación y evaluación con «Ojo clínico»', async ({ page }) => {
  await page.goto('/cursos/investigar-derecho/jurisprudencia-real', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jurisprudencia real, no inventada');

  const presenta = page.locator('#presentacion');
  for (let i = 0; i < 2; i++) await presenta.getByRole('button', { name: 'Siguiente →' }).click();
  for (const [id, k] of Object.entries({ c1: 0, c2: 1, c3: 2 })) {
    const opcion = page.locator(`input[name="semaforo-c3-u3-${id}"]`).nth(k);
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.check();
  }

  const practica = page.locator('#practica');
  await practica.getByRole('button', { name: 'Guardar fichas' }).click();
  await expect(practica.getByText(/Cada ficha necesita/)).toBeVisible();
  const datos = { c1: ['Existe y coincide', 'La uso tal cual'], c2: ['Existe, con datos distintos', 'La uso corregida'], c3: ['No aparece', 'No la uso'] };
  for (const [id, [existe, resultado]] of Object.entries(datos)) {
    const ficha = practica.locator('fieldset.investigacion__paso').filter({ has: page.locator(`input[name="existe-${id}"]`) });
    for (const texto of [existe, resultado]) {
      const opcion = ficha.locator('label').filter({ hasText: texto });
      await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await opcion.click();
    }
    await ficha.getByLabel(/Enlace oficial/).fill('https://juris.pjud.cl/ · rol y era');
  }
  await practica.getByLabel(/Acertó tu semáforo/).fill('Sí: dudé de la fecha de la 2 y la 3 no apareció.');
  await practica.getByRole('button', { name: 'Guardar fichas' }).click();
  await expect(practica.getByText('Fichas guardadas en este navegador. La revelación, en la evaluación.')).toBeVisible();

  for (const [n, op] of Object.entries({ 1: 'd', 2: 'f', 3: 'c', 4: 'a', 5: 'b' })) {
    for (const opcion of [
      page.locator('label', { has: page.locator(`input[name="p${n}"][value="${op}"]`) }),
      page.locator('label', { has: page.locator(`input[name="c${n}"]`) }).first(),
    ]) {
      await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await opcion.click();
    }
  }
  await page.getByRole('button', { name: 'Enviar respuestas' }).click();
  await expect(page.locator('.resultado__cifra')).toHaveText('5/5', { timeout: 20_000 });
  await expect(page.getByText(/Ojo clínico/)).toBeVisible();
});

test('la unidad 3.4: semáforo, bitácora propia y evaluación con «Ojo clínico»', async ({ page }) => {
  await page.goto('/cursos/investigar-derecho/organizar-la-investigacion', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Organizar y documentar una investigación');

  const presenta = page.locator('#presentacion');
  for (let i = 0; i < 3; i++) await presenta.getByRole('button', { name: 'Siguiente →' }).click();
  for (const [id, k] of Object.entries({ c1: 0, c2: 1, c3: 2, c4: 1 })) {
    const opcion = page.locator(`input[name="semaforo-c3-u4-${id}"]`).nth(k);
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.check();
  }

  const practica = page.locator('#practica');
  await practica.getByRole('button', { name: 'Guardar bitácora' }).click();
  await expect(practica.getByText('Primero revisa las cuatro entradas del compañero.')).toBeVisible();
  for (const [id, texto] of Object.entries({ c1: 'Se sostiene', c2: 'Falta algo', c3: 'No se sostiene', c4: 'Falta algo' })) {
    const opcion = practica.locator('label', { has: page.locator(`input[name="revision-${id}"]`) }).filter({ hasText: new RegExp(`^${texto}$`) });
    await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
    await opcion.click();
  }
  await practica.getByLabel(/La pregunta de tu informe/).fill('¿Desde cuándo rigen los cambios de la Ley 21.719?');
  const filas = [
    ['Ley 21.719, art. 1° transitorio', 'https://www.bcn.cl/leychile/navegar?idNorma=1209272', 'verificada'],
    ['Código Civil, art. 7', 'https://www.bcn.cl/leychile/navegar?idNorma=172986', 'pendiente'],
    ['Boletín 18.623-07', 'https://tramitacion.senado.cl/', 'verificada'],
  ];
  for (const [k, [cita, enlace, estado]] of filas.entries()) {
    await practica.getByLabel(`Cita de la fuente ${k + 1}`).fill(cita);
    await practica.getByLabel(`Enlace de la fuente ${k + 1}`).fill(enlace);
    await practica.getByLabel(`Estado de la fuente ${k + 1}`).selectOption(estado);
  }
  const no = practica.locator('label', { hasText: 'No usé IA' });
  await no.evaluate((e) => e.scrollIntoView({ block: 'center' }));
  await no.click();
  await practica.getByRole('button', { name: 'Guardar bitácora' }).click();
  await expect(practica.getByText(/Bitácora guardada en este navegador/)).toBeVisible();

  for (const [n, op] of Object.entries({ 1: 'b', 2: 'a', 3: 'f', 4: 'c', 5: 'd' })) {
    for (const opcion of [
      page.locator('label', { has: page.locator(`input[name="p${n}"][value="${op}"]`) }),
      page.locator('label', { has: page.locator(`input[name="c${n}"]`) }).first(),
    ]) {
      await opcion.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      await opcion.click();
    }
  }
  await page.getByRole('button', { name: 'Enviar respuestas' }).click();
  await expect(page.locator('.resultado__cifra')).toHaveText('5/5', { timeout: 20_000 });
  await expect(page.getByText(/Ojo clínico/)).toBeVisible();
});

test('Antes de subir cambia el veredicto con las respuestas', async ({ page }) => {
  await page.goto('/herramientas/antes-de-subir', { waitUntil: 'networkidle' });
  await expect(page.getByText('Puedes subirlo.')).toBeVisible();
  await page.getByLabel(/datos que identifican a una persona/i).check();
  await expect(page.getByText('No lo subas así.')).toBeVisible();
  await page.getByLabel(/Institucional/).check();
  await expect(page.getByText('Con cuidado: ajústalo antes.')).toBeVisible();
});

test('las páginas del menú existen', async ({ page }) => {
  for (const ruta of ['/recursos', '/docentes', '/biblioteca', '/mi-avance', '/docente', '/ingresar', '/herramientas', '/acerca']) {
    const r = await page.goto(ruta);
    expect(r?.status(), ruta).toBe(200);
  }
});
