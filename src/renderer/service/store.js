import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: '',
    token: ''
  },
  mutations: {
    changeId (state, newId) {
      state.id = newId
    },
    changeToken (state, newToken) {
      state.token = newToken
    }

  },
  getters: {
    getId (state) {
      return state.id
    },
    getToken (state) {
      return state.token
    }
  }
})