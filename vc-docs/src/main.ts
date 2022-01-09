import { createApp } from 'vue'
import App from './App.vue'

// import vcNaive from '@/vc-naive/components'
import vcNaive from '@vc-view/vc-naive'

const app = createApp(App)

app.use(vcNaive)

app.mount('#app')
