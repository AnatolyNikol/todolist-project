import js from '@eslint/js';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/**@type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint.plugin,
      react: eslintReact,
      'react-hooks': eslintReactHooks,
    },
  },
  { ignores: ['node_modules'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2022 },
      parserOptions: { project: './tsconfig.json' },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...eslintConfigPrettier.rules,
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/ban-ts-comment': ['warn'],
    },
  },
  {
    overrides: [
      {
        files: ['tests/**/*'],
        env: {
          jest: true,
        },
      },
    ],
  },
);
