// yarn dev 用到的vite配置

/**
 * @type {import('vite').UserConfig}
 */
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../')
      }
    ]
  }
})
