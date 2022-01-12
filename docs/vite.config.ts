import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// import md from 'vite-plugin-md'
// import prism from 'markdown-it-prism'
// import Components from 'unplugin-vue-components/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// import md from './plugin/md'
// import docs from './plugin/docs'

// https://vitejs.dev/config/
// export default defineConfig()

export default {
  plugins: [
    vueJsx(),
    // docs(),
    // md(),
    vue({
      include: [/\.vue$/, /\.md$/]
    })
    // md({
    //   headEnabled: true,
    //   markdownItUses: [prism]
    // })
    // Components({
    //   resolvers: [NaiveUiResolver()],
    //   dts: true
    // })
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
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js'
      }
    ]
  },
  server: {
    port: 8090,
    host: true,
    open: true
  }
}
