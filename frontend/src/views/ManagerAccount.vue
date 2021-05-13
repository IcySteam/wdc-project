<template>
  <v-container>
    <NavBar />
    <VenueDetails />
  </v-container>
</template>

<script>
import VenueDetails from '../components/VenueDetails'
import NavBar from '../components/NavBar'

export default {
  name: 'ManagerAccount',

  components: {
    NavBar,
    VenueDetails
  }
}
</script>

<style scoped>

</style>
