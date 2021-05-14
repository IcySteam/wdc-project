<template>
  <v-container>
    <fake_map />
    <NavBar />

    <v-row>
      <v-card height="300" width="700">
        <locations_list />
      </v-card>
      <!--      <v-divider-->
      <!--          vertical-->
      <!--      ></v-divider>-->
      <v-col cols="9.5" />
      <v-card width="440">
        <v-card-title> Location History</v-card-title>
        <timeline />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import timeline from '../components/timeline'
import fake_map from '../components/fake_map'
import locations_list from '../components/locations_list'

export default {
  name: 'RealUser',
  components: {
    locations_list,
    fake_map,
    timeline,
    NavBar
  }
}
</script>
