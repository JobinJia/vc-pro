import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default (): UserConfigExport => {
  return {
    publicDir: false,
    // root: resolve(__dirname, './'),
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, '../')
        }
      ]
    },
    plugins: [
      vue(),
      vueJsx(),
      dts({
        // outputDir: resolve(__dirname, 'types'),
        // root: resolve(__dirname, '../'),
        outputDir: 'dist/types',
        exclude: ['node_modules/**', 'naive-ui/**', '**/demo/**'],
        logDiagnostics: true,
        skipDiagnostics: false,
        insertTypesEntry: true,
        beforeWriteFile(filePath, content) {
          // filePath = filePath.replace(/[\\/]packages[\\/]/g, '/')
          // content = content.replace(/.[\\/]packages[\\/]/g, './')
          return { filePath, content }
        }
      })
    ],
    build: {
      cssCodeSplit: false,
      outDir: 'dist',
      // emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        // entry: 'index.ts',
        name: 'vc-naive',
        formats: ['es'],
        fileName: (name) => `vc-naive.js`
      },
      rollupOptions: {
        output: {
          globals: {
            vue: 'Vue'
          }
        },
        external: ['vue', 'naive-ui', 'lodash-es']
      }
    }
  }
}
