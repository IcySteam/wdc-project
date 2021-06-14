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
      </template>
    </ConsistentMP>
    <ConsistentMP id="venueDetails">
      <v-btn
        color="teal accent-3"
        plain
        @click="manageVenueInfo"
      >
        Edit Details
      </v-btn>
      <template>
        <v-card>
          <v-card-title>
            Venue Details
            <v-spacer />
            <v-text-field
              v-model="venueDetailSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              color="teal accent-3"
            />
          </v-card-title>
          <v-data-table
            :headers="venueDetailHeaders"
            :items="venueDetailItems"
            :search="venueDetailSearch"
          >
            <template v-slot:top>
              <v-dialog
                v-model="VMdialog"
                max-width="800px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Edit Details</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-data-table
                        :headers="editVenueDetailHeaders"
                        :items="editVenueDetailItems"
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
          </v-data-table>
        </v-card>
        <v-btn
          color="teal accent-3"
          plain
          class="mt-6"
        >
          Hotspot Timeline
        </v-btn>
      </template>
    </ConsistentMP>

    <!--    <ConsistentMP>-->
    <!--      <template>-->
    <!--        <v-data-table-->
    <!--          :headers="headers"-->
    <!--          :items="desserts"-->
    <!--          sort-by="calories"-->
    <!--          class="elevation-1"-->
    <!--        >-->
    <!--          <template v-slot:top>-->
    <!--            <v-toolbar-->
    <!--              flat-->
    <!--            >-->
    <!--              <v-toolbar-title>My CRUD</v-toolbar-title>-->
    <!--              <v-divider-->
    <!--                class="mx-4"-->
    <!--                inset-->
    <!--                vertical-->
    <!--              />-->
    <!--              <v-spacer />-->
    <!--              <v-dialog-->
    <!--                v-model="dialog"-->
    <!--                max-width="500px"-->
    <!--              >-->
    <!--                <template v-slot:activator="{ on, attrs }">-->
    <!--                  <v-btn-->
    <!--                    color="primary"-->
    <!--                    dark-->
    <!--                    class="mb-2"-->
    <!--                    v-bind="attrs"-->
    <!--                    v-on="on"-->
    <!--                  >-->
    <!--                    New Item-->
    <!--                  </v-btn>-->
    <!--                </template>-->
    <!--                <v-card>-->
    <!--                  <v-card-title>-->
    <!--                    <span class="headline">{{ formTitle }}</span>-->
    <!--                  </v-card-title>-->

    <!--                  <v-card-text>-->
    <!--                    <v-container>-->
    <!--                      <v-row>-->
    <!--                        <v-col-->
    <!--                          cols="12"-->
    <!--                          sm="6"-->
    <!--                          md="4"-->
    <!--                        >-->
    <!--                          <v-text-field-->
    <!--                            v-model="editedItem.name"-->
    <!--                            label="Dessert name"-->
    <!--                          />-->
    <!--                        </v-col>-->
    <!--                        <v-col-->
    <!--                          cols="12"-->
    <!--                          sm="6"-->
    <!--                          md="4"-->
    <!--                        >-->
    <!--                          <v-text-field-->
    <!--                            v-model="editedItem.calories"-->
    <!--                            label="Calories"-->
    <!--                          />-->
    <!--                        </v-col>-->
    <!--                        <v-col-->
    <!--                          cols="12"-->
    <!--                          sm="6"-->
    <!--                          md="4"-->
    <!--                        >-->
    <!--                          <v-text-field-->
    <!--                            v-model="editedItem.fat"-->
    <!--                            label="Fat (g)"-->
    <!--                          />-->
    <!--                        </v-col>-->
    <!--                        <v-col-->
    <!--                          cols="12"-->
    <!--                          sm="6"-->
    <!--                          md="4"-->
    <!--                        >-->
    <!--                          <v-text-field-->
    <!--                            v-model="editedItem.carbs"-->
    <!--                            label="Carbs (g)"-->
    <!--                          />-->
    <!--                        </v-col>-->
    <!--                        <v-col-->
    <!--                          cols="12"-->
    <!--                          sm="6"-->
    <!--                          md="4"-->
    <!--                        >-->
    <!--                          <v-text-field-->
    <!--                            v-model="editedItem.protein"-->
    <!--                            label="Protein (g)"-->
    <!--                          />-->
    <!--                        </v-col>-->
    <!--                      </v-row>-->
    <!--                    </v-container>-->
    <!--                  </v-card-text>-->

    <!--                  <v-card-actions>-->
    <!--                    <v-spacer />-->
    <!--                    <v-btn-->
    <!--                      color="blue darken-1"-->
    <!--                      text-->
    <!--                      @click="close"-->
    <!--                    >-->
    <!--                      Cancel-->
    <!--                    </v-btn>-->
    <!--                    <v-btn-->
    <!--                      color="blue darken-1"-->
    <!--                      text-->
    <!--                      @click="save"-->
    <!--                    >-->
    <!--                      Save-->
    <!--                    </v-btn>-->
    <!--                  </v-card-actions>-->
    <!--                </v-card>-->
    <!--              </v-dialog>-->
    <!--              <v-dialog v-model="dialogDelete" max-width="500px">-->
    <!--                <v-card>-->
    <!--                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>-->
    <!--                  <v-card-actions>-->
    <!--                    <v-spacer />-->
    <!--                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>-->
    <!--                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>-->
    <!--                    <v-spacer />-->
    <!--                  </v-card-actions>-->
    <!--                </v-card>-->
    <!--              </v-dialog>-->
    <!--            </v-toolbar>-->
    <!--          </template>-->
    <!--          <template v-slot:item.actions="{ item }">-->
    <!--            <v-icon-->
    <!--              small-->
    <!--              class="mr-2"-->
    <!--              @click="editItem(item)"-->
    <!--            >-->
    <!--              mdi-pencil-->
    <!--            </v-icon>-->
    <!--            <v-icon-->
    <!--              small-->
    <!--              @click="deleteItem(item)"-->
    <!--            >-->
    <!--              mdi-delete-->
    <!--            </v-icon>-->
    <!--          </template>-->
    <!--          <template v-slot:no-data>-->
    <!--            <v-btn-->
    <!--              color="primary"-->
    <!--              @click="initialize"-->
    <!--            >-->
    <!--              Reset-->
    <!--            </v-btn>-->
    <!--          </template>-->
    <!--        </v-data-table>-->
    <!--      </template>-->
    <!--    </ConsistentMP>-->

  </v-container>

</template>

<script>
import ConsistentMP from './UX/ConsistentMP'
export default {
  name: 'VenueDetails',
  components: { ConsistentMP },
  data() {
    return {
      UMdialog: false,
      VMdialog: false,
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
          value: 'UID#ABXY0189',
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
          value: 'manager',
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
      ],
      venueDetailSearch: '',
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
      ],

      editVenueDetailHeaders: [
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
      editVenueDetailItems: [
        {
          name: 'Venue name',
          value: 'The University of Adelaide',
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
        }
      ],

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    manageUserInfo() {
      this.UMdialog = true
    },

    manageVenueInfo() {
      this.VMdialog = true
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

    close() {
      this.VMdialog = false
      this.UMdialog = false
    },

    initialize() {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    // close() {
    //  this.dialog = false
    //  this.$nextTick(() => {
    //    this.editedItem = Object.assign({}, this.defaultItem)
    //    this.editedIndex = -1
    //  })
    // },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
