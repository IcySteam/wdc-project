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
              color="brown"
              class="m-auto p-auto"
              width="100%"
              height="65%"
              min-height="2em"
              plain
            >
              {{ recoverButtonText() }}
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
                <v-btn
                  color="brown"
                  v-bind="attrs"
                  class="m-auto p-auto"
                  width="100%"
                  :disabled="!validated"
                  large
                  v-on="on"
                >
                  Sign In
                </v-btn>
              </template>

              <v-card class="pb-3">
                <v-card-title class="brown">
                  Congratulations!
                </v-card-title>
                <v-card-text class="mt-6">
                  All done!
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="brown mt-n2"
                    text
                    @click="submitPopup = false"
                  >
                    Close
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
              color="brown"
              class="m-auto p-auto"
              width="100%"
              plain
              href="/SignUp"
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
import ConsistentMP from './UX/ConsistentMP'
export default {
  name: 'LoginComponent',
  components: {
    ConsistentMP
  },
  data() {
    return {
      validated: false,
      showPassword: false,
      login: '',
      password: '',
      submitPopup: false,
      genericRules: [
        v => !!v || 'Field is required',
        v => (v && v.length <= 100) || 'Max 100 characters'
      ],
      loginRules: [
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(v) | /^[0]\d{9}$/.test(v) || 'Enter a valid email address or phone number'
      ],
      passwordRules: [v => (v.length >= 8 && v.length <= 100) || 'Type between 8 to 100 characters'],
      window: {
        width: 0,
        height: 0
      },
      rememberMe: false
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
    recoverButtonText() {
      if (this.window.width < 600) {
        return 'Recover Password'
      } else {
        return 'Recover'
      }
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style scoped>
</style>
