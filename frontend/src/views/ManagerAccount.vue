<template>
  <v-container fluid>
    <NavBar />
    <VenueDetails />
    <Footer />
  </v-container>
</template>

<script>
import VenueDetails from '../components/VenueDetails'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default {
  name: 'ManagerAccount',

  components: {
    Footer,
    NavBar,
    VenueDetails
  }
}
</script>

<style scoped>

</style>
