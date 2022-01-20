import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve('index.ts'),
      name: 'vc-hooks'
    },
    rollupOptions: {
      external: ['vue', 'lodash-es'],
      output: {
        globals: {
          vue: 'Vue',
          'lodash-es': '_'
        }
      }
    }
  }
})
