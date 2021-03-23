import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.token,
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  mutations: {
    setToken(state, token){
      state.token = token
      localStorage.setItem("token", token)
    },
    setUserInfo(state, userInfo){
      state.userInfo = userInfo
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    removeInfo(state){
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token", '')
      localStorage.setItem("userInfo", JSON.stringify({}))
    }
  },
  getters:{
    getUser(state){
      return state.userInfo
    },
    getToken(state){
      return state.token
    }
  }
})

export default store