import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Menu' }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/components/MainMenu'),
      beforeEnter: (to, from, next) => {
        console.log(store.state.is_loggedin)
        if (store.state.is_loggedin) {
          next()
        } else {
          next({ name: 'Page_404' })
        }
      }
    },
    {
      path: '/404',
      name: 'Page_404',
      component: () => import('@/components/Page_404.vue')
    },
    {
      path: '*',
      name: 'Unknow',
      redirect: { name: 'Page_404' }
    },
  ]
})
