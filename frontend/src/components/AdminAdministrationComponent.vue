<template>
  <v-container>
    <h1 class="pb-10">Administration</h1>
    <ConsistentMP id="currentHotspots">
      <template>
        <v-btn
          color="teal accent-3"
          plain
          @click="addHotspot"
        >
          Add Hotspot
        </v-btn>
        <v-card>
          <v-card-title>
            Current Hotspots
            <v-spacer />
            <v-text-field
              v-model="currentHotspotsSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              color="teal accent-3"
            />
          </v-card-title>
          <v-data-table
            :headers="currentHotspotsHeaders"
            :items="currentHotspotsItems"
            :search="currentHotspotsSearch"
            sort-by="lastCreated"
            sort-desc
          >
            <template v-slot:top>
              <v-dialog
                v-model="HAdialog"
                max-width="500px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Add Hotspot</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addHotspotDetails.venueID"
                            label="Venue ID"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addHotspotDetails.startTime"
                            label="Start Time"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addHotspotDetails.endTime"
                            label="End Time"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addHotspotDetails.affectedUsers"
                            label="Affected Users"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="submitHotspot"
                    >
                      Submit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="HMdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Manage Hotspot Details</span>
                    <v-spacer />
                    <span>Venue ID: {{ selectedVenueID }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="manageHotspotDetails.startTime"
                            label="Start Time"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="manageHotspotDetails.endTime"
                            label="End Time"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="manageHotspotDetails.affectedUsers"
                            label="Affected Users"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="hsave"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="DelDialog" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Confirm Action</v-card-title>
                  <v-card-text>Remove this venue from hotspots?</v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="teal accent-3" text @click="close">Cancel</v-btn>
                    <v-btn color="teal accent-3" text @click="deleteConfirm">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                small
                color="teal accent-3"
                class="black--text"
                @click="manageHotspot(item)"
              >
                Manage
              </v-btn>
              <v-btn
                small
                color="teal accent-3"
                class="black--text"
                @click="deleteHotspot(item)"
              >
                Remove
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </ConsistentMP>

    <ConsistentMP id="users">
      <template>
        <v-card>
          <v-card-title>
            Users
            <v-spacer />
            <v-text-field
              v-model="usersSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              color="teal accent-3"
            />
          </v-card-title>
          <v-data-table
            :headers="usersHeaders"
            :items="usersItems"
            :search="usersSearch"
            sort-desc
          >
            <template v-slot:top>
              <v-dialog
                v-model="UCdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Check-In History</span>
                    <v-spacer />
                    <span>User ID: {{ selectedUserID }}</span>
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
                    <span class="text-h5">Account Details</span>
                    <v-spacer />
                    <span>User ID: {{ selectedUserID }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-data-table
                        :headers="userAccountDetailHeaders"
                        :items="userAccountDetailItems"
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
            <template v-slot:item.actions="{ item }">
              <v-btn
                small
                color="teal accent-3"
                class="black--text"
                @click="viewUserInfo(item)"
              >
                View Check-Ins
              </v-btn>
              <v-btn
                small
                color="teal accent-3"
                class="black--text"
                @click="manageUserInfo(item)"
              >
                Manage
              </v-btn>
            </template>

          </v-data-table>
        </v-card>
      </template>
    </ConsistentMP>

    <ConsistentMP id="venues">
      <template>
        <v-btn
          color="teal accent-3"
          plain
          @click="addVenue"
        >
          Create Venue
        </v-btn>
        <v-card>
          <v-card-title>
            Venues
            <v-spacer />
            <v-text-field
              v-model="venuesSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              color="teal accent-3"
            />
          </v-card-title>
          <v-data-table
            :headers="venuesHeaders"
            :items="venuesItems"
            :search="venuesSearch"
            sort-by="timestamp"
            sort-desc
          >
            <template v-slot:top>
              <v-dialog
                v-model="VAdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Create Venue</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addVenueDetails.venueID"
                            label="Venue ID"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addVenueDetails.name"
                            label="Venue Name"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addVenueDetails.latitude"
                            label="Latitude"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addVenueDetails.longitude"
                            label="Longitude"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="addVenueDetails.radius"
                            label="Radius"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="teal accent-3"
                      text
                      @click="submitVenue"
                    >
                      Submit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="VCdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Check-In History</span>
                    <v-spacer />
                    <span>Venue ID: {{ selectedVenueID }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-data-table
                        :headers="venueCheckInHeaders"
                        :items="venueCheckInItems"
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
                v-model="VMdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Account Details</span>
                    <v-spacer />
                    <span>Venue ID: {{ selectedVenueID }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-data-table
                        :headers="venueDetailHeaders"
                        :items="venueDetailItems"
                      >
                        <template v-slot:item.value="props">
                          <v-edit-dialog
                            :return-value.sync="props.item.value"
                            large
                            persistent
                            @save="vsave"
                            @cancel="vcancel"
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
            <template v-slot:item.actions="{ item }">
              <v-btn
                small
                color="teal accent-3"
                class="black--text"
                @click="viewVenueInfo(item)"
              >
                View Check-Ins
              </v-btn>
              <v-btn
                small
                color="teal accent-3"
                class="black--text"
                @click="manageVenueInfo(item)"
              >
                Manage
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </ConsistentMP>
  </v-container>
</template>

<script>
import ConsistentMP from './UX/ConsistentMP'
export default {
  name: 'AdminAdministrationComponent',
  components: { ConsistentMP },
  data() {
    return {
      UCdialog: false,
      UMdialog: false,
      VCdialog: false,
      VMdialog: false,
      VAdialog: false,
      DelDialog: false,
      HAdialog: false,
      HMdialog: false,
      pop: false,
      popColor: '',
      popText: '',
      max255chars: v => v.length <= 255 || 'Input too long!',
      userIndex: -1,
      venueIndex: -1,
      hotspotIndex: -1,
      selectedUserID: '',
      selectedVenueID: '',
      usersSearch: '',
      usersHeaders: [
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
          value: 'beenToHotspot'
        },
        {
          text: 'Email Address',
          value: 'email'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }
      ],
      usersItems: [
        {
          userID: 'abyx0189',
          fullName: 'Jash Vira',
          beenToHotspot: 'No',
          email: 'example@example.com'
        },
        {
          userID: 'abyz0190',
          fullName: 'Junguo Wong',
          beenToHotspot: 'No',
          email: 'example@example.com'
        },
        {
          userID: 'abyz0191',
          fullName: 'Zhenhang Dong',
          beenToHotspot: 'No',
          email: 'example@example.com'
        },
        {
          userID: 'abyz0192',
          fullName: 'Minhaj Ahmed',
          beenToHotspot: 'No',
          email: 'example@example.com'
        }
      ],

      currentHotspotsSearch: '',
      currentHotspotsHeaders: [
        {
          text: 'Venue ID',
          align: 'start',
          value: 'venueID'
        },
        {
          text: 'Venue name',
          value: 'venueName'
        },
        {
          text: 'Longitude',
          value: 'longitude'
        },
        {
          text: 'Latitude',
          value: 'latitude'
        },
        {
          text: 'Radius',
          value: 'radius'
        },
        {
          text: 'Affected users',
          value: 'affectedUsers'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }
      ],
      currentHotspotsItems: [
        {
          venueID: 'abyz0200',
          venueName: 'McMurdo Station',
          latitude: -77.8419,
          longitude: 116.6863,
          radius: 1000,
          affectedUsers: 30
        },
        {
          venueID: 'abyz0201',
          venueName: 'Scott Base',
          latitude: -77.8477,
          longitude: 166.7602,
          radius: 800,
          affectedUsers: 22
        }
      ],

      venuesSearch: '',
      venuesHeaders: [
        {
          text: 'Venue ID',
          align: 'start',
          value: 'venueID'
        },
        {
          text: 'Venue name',
          value: 'venueName'
        },
        {
          text: 'Hotspot?',
          value: 'hotspot'
        },
        {
          text: 'Last check-in timestamp',
          value: 'timestamp'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }
      ],
      venuesItems: [
        {
          venueID: 'abyz0200',
          venueName: 'McMurdo Station',
          hotspot: 'Yes',
          timestamp: 1621147065
        },
        {
          venueID: 'abyz0201',
          venueName: 'Scott Base',
          hotspot: 'Yes',
          timestamp: 1621147067
        }
      ],
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
      userCheckInItems: [],
      userAccountDetailHeaders: [
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
      userAccountDetailItems: [
        {
          name: 'First name',
          value: 'Jon',
          updated: '2021-05-16'
        },
        {
          name: 'Last name',
          value: 'Doe',
          updated: '2021-05-16'
        },
        {
          name: 'Role',
          value: 'User',
          updated: '2021-05-16'
        },
        {
          name: 'Gender',
          value: 'Attack helicopter',
          updated: '2021-05-16'
        },
        {
          name: 'Date of birth',
          value: '1970-01-01',
          updated: '2021-05-16'
        },
        {
          name: 'Recently been to a hotspot?',
          value: 'No',
          updated: '2021-05-16'
        },
        {
          name: 'Phone number',
          value: '0456789012',
          updated: '2021-05-16'
        },
        {
          name: 'Email',
          value: 'user@example.com',
          updated: '2021-05-16'
        },
        {
          name: 'Address #1',
          value: '1 Nowhere St',
          updated: '2021-05-16'
        },
        {
          name: 'Address #2 (optional)',
          value: '',
          updated: '2021-05-16'
        },
        {
          name: 'Suburb',
          value: 'Adelaide',
          updated: '2021-05-16'
        },
        {
          name: 'Postcode',
          value: '5000',
          updated: '2021-05-16'
        }
      ],
      venueCheckInHeaders: [
        {
          text: 'User ID',
          align: 'start',
          value: 'userID'
        },
        {
          text: 'Full Name',
          value: 'fullName'
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
      venueCheckInItems: [],
      venueDetailHeaders: [
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
      venueDetailItems: [
        {
          name: 'Venue ID',
          value: 'VID#ABYZ0189',
          updated: '2021-05-16'
        },
        {
          name: 'Venue name',
          value: 'The University of Adelaide',
          updated: '2021-05-16'
        },
        {
          name: 'Venue ID',
          value: 'VID#ABYZ0189',
          updated: '2021-05-16'
        },
        {
          name: 'Latitude',
          value: '-34.9206',
          updated: '2021-05-16'
        },
        {
          name: 'Longitude',
          value: '138.6062',
          updated: '2021-05-16'
        },
        {
          name: 'Radius',
          value: '500',
          updated: '2021-05-16'
        },
        {
          name: 'Hotspot?',
          value: 'No',
          updated: '2021-05-16'
        }
      ],
      addHotspotDetails: {
        venueID: '',
        startTime: '',
        endTime: '',
        affectedUsers: ''
      },
      manageHotspotDetails: {
        startTime: '2021/01/23 04:11:05',
        endTime: '2021/01/23 04:11:05',
        affectedUsers: 30
      },
      addVenueDetails: {
        venueID: '',
        name: '',
        latitude: '',
        longitude: '',
        radius: ''
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    viewUserInfo(item) {
      this.userIndex = this.usersItems.indexOf(item)
      this.selectedUserID = this.usersItems[this.userIndex].userID
      this.UCdialog = true
    },

    manageUserInfo(item) {
      this.userIndex = this.usersItems.indexOf(item)
      this.selectedUserID = this.usersItems[this.userIndex].userID
      this.UMdialog = true
    },

    viewVenueInfo(item) {
      this.venueIndex = this.venuesItems.indexOf(item)
      this.selectedVenueID = this.venuesItems[this.venueIndex].venueID
      this.VCdialog = true
    },

    manageVenueInfo(item) {
      this.venueIndex = this.venuesItems.indexOf(item)
      this.selectedVenueID = this.venuesItems[this.venueIndex].venueID
      this.VMdialog = true
    },

    deleteHotspot(item) {
      this.hotspotIndex = this.currentHotspotsItems.indexOf(item)
      this.DelDialog = true
    },

    deleteConfirm() {
      this.currentHotspotsItems.splice(this.hotspotIndex, 1)
      this.close()
    },

    manageHotspot(item) {
      this.hotspotIndex = this.currentHotspotsItems.indexOf(item)
      this.selectedVenueID = this.currentHotspotsItems[this.hotspotIndex].venueID
      this.HMdialog = true
    },

    usave() {
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

    vsave() {
      this.pop = true
      this.popColor = 'success'
      this.popText = 'Data saved'
      this.VMdialog = true
    },

    vcancel() {
      this.pop = true
      this.popColor = 'error'
      this.popText = 'Canceled'
      this.VMdialog = true
    },

    hsave() {
      this.HMdialog = false
      this.HAdialog = false
    },

    open() {
    },

    close() {
      this.UCdialog = false
      this.UMdialog = false
      this.VCdialog = false
      this.VMdialog = false
      this.DelDialog = false
      this.HAdialog = false
      this.HMdialog = false
      this.VAdialog = false
    },

    addHotspot() {
      this.HAdialog = true
    },

    submitHotspot() {
      this.HAdialog = false
    },

    addVenue() {
      this.VAdialog = true
    },

    submitVenue() {
      this.VAdialog = false
    }

    // showUsers() {
    // axios.get('/GetUsersDigest').then(({ data }) => (this.usersItems = data))
    // }
  }
}
</script>

<style scoped>

</style>
