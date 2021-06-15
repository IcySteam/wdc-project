<template>
  <v-container>
    <h1 class="pb-10">Account</h1>
    <ConsistentMP id="accountDetails">
      <template>
        <v-btn
          color="teal accent-3"
          plain
          @click="manageUserInfo"
        >
          <!--          SKIPPED edit details integration with backend-->
          Edit Details
        </v-btn>
        <v-card>
          <v-card-title>
            Account Details
            <v-spacer />
            <v-text-field
              v-model="accountDetailSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              color="teal accent-3"
            />
          </v-card-title>
          <v-data-table
            :headers="accountDetailHeaders"
            :items="accountDetailItems"
            :search="accountDetailSearch"
          >
            <template v-slot:top>
              <v-dialog
                v-model="UCdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Check-In History</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-data-table
                        :headers="userCheckInHeaders"
                        :items="userCheckInItems"
                        sort-desc
                      />
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="close"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="UMdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Edit Details</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-data-table
                        :headers="accountDetailHeaders"
                        :items="accountDetailItems"
                      >
                        <template v-slot:item.value="props">
                          <v-edit-dialog
                            :return-value.sync="props.item.value"
                            large
                            persistent
                            @save="usave"
                            @cancel="ucancel"
                            @open="open"
                          >
                            <div>{{ props.item.value }}</div>
                            <template v-slot:input>
                              <div class="mt-4 text-h6">
                                Update Value
                              </div>
                              <v-text-field
                                v-model="props.item.value"
                                :rules="[max255chars]"
                                label="Edit"
                                single-line
                                counter
                                autofocus
                              />
                            </template>
                          </v-edit-dialog>
                        </template>
                      </v-data-table>
                      <v-snackbar
                        v-model="pop"
                        :timeout="3000"
                        :color="popColor"
                      >
                        {{ popText }}
                      </v-snackbar>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="close"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
        <v-btn
          color="teal accent-3"
          plain
          class="mt-6"
          @click="viewCheckInInfo"
        >
          Check-In Timeline
        </v-btn>
      </template>
    </ConsistentMP>
  </v-container>

</template>

<script>
import ConsistentMP from './UX/ConsistentMP'
import axios from 'axios'
export default {
  name: 'UserAccountComponent',
  components: { ConsistentMP },
  data() {
    return {
      currentUserObject: {},
      UCdialog: false,
      UMdialog: false,
      pop: false,
      popColor: '',
      popText: '',
      max255chars: v => v.length <= 255 || 'Input too long!',
      accountDetailSearch: '',
      accountDetailHeaders: [
        {
          text: 'Detail',
          align: 'start',
          value: 'name'
        },
        {
          text: '',
          value: 'value',
          sortable: false
        },
        {
          text: 'Last updated',
          value: 'updated'
        }
      ],
      accountDetailItems: [],

      // old placeholder data
      // accountDetailItems: [
      //   {
      //     name: 'User ID',
      //     value: 'UID#ABYZ0189',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'First name',
      //     value: 'Jon',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Last name',
      //     value: 'Doe',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Role',
      //     value: 'user',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Gender',
      //     value: 'Attack helicopter',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Date of birth',
      //     value: '1970-01-01',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Recently been to a hotspot?',
      //     value: 'No',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Phone number',
      //     value: '0456789012',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Email',
      //     value: 'user@example.com',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Address #1',
      //     value: '1 Nowhere St',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Address #2 (optional)',
      //     value: '',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Suburb',
      //     value: 'Adelaide',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Postcode',
      //     value: '5000',
      //     updated: '2021-05-16'
      //   }
      // ],

      userCheckInHeaders: [
        {
          text: 'Venue ID',
          align: 'start',
          value: 'venueID'
        },
        {
          text: 'Venue Name',
          value: 'venueName'
        },
        {
          text: 'Time',
          value: 'time'
        },
        {
          text: 'Check-In ID',
          value: 'id'
        }
      ],
      userCheckInItems: []

      // cannot for f's sake figure Vue's prop.item shenanigans so just using one set of values for both showing and editing values
      // editAccountDetailHeaders: [
      //   {
      //     text: 'Detail',
      //     align: 'start',
      //     value: 'name'
      //   },
      //   {
      //     text: '',
      //     value: 'value',
      //     sortable: false
      //   },
      //   {
      //     text: 'Last updated',
      //     value: 'updated'
      //   }
      // ],

      // editAccountDetailItems: []
      // old placeholder data
      // editAccountDetailItems: [
      //   {
      //     name: 'First name',
      //     value: 'Jon',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Last name',
      //     value: 'Doe',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Gender',
      //     value: 'Attack helicopter',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Date of birth',
      //     value: '1970-01-01',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Phone number',
      //     value: '0456789012',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Email',
      //     value: 'user@example.com',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Address #1',
      //     value: '1 Nowhere St',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Address #2 (optional)',
      //     value: '',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Suburb',
      //     value: 'Adelaide',
      //     updated: '2021-05-16'
      //   },
      //   {
      //     name: 'Postcode',
      //     value: '5000',
      //     updated: '2021-05-16'
      //   }
      // ],
    }
  },

  computed: {
  },
  created() {
    this.currentUserAxios()
    this.checkInTimelineAxios()
  },
  destroyed() {
  },
  methods: {
    viewCheckInInfo() {
      this.UCdialog = true
    },

    manageUserInfo() {
      this.UMdialog = true
    },

    usave() {
      const updateUserPayload = {}
      for (let i = 0; i < this.accountDetailItems.length; ++i) {
        updateUserPayload[this.accountDetailItems[i].name] = this.accountDetailItems[i].value
      }
      // console.log(updateUserPayload)
      axios({
        url: '/Action/UpdateUser',
        method: 'post',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          'userID': updateUserPayload.userID
        },
        data: updateUserPayload
      })
        .then((res) => {
          // got an ok response
          // console.log(res)
        })
        .catch((err) => {
          // encountered error making request/error response
          console.log(err)
          // console.log(err.response)
        })

      this.pop = true
      this.popColor = 'success'
      this.popText = 'Data saved'
      this.UMdialog = true
    },

    ucancel() {
      this.pop = true
      this.popColor = 'error'
      this.popText = 'Canceled'
      this.UMdialog = true
    },

    close() {
      this.UCdialog = false
      this.UMdialog = false
    },

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
              for (const [key, value] of Object.entries(this.currentUserObject)) {
                // console.log(`${key}: ${value}`)
                const newEntry = {}
                newEntry.name = key
                newEntry.value = value
                newEntry.updated = this.currentUserObject.updateTimestamp
                // foo to look better
                // newEntry.updated = this.currentUserObject.creationTimestamp
                this.accountDetailItems.push(newEntry)
              }
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
          // get user check-in timeline, NESTED axios request
          axios({
            url: '/Action/GetUserCheckInHistory',
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
              for (let i = 0; i < res1.data.length; ++i) {
                this.userCheckInItems.push({
                  venueID: res1.data[i].venueID,
                  venueName: res1.data[i].name,
                  time: res1.data[i].time,
                  id: res1.data[i].id
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
