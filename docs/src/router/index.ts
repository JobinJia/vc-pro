import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/docs/src/router/routes'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savePosition) {
    return {
      top: 0
    }
  },
  routes
})

router.afterEach((to) => {})

export default router
