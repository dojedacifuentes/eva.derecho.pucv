/**
 * Geometría del escudo de Derecho PUCV reconstruida del archivo oficial (derecho.pucv.cl), en el sistema
 * viewBox 0 0 830 1090. La comparten la versión a color (EscudoDerecho) y la de línea de luz (EscudoLinea).
 * Pendiente: validar con el vector y el manual de marca de la Facultad.
 */
export const ESCUDO = {
  exterior:
    'M20 34 Q20 6 46 6 Q72 6 78 28 L752 28 Q758 6 784 6 Q810 6 810 34 L810 700 C810 900 640 1058 415 1088 C190 1058 20 900 20 700 Z',
  campo: 'M46 78 Q74 76 90 52 L740 52 Q756 76 784 78 L784 700 C784 884 626 1034 415 1062 C204 1034 46 884 46 700 Z',
  escudete: 'M168 146 L662 146 L662 700 C662 830 560 906 415 930 C270 906 168 830 168 700 Z',
  campoInterior: 'M183 274 L647 274 L647 700 C647 822 552 893 415 915 C278 893 183 822 183 700 Z',
  izquierda: 'M104 282 L104 720 C104 850 165 950 262 1012',
  derecha: 'M590 1016 C682 956 727 854 727 722 L727 282',
} as const;
