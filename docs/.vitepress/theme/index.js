// @ts-ignore
import defaultTheme from 'vitepress/theme'
import naiveUI from 'naive-ui'
import vcNaive from '@/vc-naive/components'

console.log(vcNaive)
export default {
  ...defaultTheme,
  enhanceApp({ app }) {
    app.use(naiveUI)
    app.use(vcNaive)
  }
}