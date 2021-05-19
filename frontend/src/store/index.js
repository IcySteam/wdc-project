import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loremIpsum: 'Lorem Ipsum',
    usermode: 'None'
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
    },
    getMenuOptions: state => {
      if (state.usermode === 'None') {
        return []
      } else if (state.usermode === 'User') {
        return [
          {
            'title': 'Home',
            'href': '/User/Home',
            'icon': 'mdi-home',
            'description': 'Go to your home page',
            'imgName': 'home.jpeg'
          },
          {
            'title': 'Account',
            'href': '/User/Account',
            'icon': 'mdi-account',
            'description': 'Manage your account',
            'imgName': 'account.jpg'
          }
        ]
      } else if (state.usermode === 'Manager') {
        return [
          {
            'title': 'Home',
            'href': '/Manager/Home',
            'icon': 'mdi-home',
            'description': 'Go to your home page',
            'imgName': 'home.jpeg'
          },
          {
            'title': 'Account',
            'href': '/Manager/Account',
            'icon': 'mdi-account',
            'description': 'Manage your account & venue',
            'imgName': 'account.jpg'
          }
        ]
      } else if (state.usermode === 'Admin') {
        return [
          {
            'title': 'Home',
            'href': '/Admin/Home',
            'icon': 'mdi-home',
            'description': 'Go to your home page',
            'imgName': 'home.jpeg'
          },
          {
            'title': 'Account',
            'href': '/Admin/Account',
            'icon': 'mdi-account',
            'description': 'Manage your account & generate registration codes',
            'imgName': 'account.jpg'
          },
          {
            'title': 'Administration',
            'href': '/Admin/Administration',
            'icon': 'mdi-account-key',
            'description': 'Perform administrative actions',
            'imgName': 'administration.jpg'
          }
        ]
      } else {
        return null
      }
    }
  }
})
