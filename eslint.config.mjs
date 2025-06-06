/* eslint.config.js ------------------------------------------------------ */
import js from '@eslint/js';
import globals from 'globals';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import jest from 'eslint-plugin-jest';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'docs/styles/**',
      'docs/scripts/**',
      'dist/**',
      'coverage/**',
      'source/out/**',
      'eslint.config.*',
    ],
  },

  /* ---------- JS ---------- */
  {
    files: ['**/*.{js,cjs,mjs}'],
    plugins: {
      js,
      extends: ['js/recommended'],
      import: importPlugin,
    },
    extends: [
      'js/recommended',
    ],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
    },
    
    rules: {
      /* ---- Group 28 code style rules ---- */
      indent: ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', { code: 80, ignoreUrls: true }],
      'brace-style': ['error', 'allman', { allowSingleLine: false }],
      'arrow-parens': ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
      '@stylistic/semi': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'object-curly-spacing': ['error', 'always'],
      'quote-props': ['error', 'as-needed'],

      /* ---- naming conventions ---- */
      camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      // Caps for things that *look* like constants
      'id-match': [
        'error',
        '^(?:[A-Z0-9_]+|[a-z][a-zA-Z0-9]*)$',
        { properties: false, onlyDeclarations: true, 
          ignoreDestructuring: false },
      ],

      /* ---- import hygiene ---- */
      'import/no-unresolved': 'error',
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },

  /* ---------- Markdown ---------- */
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },

  /* ---------- CSS ---------- */
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },

  /* ---------- Jest specs ---------- */
  {
    files: ['**/*.test.js', '**/__tests__/**/*.js'],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
        page: 'readonly',
      },
    },
  },
]);
