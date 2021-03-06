import { constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    menuList: constantRoutes
  },
  mutations: {
    SetMenuList(state, list) {
      state.menuList = [...constantRoutes, ...list]
    }
  }
}
