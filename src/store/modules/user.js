import { getToken, removeToken, setToken } from '@/utils/auth'
// 引入axios
import { getInfo, heard } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken() || '', // 读取本地的Token否则刷新会返回登入页面
    UserInfo: {}
  },
  mutations: {
    // 在Vuex中定义一个token，再将登入成功返回的token存入Vuex里面的token
    setToken(state, token) {
      state.token = token
      // Token持久化
      setToken(token)
    },
    PostInfo(state, UserInfo) {
      state.UserInfo = UserInfo
    },
    removeT(state) {
      removeToken()
      state.token = ''
    },
    DelT(state) {
      state.UserInfo = {}
    }

  },
  actions: {
    async GetUserInfo(context) {
      const res = await getInfo()
      console.log(res)
      const res1 = await heard(res.data.userId)// 第二次发请求，传递的是第一次请求返回数据体里面的id
      console.log(res1)
      context.commit('PostInfo', { ...res.data, ...res1.data })// 把两次请求存储到一起
    },
    /**
     * 实现退出功能
     */
    removeToken(context) {
      context.commit('removeT')
      context.commit('DelT')
    }
  },
  getters: {}
}
