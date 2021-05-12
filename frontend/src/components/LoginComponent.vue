<template>
  <v-app id="Login">
    <v-content>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex sm10 xs20 md8>
            <v-card
              style="height: 100%"
            >
              <v-toolbar color="#4D4540" dark>
                <v-toolbar-title>
                  Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-col
                    cols="24"
                    sm="12"
                  >
                    <v-text-field
                      v-model="Username"
                      label="Username"
                      data-vv-name="Username"
                      :rules="wordsRules"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                      v-model="Password"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="Type between 8 - 20 characters"
                      counter="20"
                      @click:append="show2 = !show2"
                    />
                  </v-col>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="blue"
                  text
                  @click="check = false"
                >
                  Log in
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="check = false"
                >
                  sign up
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    source: String,
    // eslint-disable-next-line vue/require-prop-type-constructor,vue/require-default-prop
    show2: false,

    // eslint-disable-next-line vue/require-default-prop
    passwordRules: [v => v.length >= 8 || 'Must type more than 8 characters'],
    // eslint-disable-next-line vue/require-default-prop
    wordsRules: [v => v.length <= 20 || 'No more than 20 characters']
  },
  data: () => ({
    Username: '',
    Password: ''
  })
}
</script>
