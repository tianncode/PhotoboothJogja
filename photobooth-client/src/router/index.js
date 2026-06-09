import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Welcome from '@/pages/Welcome.vue'
import Package from '@/pages/Package.vue'
import Email from '@/pages/Email.vue'
import Frame from '@/pages/Frame.vue'
import Summary from '@/pages/Summary.vue'
import Camera from '@/pages/Camera.vue'
import Preview from '@/pages/Preview.vue'
import Success from '@/pages/Success.vue'
import Result from '@/pages/Result.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/package',
      name: 'package',
      component: Package,
    },
    {
      path: '/email',
      name: 'email',
      component: Email,
    },
    {
      path: '/frame',
      name: 'frame',
      component: Frame,
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
    {
      path: '/camera',
      name: 'camera',
      component: Camera,
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
    },
    {
      path: '/success',
      name: 'success',
      component: Success,
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
    },
  ],
})

export default router
