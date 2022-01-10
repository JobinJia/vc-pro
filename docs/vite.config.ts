import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: [
      {
        find: '#',
        replacement: resolve(__dirname, './src')
      },
      {
        find: '@',
        replacement: resolve(__dirname, '../')
      }
    ]
  },
  server: {
    port: 8090,
    host: true,
    open: true
  }
})
