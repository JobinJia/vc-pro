import {UserConfigExport} from "vite";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default (): UserConfigExport => {
  console.log(resolve(__dirname, '../'))
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
        outputDir: 'dist/types',
        exclude: ['node_modules'],
        logDiagnostics: true,
        skipDiagnostics: false,
        // tsConfigFilePath: resolve(__dirname, '../../tsconfig.json'),
        // insertTypesEntry: true,
        beforeWriteFile(filePath, content) {
          filePath = filePath.replace(/[\\/]packages[\\/]/g, '/')
          content = content.replace(/.[\\/]packages[\\/]/g, './')
          return { filePath, content }
        }
      })
    ],
    build: {
      cssCodeSplit: false,
      outDir: 'dist',
      // emptyOutDir: true,
      lib: {
        entry: resolve(__dirname, 'components/index.ts'),
        // entry: 'components/index.ts',
        name: 'vc-components',
        formats: ['es'],
        fileName: name => `vc-naive.js`
      },
      rollupOptions: {
        output: {
          globals: {
            vue: 'Vue'
          }
        },
        external: ['vue','naive-ui'],
      }
    }
  }
}
