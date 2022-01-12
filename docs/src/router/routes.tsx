import { RouteRecordRaw } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import { defineComponent } from 'vue'

function getParentLayout(name: string) {
  return defineComponent({
    name,
    setup() {
      return () => <router-view />
    }
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/about',
    component: BasicLayout,
    children: [
      {
        path: 'about',
        name: 'About',
        meta: {
          title: '关于'
        },
        component: () => import('../views/about/index.vue')
      },
      {
        path: 'vc-naive',
        name: 'VcNaive',
        meta: {
          title: 'vc-naive'
        },
        component: getParentLayout('VcNaive'),
        children: [
          {
            path: 'naiveForm',
            name: 'NaiveForm',
            meta: {
              title: 'VcNaiveForm'
            },
            // component: () => import('../views/use-naive-form/index.vue')
            component: () => import('../views/md/vc-naive-form.md')
          },
          {
            path: 'naiveFormRef',
            name: 'NaiveFormRef',
            meta: {
              title: 'VcNaiveFormRef'
            },
            component: () => import('../views/use-naive-form/useNaiveFormRef.vue')
          }
        ]
      }
    ]
  }
]

export default routes
