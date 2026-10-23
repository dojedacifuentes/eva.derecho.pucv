import { describe, expect, it } from 'vitest';
import { BIENVENIDA, idYoutubeValido } from '@/content/videos';

describe('videos de YouTube', () => {
  it('sólo acepta ids con la forma de YouTube', () => {
    expect(idYoutubeValido('dQw4w9WgXcQ')).toBe(true);
    for (const malo of [null, '', 'corto', 'https://youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ"><script>', 'a b c d e f g']) {
      expect(idYoutubeValido(malo), String(malo)).toBe(false);
    }
  });

  it('mientras no haya id, la bienvenida usa la copia local con subtítulos', () => {
    expect(BIENVENIDA.youtube === null || idYoutubeValido(BIENVENIDA.youtube)).toBe(true);
    expect(BIENVENIDA.local).toMatch(/^\/video\/.+\.mp4$/);
    expect(BIENVENIDA.subtitulos).toMatch(/\.vtt$/);
  });
});
