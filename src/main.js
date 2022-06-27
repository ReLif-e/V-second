import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n  英文
import locale from 'element-ui/lib/locale/lang/ja' // lang i18n  日文

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.directive('allow', {
  inserted(el, binding) {
    // poins = 获取用户信息里面的权限信息
    const poins = store.state.user.UserInfo.roles.points
    // console.log(el)
    // console.log(binding)
    // console.log(poins)

    // 用户权限信息里面有没有自定义指令里面的值
    if (!poins.includes(binding.value)) {
      console.log('芜湖')
      el.remove() // 删除上一个人的权限信息
      // return true
    }
  }
})
// 注册全局的组件
import MYUI from '@/components'
Vue.use(MYUI)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
