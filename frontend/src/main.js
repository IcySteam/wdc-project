import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import GSignInButton from 'vue-google-signin-button'
import qrcode from 'vue-qrcode-directive'

Vue.use(qrcode)

Vue.use(GSignInButton)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
