import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import * as fs from 'fs'

const inputDir = resolve(__dirname, './components')

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
  const componentDir = resolve(inputDir, name)
  const isDir = fs.lstatSync(componentDir).isDirectory()
  return isDir && fs.readdirSync(componentDir).includes('index.ts')
})

const inputs = inputsArray.reduce((backObj, pkgName) => {
  backObj[pkgName] = resolve(__dirname, `./components/${pkgName}/index.ts`)
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
      outDir: 'dist/es',
      // emptyOutDir: true,
      lib: {
        entry: 'components/index.ts',
        // entry: '',
        name: 'vc-ant.esm',
        formats: ['es']
      },
      rollupOptions: {
        input: inputs,
        output: {
          globals: {
            vue: 'Vue'
          },
          entryFileNames: 'components/[name]/index.esm.js',
          assetFileNames: 'components/[name]/index.css'
          // file: (name) =>
          // format: 'es',
        },
        external: ['vue', 'ant-design-vue', 'lodash-es']
      }
    }
  }
}
