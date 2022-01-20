import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['utils/index.ts', 'interface/index.ts'],
  clean: true,
  dts: true,
  outDir: 'dist',
  format: ['cjs', 'esm']
})
