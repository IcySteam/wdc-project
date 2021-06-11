<template>
  <v-container>
    <ConsistentMP>
      <h1 class="pb-6">
        Sign In
      </h1>
      <v-form
        ref="form"
        v-model="validated"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="login"
              :rules="loginRules"
              hint="Enter your email or phone number"
              label="Login"
              color="teal accent-3"
              outlined
              required
              clearable
            />
          </v-col>
          <v-col
            cols="12"
            sm="10"
          >
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              hint="Type your password"
              :counter="100"
              color="teal accent-3"
              outlined
              required
              clearable
              @click:append="showPassword = !showPassword"
            />
          </v-col>
          <v-col
            cols="12"
            sm="2"
          >
            <v-btn
              color="white"
              class="m-auto p-auto"
              width="100%"
              height="65%"
              min-height="2em"
              plain
            >
              {{ recoverButtonText }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-checkbox
              v-model="rememberMe"
              label="Remember Me"
              color="teal accent-3"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-dialog
              v-model="submitPopup"
              width="480"
              max-width="80vw"
              max-height="50vh"
            >
              <template
                v-slot:activator="{ on, attrs }"
              >
                <v-col>
                  <v-btn
                    color="brown darken-4"
                    v-bind="attrs"
                    class="m-auto p-auto"
                    width="100%"
                    :disabled="!validated"
                    large
                    v-on="on"
                    @click="traditionalLogin()"
                  >
                    Sign In
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                />
                <v-col>
                  <!--                  <v-btn-->
                  <!--                    v-google-signin-button="clientId"-->
                  <!--                    type="button"-->
                  <!--                    width="100%"-->
                  <!--                    color="black"-->
                  <!--                    class="m-auto p-auto"-->
                  <!--                    large-->
                  <!--                  >-->
                  <!--                    Continue with Google-->
                  <!--                  </v-btn>-->
                  <v-btn
                    type="button"
                    width="100%"
                    color="#222222"
                    class="m-auto p-auto"
                    large
                    href="/Action/GoogleAuth"
                  >
                    Continue with Google
                  </v-btn>
                </v-col>
              </template>
              <v-card class="pb-3">
                <v-card-title class="brown darken-4">
                  {{ submitPopupTitle }}
                </v-card-title>
                <v-card-text class="mt-6">
                  {{ submitPopupText }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="brown darken-4 mt-n2"
                    text
                    @click="OKSubmitPopup()"
                  >
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-btn
              color="white"
              class="m-auto p-auto"
              width="100%"
              plain
              @click="$router.push('SignUp').catch(()=>{})"
            >
              Create an Account
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <ConsistentMP />

    </ConsistentMP>
  </v-container>
</template>

<script>
import ConsistentMP from '../UX/ConsistentMP'
import 'vue-google-signin-button-directive'
export default {
  name: 'LoginComponent',
  components: {
    ConsistentMP
  },
  data() {
    return {
      clientId: '743725093686-u623v64qpe7nu55u7me7fut827pds287.apps.googleusercontent.com',
      validated: false,
      showPassword: false,
      login: '',
      password: '',
      submitPopup: false,
      submitPopupTitle: '',
      submitPopupText: '',
      genericRules: [
        v => !!v || 'Field is required',
        v => (v && v.length <= 100) || 'Max 100 characters'
      ],
      loginRules: [
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(v) | /^[0]\d{9}$/.test(v) || 'Enter a valid email address or phone number'
      ],
      passwordRules: [v => (v.length >= 8 && v.length <= 100) || 'Enter a valid password'],
      window: {
        width: 0,
        height: 0
      },
      rememberMe: false
    }
  },
  computed: {
    recoverButtonText() {
      if (this.window.width < 600) {
        return 'Recover Password'
      } else {
        return 'Recover'
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    OnGoogleAuthSuccess(idToken) {
      this.GoogleLoginWithIdToken(idToken)
    },
    OnGoogleAuthFail(error) {
      console.log(error)
    },
    async GoogleLoginWithIdToken(idToken) {
      // eslint-disable-next-line no-undef
      const res = await GoogleLoginWithIdToken(idToken)
      if (res.code === 0) {
        console.log('Google login success')
      }
    },
    traditionalLogin() {
      const loginPayload = {
        'login': this.login,
        'password': this.password
      }
      this.$store.commit('postLogin', loginPayload)
      // better to use promises than setTimeout I know
      // out of time bruh
      // also see
      // https://stackoverflow.com/questions/47692003/access-vuex-store-getters-in-component-method
      const realThis = this
      setTimeout(function() {
        const response = realThis.$store.getters.getPostLoginResponse
        // console.log(response)
        const loggedInRegExp = new RegExp('^You are already logged in as UID#')
        try {
          switch (response.status) {
            case 200:
              if (loggedInRegExp.test(response.data)) {
                realThis.submitPopupTitle = 'Already logged in'
                realThis.submitPopupText = 'Please log out first to continue as another user.'
              } else {
                realThis.submitPopupTitle = 'Success!'
                realThis.submitPopupText = 'You have successfully logged in.'
              }
              break
            default:
              break
          }
        } catch (error) {
          // console.log(error)
          realThis.submitPopupTitle = 'Error'
          realThis.submitPopupText = 'Failed to log in!'
        }
      }, 100)
    },
    OKSubmitPopup() {
      // better to use promises than setTimeout I know
      // out of time bruh
      // final reminder
      this.$store.dispatch('getSessionStatus')
      const realThis = this
      setTimeout(function() {
        if (realThis.$store.getters.getLoggedIn) {
          realThis.$router.push('/').catch(() => {})
        } else {
          realThis.submitPopup = false
        }
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
