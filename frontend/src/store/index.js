import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loremIpsum: 'Lorem Ipsum',
    usermode: 'User'
  },
  mutations: {
    setLoremIpsum(state, _loremIpsum) {
      state.loremIpsum = _loremIpsum
    },
    setUsermode(state, _usermode) {
      state.usermode = _usermode
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoremIpsum: state => {
      return state.loremIpsum
    },
    getUsermode: state => {
      return state.usermode
    }
  }

})
