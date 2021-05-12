<template>
  <v-container>
    <NavBar />
    <VenueStats />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import VenueStats from '../components/VenueStats'

export default {
  name: 'ManagerHome',

  components: {
    NavBar,
    VenueStats
  }
}
</script>

<style scoped>

</style>
