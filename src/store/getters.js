const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.UserInfo.username,
  staffPhoto: state => state.user.UserInfo.staffPhoto,
  userid: state => state.user.UserInfo.id

}
export default getters
