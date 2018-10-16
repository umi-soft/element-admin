import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import './icons'
import './errorLog'
import './permission'
import './mock'

import components from './views/common'
import * as filters from './filters'

Vue.use(Element, {
  size: 'small'
})

// 全局注册组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

// 全局注册指令
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
