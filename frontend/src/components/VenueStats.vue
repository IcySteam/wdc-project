<template>
  <v-container>
    <h1 id="h1ID" class="h1Class pb-10">{{ venueName }}</h1>
    <v-row>
      <Gmap id="Gmap" />
    </v-row>
    <v-row>
      <ConsistentMP id="checkInHistory">
        <template>
          <div class="text-center">
            <v-dialog
              v-model="QRcode"
              width="310"
            >
              <template v-slot:activator="{ on, cardHolder }">
                <v-btn
                  color="teal accent-3"
                  v-bind="cardHolder"
                  v-on="on"
                  class="black--text"
                >
                  Check The QR Code
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  The QR Code Information
                </v-card-title>

                <v-card-text>
                  <div v-qr="text" v-if="text" />
                </v-card-text>

                <v-card-actions>
                  <v-spacer>
                  </v-spacer>

                  <v-btn
                    @click="QRcode = false"
                    color="teal accent-3"
                    class="black--text"
                  >
                    All done!
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
export default {
  name: 'VenueStats',
  components: { Gmap, ConsistentMP },
  data() {
    return {
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
          value: 'beenToHotspot'
        },
        {
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Time',
          value: 'time'
        },
        {
          text: 'Timestamp',
          value: 'timestamp'
        }
      ],
      checkInHistoryItems: [
        {
          userID: 'abyz0189',
          fullName: 'Jash Vira',
          beenToHotspot: 'No',
          date: '2021-05-16',
          time: '13:57:09',
          timestamp: 1621147075
        },
        {
          userID: 'abyz0190',
          fullName: 'Junguo Wong',
          beenToHotspot: 'No',
          date: '2021-05-16',
          time: '13:57:10',
          timestamp: 1621147076
        },
        {
          userID: 'abyz0191',
          fullName: 'Zhenhang Dong',
          beenToHotspot: 'No',
          date: '2021-05-16',
          time: '13:57:11',
          timestamp: 1621147077
        },
        {
          userID: 'abyz0192',
          fullName: 'Minhaj Ahmed',
          beenToHotspot: 'No',
          date: '2021-05-16',
          time: '13:57:12',
          timestamp: 1621147078
        }
      ],
      text: 'sizdoesmatter',
      QRcode: false

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
