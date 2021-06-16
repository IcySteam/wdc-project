<template>
  <v-container>
    <GmapMap
      :center="center"
      :zoom="zoom"
      map-type-id="hybrid"
      style="width: 100%; "
      :style="mapHeight"
    >
      <!--      <GmapMarker-->
      <!--        v-for="(m, index) in markers"-->
      <!--        :key="index"-->
      <!--        :position="m.position"-->
      <!--        :clickable="true"-->
      <!--        :draggable="true"-->
      <!--        :shape="shape"-->
      <!--        @click="center=m.position"-->
      <!--      />-->
      <GmapMarker
        v-for="(m, index) in checkInLocations"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :shape="shape"
        @click="center=m.position"
      />

      <!--      <GmapCircle-->
      <!--        :center="center"-->
      <!--        :radius="200"-->
      <!--        :draggable="true"-->
      <!--        :editable="true"-->
      <!--      />-->
      <GmapCircle
        v-for="(m, index) in hotspotLocations"
        :key="index"
        :center="m.position"
        :radius="m.radius"
        :draggable="false"
        :editable="false"
      />
    </GmapMap>
  </v-container>
</template>

<script>
import * as GmapVue from 'gmap-vue'
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'Gmap',
  components: { },
  props: {
    propMapHeight: {
      type: String,
      default: '80vh'
    }
  },
  data() {
    return {
      // Gmap
      mapHeight: {
        height: this.propMapHeight
      },
      center: {
        lat: -34.9206,
        lng: 138.6062
      },
      zoom: 16,
      // https://diegoazh.github.io/gmap-vue/examples/marker.html#source-code
      markers: [{
        position: {
          lat: -34.9206,
          lng: 138.6062
        }
      }, {
        position: {
          lat: 30.6178,
          lng: 114.2617
        }
      }],
      shape: {
        coords: [10, 10, 10, 15, 15, 15, 15, 10],
        type: 'poly'
      },
      checkInLocations: [],
      hotspotLocations: []
    }
  },
  computed: {
  },
  created() {
    this.checkInTimelineGmap()
    this.hotspotsGmap()
  },
  destroyed() {
  },
  methods: {
    checkInTimelineGmap() {
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
              // console.log(res1.data)
              for (let i = 0; i < res1.data.length; ++i) {
                this.checkInLocations.push({
                  position: {
                    lat: parseFloat(res1.data[i].latitude),
                    lng: parseFloat(res1.data[i].longitude)
                  }
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
    },
    hotspotsGmap() {
      // get hotspots
      axios({
        url: '/Action/GetCurrentHotspots',
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
          console.log(res.data)
          for (let i = 0; i < res.data.length; ++i) {
            this.hotspotLocations.push({
              position: {
                lat: parseFloat(res.data[i].latitude),
                lng: parseFloat(res.data[i].longitude)
              },
              radius: parseFloat(res.data[i].radius)
            })
          }
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

// Gmap setup
Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyBBqDZG_fdijkWx-rpexuqg-XOQAK6kGtw',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    // // If you want to set the version, you can do so:
    // v: '3.26',
  },

  // // If you intend to programmatically custom event listener code
  // // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  // // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  // // you might need to turn this on.
  // autobindAllEvents: false,

  // // If you want to manually install components, e.g.
  // // import {GmapMarker} from 'gmap-vue/src/components/marker'
  // // Vue.component('GmapMarker', GmapMarker)
  // // then set installComponents to 'false'.
  // // If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

</script>

<style scoped>

</style>
