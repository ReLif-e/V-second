import { setToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    // 在Vuex中定义一个token，再将登入成功返回的token存入Vuex里面的token
    setToken(state, token) {
      state.token = token

      // Token持久化
      setToken(token)
    },
    getToken(state) {
      state.token = ''
    }
  },
  actions: {}
}
