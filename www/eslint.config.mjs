import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// ESLint 10 tracks JSX references natively. The full eslint-config-next preset
// currently includes eslint-plugin-react, whose peer range stops at ESLint 9.
// Enable the supported JS, Next Core Web Vitals, and React Hooks presets directly.
export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended, next.configs['core-web-vitals'], reactHooks.configs.flat.recommended],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
