import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLine } from '@fortawesome/free-brands-svg-icons'
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import 'bootstrap'

library.add(faLine)

import router from './router'
import App from './App.vue'

Vue.use(VueAxios, axios)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', VueLoading)
Vue.config.productionTip = false
Vue.prototype.$liff = window.liff

router.beforeEach((to, from, next) => {
  next()
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});