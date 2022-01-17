import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import * as fs from 'fs'

const inputDir = resolve(__dirname, './')

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
  const componentDir = resolve(inputDir, name)
  const isDir = fs.lstatSync(componentDir).isDirectory()
  return isDir && fs.readdirSync(componentDir).includes('index.ts')
})

const inputs = inputsArray.reduce((backObj, pkgName) => {
  backObj[pkgName] = resolve(__dirname, `./${pkgName}/index.ts`)
  return backObj
}, {})

export default (): UserConfigExport => {
  return {
    publicDir: false,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, '../')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      },
      postcss: {}
    },
    plugins: [vue(), vueJsx()],
    build: {
      cssCodeSplit: true,
      emptyOutDir: false,
      outDir: 'dist',
      // emptyOutDir: true,
      lib: {
        entry: './index.ts',
        // entry: '',
        name: 'vc-naive.esm',
        formats: ['es']
      },
      rollupOptions: {
        input: inputs,
        output: {
          globals: {
            vue: 'Vue'
          },
          entryFileNames: '[name]/index.esm.js',
          assetFileNames: '[name]/index.css'
          // file: (name) =>
          // format: 'es',
        },
        external: ['vue', 'naive-ui', 'lodash-es']
      }
    }
  }
}
