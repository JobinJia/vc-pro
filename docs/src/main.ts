import { createApp } from 'vue'
import App from './App.vue'
import router from '@/docs/src/router'
import { createHead } from '@vueuse/head'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'

import vcNaive from '@/vc-naive/components'
// import vcNaive from '@vc-view/vc-naive'

const head = createHead()

console.log(vcNaive)

const app = createApp(App)

app.use(head)
app.use(router)
app.use(vcNaive)

app.mount('#app')
