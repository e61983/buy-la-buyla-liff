import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from "vue-loading-overlay";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLine } from '@fortawesome/free-brands-svg-icons'
import "vue-loading-overlay/dist/vue-loading.css";
import 'bootstrap'

import router from './router'
import store from './store'
import App from './App.vue'

library.add(faLine)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', VueLoading)
Vue.config.productionTip = false
Vue.prototype.$liff = window.liff

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

router.beforeEach((to, from, next) => {
  console.log(from, to)
  console.log('store ' + store.state.is_loggedin)
  if (to.name === 'Menu') {
    if (!store.state.is_loggedin) {
      next('/')
    }
    console.log(store.state)
    const base_url = process.env.VUE_APP_API_SERVER_BASE;
    const url = base_url + "/" + store.state.gid + "/check/" + store.state.uid
    console.log(url)
    axios.get(url).then(resp => {
      console.log("check " + resp.data)
    })
  }
  next()
});