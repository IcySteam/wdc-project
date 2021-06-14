<template>
  <v-container>
    <h1 class="pb-10">Welcome, {{ currentUserObject.fullName }}!</h1>
    <v-row>
      <CheckInCode id="checkInCode" />
    </v-row>
    <v-row>
      <Gmap id="Gmap" />
    </v-row>
  </v-container>

</template>

<script>
import Gmap from './Gmap'
import CheckInCode from './CheckInCode'
import axios from 'axios'
export default {
  name: 'UserHomeComponent',
  components: { CheckInCode, Gmap },
  data() {
    return {
      currentUserObject: {}
    }
  },
  computed: {
  },
  created() {
    this.currentUserAxios()
  },
  destroyed() {
  },
  methods: {
    currentUserAxios() {
      // get session status first
      var currentUserID
      axios({
        url: '/Action/GetSessionStatus',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
        }
      })
        .then((res) => {
          // got an ok response
          // console.log(res)
          currentUserID = res.data.userID
          // get user object, NESTED axios request
          axios({
            url: '/Action/GetUser',
            method: 'get',
            timeout: 8000,
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              'userID': currentUserID
            }
          })
            .then((res1) => {
              // got an ok response
              // console.log(res1)
              this.currentUserObject = res1.data
              // extra helper attribs
              this.currentUserObject.fullName = this.currentUserObject.firstName + ' ' + this.currentUserObject.lastName
              this.currentUserObject.initials = this.currentUserObject.firstName[0] + this.currentUserObject.lastName[0]
            })
            .catch((err1) => {
              // encountered error making request/error response
              console.log(err1)
              if (err1.response) {
                console.log(err1.response)
              }
            })
        })
        .catch((err) => {
          // encountered error making request/error response
          console.log(err)
          if (err.response) {
            console.log(err.response)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
