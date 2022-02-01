import Vue from 'vue'
import axios from 'axios'

import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuex from 'vuex'
import { store } from './service/store'

Vue.use(VueMaterial)
Vue.use(Vuex)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
