<template>
  <v-container>
    <GmapMap
      :center="center"
      :zoom="zoom"
      map-type-id="hybrid"
      style="width: 100%; "
      :style="mapHeight"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :shape="shape"
        @click="center=m.position"
      />
      <GmapCircle
        :center="center"
        :radius="200"
        :draggable="true"
        :editable="true"
      />
    </GmapMap>

  </v-container>
</template>

<script>
import * as GmapVue from 'gmap-vue'
import Vue from 'vue'

export default {
  name: 'Gmap',
  components: { },
  props: {
    propMapHeight: {
      type: String,
      default: '40rem'
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
      }
    }
  },
  computed: {
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
