<template>
  <v-container>
    <ConsistentMP>
      <h1 class="pb-6">
        Sign Up
      </h1>
      <v-form
        ref="form"
        v-model="validated"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="first_name"
              :rules="genericRules"
              :counter="100"
              hint="Example: John"
              label="First name"
              color="teal accent-3"
              outlined
              required
              clearable
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="last_name"
              :rules="genericRules"
              :counter="100"
              hint="Example: Parker"
              label="Last name"
              color="teal accent-3"
              outlined
              required
              clearable
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="phoneNumber"
              :rules="phoneNumberRules"
              :counter="10"
              hint="Example: 0412345678"
              label="Phone number"
              color="teal accent-3"
              outlined
              required
              type="number"
              clearable
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="100"
              hint="Example: user@example.com"
              label="Email"
              color="teal accent-3"
              outlined
              required
              clearable
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
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
            sm="6"
          >
            <v-text-field
              v-model="confirmPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[(password === confirmPassword) || 'Passwords must match']"
              :type="showPassword ? 'text' : 'password'"
              label="Confirm password"
              hint="Type your password again"
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
            sm="6"
          >
            <v-select
              v-model="gender"
              :items="genders"
              label="Gender"
              data-vv-name="Gender"
              item-color="teal accent-3"
              color="teal accent-3"
              outlined
              required
              :rules="genericRules"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-menu
              ref="picker"
              v-model="datePickerMenu"
              :close-on-content-click="false"
              :return-value.sync="dob"
              transition="scale-transition"
              offset-y
              min-width="auto"
              :rules="genericRules"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dob"
                  label="Date of birth"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  outlined
                  color="teal accent-3"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="dob"
                color="teal accent-3"
                no-title
                scrollable
                :day-format="date => new Date(date).getDate()"
                :max="new Date().toISOString().substr(0, 10)"
              >
                <v-spacer />
                <v-btn
                  text
                  class="brown darken-4"
                  @click="datePickerMenu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  class="brown darken-4"
                  @click="$refs.picker.save(dob)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="Address #1"
              :rules="genericRules"
              hide-details="auto"
              color="teal accent-3"
              :counter="100"
              outlined
              required
              clearable
            />
            <v-text-field
              label="Address #2 (optional)"
              hide-details="auto"
              color="teal accent-3"
              outlined
              counter
              clearable
            >
              counter
            </v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="suburb"
              label="Suburb"
              data-vv-name="Suburb"
              :rules="genericRules"
              color="teal accent-3"
              :counter="100"
              outlined
              required
              clearable
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="postcode"
              label="Postcode"
              data-vv-name="Postcode"
              :rules="postcodeRules"
              color="teal accent-3"
              :counter="4"
              outlined
              required
              type="number"
              clearable
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
                  color="brown darken-4"
                  v-bind="attrs"
                  class="m-auto p-auto"
                  width="100%"
                  :disabled="!validated"
                  large
                  v-on="on"
                >
                  Submit
                </v-btn>
              </template>

              <v-card class="pb-3">
                <v-card-title class="brown darken-4">
                  Congratulations!
                </v-card-title>
                <v-card-text class="mt-6">
                  All done!
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="brown darken-4 mt-n2"
                    text
                    @click="submitPopup = false"
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
              @click="$router.push('Login').catch(()=>{})"
            >
              Sign In Instead
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
export default {
  name: 'SignUpComponent',
  components: {
    ConsistentMP
  },
  data() {
    return {
      validated: false,
      showPassword: false,
      first_name: '',
      last_name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      genders: [
        'Male',
        'Female',
        'Other'
      ],
      submitPopup: false,
      suburb: '',
      postcode: '',
      dob: new Date().toISOString().substr(0, 10),
      datePickerMenu: false,
      genericRules: [
        v => !!v || 'Field is required',
        v => (v && v.length <= 100) || 'Max 100 characters'
      ],
      phoneNumberRules: [v => /^[0]\d{9}$/.test(v) || 'Enter a valid 10-digit Australian phone number'],
      emailRules: [v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(v) || 'Enter a valid email address'],
      passwordRules: [v => (v.length >= 8 && v.length <= 100) || 'Type between 8 to 100 characters'],
      postcodeRules: [v => /\d{4}/.test(v) || 'Enter a valid 4-digit Australian postcode']
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
</style>
