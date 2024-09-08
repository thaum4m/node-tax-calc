import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from './prettier.config.js';

export default [
  {
    // Spec files ignored as eslint-plugin-jasmine currently incompatible.
    ignores: ['node_modules', 'dist', 'spec'],
  },
  { files: ['**/*.{js,mjs,cjs}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  prettierRecommended,
  {
    rules: {
      'no-console': 'warn',
      'prettier/prettier': ['warn', prettierConfig],
    },
  },
];
