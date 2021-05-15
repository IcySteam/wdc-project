import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loremIpsum: 'Lorem Ipsum'
  },
  mutations: {
    setLoremIpsum(state, _loremIpsum) {
      state.loremIpsum = _loremIpsum
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoremIpsum: state => {
      return state.loremIpsum
    }
  }

})
