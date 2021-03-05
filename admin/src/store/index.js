import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  mutations: {
    setToken(state, token){
      state.token = token
      localStorage.setItem("token", token)
    },
    setUserInfo(state, userInfo){
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    removeInfo(state){
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", JSON.stringify({}))
    }
  },
  getters:{
    getUser(state){
      return state.userInfo
    }
  }
})

export default store