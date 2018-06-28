import 'babel-polyfill'
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/frame_src/styles/index.scss' // global css
// import 'font-awesome/css/font-awesome.css'
import App from './frame_src/App'
import router from './frame_src/router'
import store from './frame_src/store'

import i18n from './frame_src/lang' // Internationalization
import './frame_src/icons' // icon
import './frame_src/errorLog'// error log
import './frame_src/permission' // permission control
import './frame_src/mock' // simulation data

import * as filters from './frame_src/filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
