<template>
  <v-container>
    <h1 class="pb-10">Welcome, {{ fullName }}!</h1>
    <v-row>
      <CheckInCode id="checkInCode" />
    </v-row>
    <v-row>
      <Gmap id="Gmap" />
    </v-row>
  </v-container>

</template>

<script>
import Gmap from './Gmap'
import CheckInCode from './CheckInCode'
export default {
  name: 'UserHomeComponent',
  components: { CheckInCode, Gmap },
  data() {
    return {
      fullName: 'Jon Doe'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
