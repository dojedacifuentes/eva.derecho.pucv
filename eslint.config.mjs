import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**', 'test-results/**', 'playwright-report/**', '.claude/**'] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default eslintConfig;
