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
                        :headers="editAccountDetailHeaders"
                        :items="editAccountDetailItems"
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
export default {
  name: 'UserAccountComponent',
  components: { ConsistentMP },
  data() {
    return {
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
      accountDetailItems: [
        {
          name: 'User ID',
          value: 'UID#ABYZ0189',
          updated: '2021-05-16'
        },
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
          value: 'user',
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
      editAccountDetailHeaders: [
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
      editAccountDetailItems: [
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
      ]
    }
  },

  computed: {
  },
  methods: {
    viewCheckInInfo() {
      this.UCdialog = true
    },

    manageUserInfo() {
      this.UMdialog = true
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

    close() {
      this.UCdialog = false
      this.UMdialog = false
    }
  }
}
</script>

<style scoped>

</style>
