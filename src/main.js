import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from "vue-loading-overlay";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLine } from '@fortawesome/free-brands-svg-icons'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
import "vue-loading-overlay/dist/vue-loading.css";
import animated from 'animate.css' 
import 'bootstrap'

import router from './router'
import store from './store'
import App from './App.vue'

// initial all Vee Validation rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('zh_TW', zh_TW);

library.add(faLine)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(animated)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', VueLoading)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
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
  next()
});