import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['coverage/**', 'dist/**', 'pages-dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['src/**/*.ts', 'site/src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      'prefer-const': 'error'
    }
  },
  {
    files: ['site/src/**/*.ts'],
    languageOptions: {
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      }
    },
    rules: {
      'no-undef': 'off'
    }
  }
])
