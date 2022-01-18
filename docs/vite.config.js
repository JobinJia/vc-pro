import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: [
      {
        find: '@vc-view/vc-naive',
        replacement: resolve(__dirname, '../vc-naive/')
      }
    ]
  }
})
