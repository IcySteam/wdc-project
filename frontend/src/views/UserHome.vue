<template>
  <v-container>
    <NavBar />
    <FakeMap />
    <v-row>
      <v-card height="300" width="700">
        <LocationsList />
      </v-card>
      <!--      <v-divider-->
      <!--          vertical-->
      <!--      ></v-divider>-->
      <v-col cols="9.5" />
      <v-card width="440">
        <v-card-title>Location History</v-card-title>
        <Timeline />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Timeline from '../components/UserHome/Timeline'
import FakeMap from '../components/UserHome/FakeMap'
import LocationsList from '../components/UserHome/LocationsList'

export default {
  name: 'UserHome',

  components: {
    NavBar,
    Timeline,
    FakeMap,
    LocationsList
  }
}
</script>
