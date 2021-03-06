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
import axios from 'axios'
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
      submitPopupTitle: 'Logging in',
      submitPopupText: 'Please wait...',
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
      this.submitPopupTitle = 'Logging in'
      this.submitPopupText = 'Please wait...'
      axios({
        url: '/Action/Login',
        method: 'post',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
        data: loginPayload
      })
        .then((res) => {
          // got an ok response
          // console.log(res)
          const loggedInRegExp = new RegExp('^You are already logged in as UID#')
          if (loggedInRegExp.test(res.data)) {
            this.submitPopupTitle = 'Already logged in'
            this.submitPopupText = 'Please log out first to continue as another user.'
          } else {
            this.submitPopupTitle = 'Success!'
            this.submitPopupText = 'You have successfully logged in.'
          }
        })
        .catch((err) => {
          // encountered error making request/error response
          // console.log(err)
          // console.log(err.response)
          this.submitPopupTitle = 'Error'
          this.submitPopupText = 'Failed to log in!'
          if (err.response) {
            switch (err.response.status) {
              case 401:
                this.submitPopupTitle = 'Unauthorized'
                this.submitPopupText = 'Incorrect login and/or password.'
                break
              case 500:
                this.submitPopupTitle = 'Error'
                this.submitPopupText = 'The server is not feeling so well... Is MySQL up and running?'
                break
              case 400:
                this.submitPopupTitle = 'Error'
                this.submitPopupText = 'Please enter a valid login and password.'
                break
            }
          }
        })
    },
    getSessionStatus() {
      return axios({
        url: '/Action/GetSessionStatus',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // return response data
        .then(res => res.data)
      // just error error object when encountering error making request/error response
        .catch(err => console.error(err))
    },
    OKSubmitPopup() {
      this.getSessionStatus()
        .then(res => {
          // console.log(res)
          if (res.loggedIn) {
            if (res.usermode === 'user') {
              this.$router.push('/User/Home').catch(() => {})
            } else if (res.usermode === 'manager') {
              this.$router.push('/Manager/Home').catch(() => {})
            } else if (res.usermode === 'admin') {
              this.$router.push('/Admin/Home').catch(() => {})
            }
          } else {
            this.submitPopup = false
          }
        })
        .catch(err => {
          console.error(err)
          this.submitPopup = false
        })
    }
  }
}
</script>

<style scoped>

</style>
