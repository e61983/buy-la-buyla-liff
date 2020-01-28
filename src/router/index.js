import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/components/MainMenu')
    },
    {
      path: '/404',
      name: 'Page_404',
      component: () => import('@/components/Page_404.vue')
    },
    {
      path: '*',
      name: 'Unknow',
      redirect: { name: 'Login' }
    },
  ]
})
