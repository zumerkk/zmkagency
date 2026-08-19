import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `.worktrees` holds throwaway experiment checkouts of this same repo —
  // linting them reported ~1500 duplicate errors that drowned out real ones.
  globalIgnores(['dist', '.worktrees', '**/node_modules', 'server/dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // There is no eslint-plugin-react here, so ESLint cannot tell that a
      // capitalised identifier used as a JSX tag is used. Both patterns are
      // needed: components arrive as variables *and* as destructured props.
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]|motion',
        argsIgnorePattern: '^[A-Z_]|^_',
      }],
    },
  },
  // The Express API and the build scripts run on Node, not in a browser.
  // Without this they report `process` and `Buffer` as undefined globals.
  {
    files: ['server/**/*.js', 'scripts/**/*.{js,mjs}', '*.config.js', '*.mjs'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
    },
  },
])
