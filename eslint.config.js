import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier, // Désactive les règles ESLint qui clashent avec Prettier
    ],
    plugins: {
      prettier: eslintPluginPrettier, // active le plugin Prettier
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off',
      // 'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'off', // ignore toutes les variables non utilisées
      'react-hooks/exhaustive-deps': 'off', // ignore les warnings sur les useEffect
      // Ajoute Prettier comme règle ESLint
      'prettier/prettier': 'error',
    },
  },
])
