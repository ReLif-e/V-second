import router from '@/router'
import store from '@/store'

// 进度条导入
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getpagetitle from '@/utils/get-page-title'
// to到哪去
// from从哪来
// next放行

// 创建一个白名单
const witchList = ['/login', '/404']
// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.state.user.token

  document.title = getpagetitle(to.meta.title)// 把项目标题该文对应组件的名字
  // console.log(document.title)

  // console.log(to, from)
  if (token) {
    if (to.path === '/login') { // 是不是去登入页面不是就返回登入页面，是就放行
      next('/')
    } else {
      if (!store.getters.userid) { // 如果没有数据里面的id那么就发送请求，避免多次请求用户信息
        store.dispatch('user/GetUserInfo')
      }
      next()
    }
  } else {
    if (witchList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
