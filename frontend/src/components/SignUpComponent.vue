<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="First_name"
            :rules="rules"
            counter="25"
            hint="Example: John"
            label="First name"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="Last_name"
            :rules="rules"
            counter
            maxlength="25"
            hint="Example: Parker"
            label="Last name"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="contact"
            :rules="wordsRules"
            counter="10"
            hint="Example: 0412345678"
            label="Contact number"
            :counter-value="v => v.trim().split(' ').length"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="email"
            :rules="wordsRules"
            counter="20"
            hint="Example: user@example.com"
            label="Email"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            num="12345678"
            name="input-10-1"
            label="Password"
            hint="Type between 8 - 20 characters"
            counter="20"
            @click:append="show1 = !show1"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="confirm_password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[(password === confirm_password) || 'Passwords must match']"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm password"
            hint="Type between 8 - 20 characters"
            counter="20"
            @click:append="show1 = !show1"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="Gender"
            :items="Genders"
            label="Gender"
            data-vv-name="Gender"
          />
        </v-col>

        <v-col
          cols="24"
          sm="12"
        >
          <v-text-field
            label="Address #1"
            :rules="addressRules"
            hide-details="auto"
            counter
          />
          <v-text-field
            label="Address #2 (optional)"
            hide-details="auto"
          >
            counter
          </v-text-field>
        </v-col>

        <v-col
          cols="6"
          sm="3"
        >
          <v-text-field
            v-model="Suburb"
            label="Suburb"
            data-vv-name="Suburb"
            :rules="wordsRules"
          />
        </v-col>

        <v-col
          cols="4"
          sm="2"
        >
          <v-text-field
            v-model="Postcode"
            label="Postcode"
            data-vv-name="Postcode"
            :rules="wordsRules"
          />
        </v-col>

        <v-col
          cols="4"
          sm="2"
        >
          <v-text-field
            v-model="Year"
            label="Year"
            data-vv-name="Year"
            :rules="wordsRules"
          />
        </v-col>

        <v-col
          cols="4"
          sm="2"
        >
          <v-text-field
            v-model="Month"
            label="Month"
            data-vv-name="Month"
            :rules="wordsRules"
          />
        </v-col>

        <v-col
          cols="4"
          sm="2"
        >
          <v-text-field
            v-model="Day"
            label="Day"
            data-vv-name="Day"
            :rules="wordsRules"
          />
        </v-col>

        <div
          class="text-center"
        >
          <v-dialog
            v-model="check"
            width="500"
          >
            <template
              v-slot:activator="{ on, attrs}"
            >
              <v-btn
                dark
                color="grey"
                v-bind="attrs"
                v-on="on"
              >
                Submit
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="green">
                Congratulations!
              </v-card-title>
              <v-card-text>
                All done!
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="red"
                  text
                  @click="check = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'SignUpComponent',
  data() {
    return {
      show1: false,
      First_name: '',
      Last_name: '',
      contact: '',
      email: '',
      password: '',
      confirm_password: '',
      Gender: '',
      Genders: [
        'Male',
        'Female',
        'Secret'
      ],
      check: false,
      Suburb: '',
      Postcode: '',
      Year: '',
      Month: '',
      Day: '',

      rules: [v => v.length <= 25 || 'Max 25 characters'],
      contactRules: [v => v.length <= 15 || 'No more than 15 characters'],
      wordsRules: [v => v.length <= 20 || 'No more than 20 characters'],
      passwordRules: [v => v.length >= 8 || 'Must type more than 8 characters'],
      addressRules: [v => (v && v.length >= 1) || 'Address must not be empty']
    }
  }
}
</script>
