import { getToken, setToken } from '@/utils/auth'
// 引入axios
import { getInfo } from '@/api/user'
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
    }

  },
  actions: {
    async GetUserInfo(context) {
      const res = await getInfo()
      console.log(res)
      context.commit('PostInfo', res.data)
    }
  }
}
