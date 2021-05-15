<template>
  <v-container>
    <NavBar />
    <VenueStats />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import VenueStats from '../components/VenueStats'
import Footer from '../components/Footer'

export default {
  name: 'ManagerHome',

  components: {
    Footer,
    NavBar,
    VenueStats
  }
}
</script>

<style scoped>

</style>
