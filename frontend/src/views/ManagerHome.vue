<template>
  <v-container>
    <ManagerNavBar />
    <VenueStats />
  </v-container>
</template>

<script>
import ManagerNavBar from '../components/ManagerNavBar'
import VenueStats from '../components/VenueStats'

export default {
  name: 'ManagerHome',

  components: {
    ManagerNavBar,
    VenueStats
  }
}
</script>

<style scoped>

</style>
