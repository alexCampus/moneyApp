// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './components/firebase';

import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment
Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
