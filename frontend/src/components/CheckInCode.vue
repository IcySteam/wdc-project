<template>
  <ConsistentMP>
    <v-row>
      <v-col cols="3" xs="3" md="3" lg="12" xl="12" />
    </v-row>
    <v-row class="align-self-center text-center">
      <v-col cols="12" sm="12" md="12" xl="2" lg="2"><v-spacer /></v-col>
      <v-col cols="12" sm="12" md="12" xl="7" lg="7">
        <v-text-field
          v-model="checkInCode"
          label="Check-in code"
          hint="Enter the check-in code provided by venue"
          outlined
          clearable
          :rules="checkInCodeRules"
          class="align-self-center text-center"
          color="teal accent-3"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        xl="3"
        lg="3"
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
              class="m-auto p-auto v-size--x-large"
              width="100%"
              :disabled="checkInCode.length < 1"
              v-on="on"
              @click="checkInAxios()"
            >
              Submit
            </v-btn>
            <v-col
              cols="12"
              sm="12"
            />
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
                @click="OKPopup()"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </ConsistentMP>

</template>

<script>
import ConsistentMP from './UX/ConsistentMP'
import axios from 'axios'
export default {
  name: 'CheckInCode',
  components: { ConsistentMP },
  data() {
    return {
      checkInCode: '',
      checkInCodeRules: [
        v => !!v || 'Check-in code is required'
      ],
      submitPopup: false,
      submitPopupTitle: 'Checking in',
      submitPopupText: 'Please wait...',
      justDenied: false
    }
  },
  computed: {
  },
  methods: {
    checkInAxios() {
      this.submitPopupTitle = 'Checking in'
      this.submitPopupText = 'Please wait...'
      axios({
        url: '/Action/CheckIn',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          'checkInCode': this.checkInCode
        }
      })
        .then((res) => {
          // got an ok response
          // console.log(res)
          this.submitPopupTitle = 'Success!'
          this.submitPopupText = 'You have successfully checked in.'
          this.justDenied = false
        })
        .catch((err) => {
          // encountered error making request/error response
          // console.log(err)
          // console.log(err.response)
          this.submitPopupTitle = 'Error'
          this.submitPopupText = 'Failed to check in!'
          this.justDenied = false
          if (err.response) {
            switch (err.response.status) {
              case 401:
                this.submitPopupTitle = 'Unauthorized'
                this.submitPopupText = 'Please log in first to continue.'
                this.justDenied = true
                break
              case 500:
                this.submitPopupTitle = 'Error'
                this.submitPopupText = 'The server is not feeling so well... Is MySQL up and running?'
                break
              case 400:
                this.submitPopupTitle = 'Error'
                this.submitPopupText = 'Please enter a valid check-in code.'
                break
              case 520:
                this.submitPopupTitle = 'Error'
                this.submitPopupText = 'Please enter a valid check-in code.'
                break
            }
          }
        })
    },
    OKPopup() {
      this.submitPopup = false
      if (this.justDenied) {
        this.$router.push('/Auth/Login').catch(() => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
