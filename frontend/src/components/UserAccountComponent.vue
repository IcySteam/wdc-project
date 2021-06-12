<template>
  <v-container>
    <h1 class="pb-10">Account</h1>
    <ConsistentMP id="accountDetails">
      <template>
        <v-btn
          color="teal accent-3"
          plain
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
          />
        </v-card>
        <v-btn
          color="teal accent-3"
          plain
          class="mt-6"
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
          name: 'Role',
          value: 'user',
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
  }
}
</script>

<style scoped>

</style>
