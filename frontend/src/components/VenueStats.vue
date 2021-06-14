<template>
  <v-container>
    <h1 id="h1ID" class="h1Class pb-10">{{ venueName }}</h1>
    <v-row>
      <Gmap id="Gmap" />
    </v-row>
    <v-row>
      <ConsistentMP id="checkInHistory">
        <template>
          <div>
            <v-dialog
              v-model="QRCode"
              width="310"
            >
              <template v-slot:activator="{ on, cardHolder }">
                <v-btn
                  color="teal accent-3"
                  v-bind="cardHolder"
                  class="black--text ml-4"
                  v-on="on"
                >
                  Show Check-In QR Code
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="my-2">
                  Check-In QR Code
                </v-card-title>

                <v-card-text>
                  <div v-if="getQRText" v-qr="getQRText" />
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="teal accent-3"
                    class="black--text mb-2 mt-n2"
                    @click="QRCode = false"
                  >
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <v-card>
            <v-card-title>
              Check-In History
              <v-spacer />
              <v-text-field
                v-model="checkInHistorySearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                color="teal accent-3"
              />
            </v-card-title>
            <v-data-table
              :headers="checkInHistoryHeaders"
              :items="checkInHistoryItems"
              :search="checkInHistorySearch"
              sort-by="timestamp"
              sort-desc
            />
          </v-card>
        </template>
      </ConsistentMP>
    </v-row>

  </v-container>
</template>

<script>
import ConsistentMP from './UX/ConsistentMP'
import Gmap from './Gmap'
import axios from 'axios'

export default {
  name: 'VenueStats',
  components: { Gmap, ConsistentMP },
  data() {
    return {
      currentUserObject: {},
      venueName: 'The University of Adelaide',
      checkInHistorySearch: '',
      checkInHistoryHeaders: [
        {
          text: 'User ID',
          align: 'start',
          value: 'userID'
        },
        {
          text: 'Full name',
          value: 'fullName'
        },
        {
          text: 'Recently been to a hotspot?',
          value: 'recentlyBeenToHotspot'
        },
        {
          text: 'Timestamp',
          value: 'timestamp'
        },
        {
          text: 'Check-in ID',
          value: 'id'
        }
      ],

      checkInHistoryItems: [],
      // checkInHistoryItems: [
      //   {
      //     userID: 'abyz0189',
      //     fullName: 'Jash Vira',
      //     recentlyBeenToHotspot: 'No',
      //     date: '2021-05-16',
      //     time: '13:57:09',
      //     timestamp: 1621147075
      //   },
      //   {
      //     userID: 'abyz0190',
      //     fullName: 'Junguo Wong',
      //     recentlyBeenToHotspot: 'No',
      //     date: '2021-05-16',
      //     time: '13:57:10',
      //     timestamp: 1621147076
      //   },
      //   {
      //     userID: 'abyz0191',
      //     fullName: 'Zhenhang Dong',
      //     recentlyBeenToHotspot: 'No',
      //     date: '2021-05-16',
      //     time: '13:57:11',
      //     timestamp: 1621147077
      //   },
      //   {
      //     userID: 'abyz0192',
      //     fullName: 'Minhaj Ahmed',
      //     recentlyBeenToHotspot: 'No',
      //     date: '2021-05-16',
      //     time: '13:57:12',
      //     timestamp: 1621147078
      //   }
      // ],
      testQRText: 'https://google.com',
      QRCode: false

    }
  },
  computed: {
    getQRText() {
      // CHANGE THIS according to environment
      // return 'http://localhost:8080/Action/CheckIn?checkInCode=' + this.currentUserObject.associatedVenue
      return 'https://ide-8c045c49c48c4ffb8cbf416d2ea89fd8-8080.cs50.ws/Action/CheckIn?checkInCode=' + this.currentUserObject.associatedVenue
    }
  },
  created() {
    this.currentUserAxios()
    // timeout quick and dirty solution to async
    setTimeout(this.checkInTimelineAxios, 3000)
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
    },
    checkInTimelineAxios() {
      const targetVenue = this.currentUserObject.associatedVenue
      // get venue check-in timeline
      axios({
        url: '/Action/GetVenueCheckInHistory',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          'venueID': targetVenue
        }
      })
        .then((res1) => {
          // got an ok response
          // console.log(res1)
          for (let i = 0; i < res1.data.length; ++i) {
            this.checkInHistoryItems.push({
              userID: res1.data[i].userID,
              fullName: res1.data[i].fullName,
              recentlyBeenToHotspot: res1.data[i].recentlyBeenToHotspot,
              id: res1.data[i].id,
              timestamp: res1.data[i].time
            })
          }
        })
        .catch((err1) => {
          // encountered error making request/error response
          console.log(err1)
          if (err1.response) {
            console.log(err1.response)
          }
        })
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: left;
}
.h1Class {
  text-align: left;
}
#h1ID {
  text-align: left;
}
</style>
