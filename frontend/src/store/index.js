import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loremIpsum: 'Lorem Ipsum',
    usermode: 'none',
    userID: null,
    loggedIn: false,
    // current user json object
    userObj: null
  },
  mutations: {
    setLoremIpsum(state, _loremIpsum) {
      state.loremIpsum = _loremIpsum
    },
    setUsermode(state, _usermode) {
      state.usermode = _usermode
    },
    updateSessionStatus(state, payload) {
      state.loggedIn = payload.loggedIn
      state.usermode = payload.usermode
      state.userID = payload.userID
    }
  },
  actions: {
    // context same as this.$store? guess so
    async getSessionStatus(context) {
      const response = await axios.get('/Action/GetSessionStatus')
      context.commit('updateSessionStatus', response.data)
    }
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
    getUserID: state => {
      return state.userID
    },
    getLoggedIn: state => {
      return state.loggedIn
    },
    getMenuOptions: state => {
      if (state.usermode === 'none') {
        return [
          {
            'title': 'Sign Up',
            'href': '/Auth/SignUp',
            'icon': 'mdi-account-plus'
          },
          {
            'title': 'Log In',
            'href': '/Auth/Login',
            'icon': 'mdi-login'
          }
        ]
      } else if (state.usermode === 'user') {
        return [
          {
            'title': 'Home',
            'href': '/User/Home',
            'icon': 'mdi-home'
          },
          {
            'title': 'Account',
            'href': '/User/Account',
            'icon': 'mdi-account'
          }
          // {
          //   'title': 'Log Out',
          //   'href': '/Auth/Logout',
          //   'icon': 'mdi-logout'
          // }
        ]
      } else if (state.usermode === 'manager') {
        return [
          {
            'title': 'Home',
            'href': '/Manager/Home',
            'icon': 'mdi-home'
          },
          {
            'title': 'Account',
            'href': '/Manager/Account',
            'icon': 'mdi-account'
          }
          // {
          //   'title': 'Log Out',
          //   'href': '/Auth/Logout',
          //   'icon': 'mdi-logout'
          // }
        ]
      } else if (state.usermode === 'admin') {
        return [
          {
            'title': 'Home',
            'href': '/Admin/Home',
            'icon': 'mdi-home'
          },
          {
            'title': 'Account',
            'href': '/Admin/Account',
            'icon': 'mdi-account'
          },
          {
            'title': 'Administration',
            'href': '/Admin/Administration',
            'icon': 'mdi-account-key'
          }
          // {
          //   'title': 'Log Out',
          //   'href': '/Auth/Logout',
          //   'icon': 'mdi-logout'
          // }
        ]
      } else {
        return null
      }
    },
    getNavigationComponentOptions: state => {
      if (state.usermode === 'none') {
        return [
          {
            'title': 'Sign Up',
            'href': '/Auth/SignUp',
            'description': 'Create an account',
            'imgName': 'form_filling.jpg'
          },
          {
            'title': 'Log In',
            'href': '/Auth/Login',
            'description': 'Log in to your account',
            'imgName': 'door_unlocking.jpg'
          }
        ]
      } else if (state.usermode === 'user') {
        return [
          {
            'title': 'Home',
            'href': '/User/Home',
            'description': 'Go to your home page',
            'imgName': 'home.jpeg'
          },
          {
            'title': 'Account',
            'href': '/User/Account',
            'description': 'Manage your account',
            'imgName': 'account.jpg'
          }
          // {
          //   'title': 'Log Out',
          //   'href': '/Auth/Logout',
          //   'description': 'Log out of your account',
          //   'imgName': 'sunset_briefcase.jpg'
          // }
        ]
      } else if (state.usermode === 'manager') {
        return [
          {
            'title': 'Home',
            'href': '/Manager/Home',
            'description': 'Go to your home page',
            'imgName': 'home.jpeg'
          },
          {
            'title': 'Account',
            'href': '/Manager/Account',
            'description': 'Manage your account & venue',
            'imgName': 'account.jpg'
          }
          // {
          //   'title': 'Log Out',
          //   'href': '/Auth/Logout',
          //   'description': 'Log out of your account',
          //   'imgName': 'sunset_briefcase.jpg'
          // }
        ]
      } else if (state.usermode === 'admin') {
        return [
          {
            'title': 'Home',
            'href': '/Admin/Home',
            'description': 'Go to your home page',
            'imgName': 'home.jpeg'
          },
          {
            'title': 'Account',
            'href': '/Admin/Account',
            'description': 'Manage your account & generate registration codes',
            'imgName': 'account.jpg'
          },
          {
            'title': 'Administration',
            'href': '/Admin/Administration',
            'description': 'Perform administrative actions',
            'imgName': 'administration.jpg'
          }
          // {
          //   'title': 'Log Out',
          //   'href': '/Auth/Logout',
          //   'description': 'Log out of your account',
          //   'imgName': 'sunset_briefcase.jpg'
          // }
        ]
      } else {
        return null
      }
    }
  }
})
