<template>
  <v-container>
    <h1 class="pb-10">Administration</h1>
    <ConsistentMP id="currentHotspots">
      <template>
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
          />
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
            sort-by="timestamp"
            sort-desc
          />
        </v-card>
      </template>
    </ConsistentMP>

    <ConsistentMP id="venues">
      <template>
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
          />
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
          text: 'Last check-in timestamp',
          value: 'timestamp'
        }
      ],
      usersItems: [
        {
          userID: 'UID#ABYZ0189',
          fullName: 'Jash Vira',
          beenToHotspot: 'No',
          timestamp: 1621147075
        },
        {
          userID: 'UID#ABYZ0190',
          fullName: 'Junguo Wong',
          beenToHotspot: 'No',
          timestamp: 1621147076
        },
        {
          userID: 'UID#ABYZ0191',
          fullName: 'Zhenhang Dong',
          beenToHotspot: 'No',
          timestamp: 1621147077
        },
        {
          userID: 'UID#ABYZ0192',
          fullName: 'Minhaj Ahmed',
          beenToHotspot: 'No',
          timestamp: 1621147078
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
          text: 'Last created',
          value: 'lastCreated'
        }
      ],
      currentHotspotsItems: [
        {
          venueID: 'VID#ABYZ0200',
          venueName: 'McMurdo Station',
          latitude: -77.8419,
          longitude: 116.6863,
          radius: 1000,
          affectedUsers: 30,
          lastCreated: 1621147075
        },
        {
          venueID: 'VID#ABYZ0201',
          venueName: 'Scott Base',
          latitude: -77.8477,
          longitude: 166.7602,
          radius: 800,
          affectedUsers: 22,
          lastCreated: 1621147077
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
        }
      ],
      venuesItems: [
        {
          venueID: 'VID#ABYZ0200',
          venueName: 'McMurdo Station',
          hotspot: 'Yes',
          timestamp: 1621147065
        },
        {
          venueID: 'VID#ABYZ0201',
          venueName: 'Scott Base',
          hotspot: 'Yes',
          timestamp: 1621147067
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
