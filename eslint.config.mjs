import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
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
  }
])
