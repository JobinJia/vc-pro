import { createApp } from 'vue'
import App from './App.vue'
import router from '@/docs/src/router'

import vcNaive from '@/vc-naive/components'
// import vcNaive from '@vc-view/vc-naive'

console.log(vcNaive)

const app = createApp(App)

app.use(router)
app.use(vcNaive)

app.mount('#app')
