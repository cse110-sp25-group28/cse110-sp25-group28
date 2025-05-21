import js from "@eslint/js";
import globals from "globals";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import jest from 'eslint-plugin-jest';
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: ['docs/styles/**', 'docs/scripts/**', 'dist/**', 'coverage/**', 'source/out/**'],
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  { files: ['**/*.test.js', '**/__tests__/**/*.js'], plugins: { jest }, languageOptions: { globals: jest.environments.globals.globals } },
]);