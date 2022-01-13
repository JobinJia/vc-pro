import { defineConfig } from 'vite'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../')
      },
      {
        find: '~',
        replacement: resolve(__dirname, './')
      }
    ]
  }
})
