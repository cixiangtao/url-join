import { defineConfig } from 'vite'

export default defineConfig({
  root: 'site',
  base: '/url-join/',
  build: {
    outDir: '../pages-dist',
    emptyOutDir: true
  }
})
